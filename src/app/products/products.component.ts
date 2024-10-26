import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EditProductModalComponent } from '../edit-product-modal/edit-product-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  displayedColumns: string[] = [
    'id',
    'title',
    'price',
    'category',
    // 'description',
    'image',
    'actions',
  ];
  dataSource = this.products;

  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.apiService.getProducts().subscribe(
      (response: any) => {
        this.products = response;
        console.log(this.products, 'products  here');
        this.dataSource = this.products; // Update dataSource after fetching products
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  editProduct(product: any): void {
    const dialogRef = this.dialog.open(EditProductModalComponent, {
      width: '600px',
      data: product,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Handle updated product data
        console.log('Updated product:', result);
        // Optionally: update this.products with the edited product
      }
    });
  }

  deleteProduct(product: any): void {
    console.log('Deleting product', product);
    // Implement your delete functionality here

    this.apiService.deleteProduct(product.id).subscribe(
      () => {
        this.products = this.products.filter((prod) => prod.id !== product.id);
        this.dataSource = [...this.products];
        console.log('product deleted successfully!');
      },
      (error) => {
        console.log('Error deleting product', error);
      }
    );
  }
}
