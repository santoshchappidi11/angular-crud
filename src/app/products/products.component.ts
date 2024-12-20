import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EditProductModalComponent } from '../edit-product-modal/edit-product-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
  ],
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
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  // Fetch products on initial load
  fetchProducts(): void {
    this.apiService.getProducts().subscribe(
      (response: any) => {
        this.products = response;
        this.dataSource.data = this.products; // Correctly set the data
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  // edit product functionality
  editProduct(product: any): void {
    const dialogRef = this.dialog.open(EditProductModalComponent, {
      width: '600px',
      data: product,
    });

    dialogRef.afterClosed().subscribe((updatedProduct) => {
      if (updatedProduct) {
        // Find the index of the edited product in the products array
        const index = this.products.findIndex(
          (prod) => prod.id === updatedProduct.id
        );
        if (index !== -1) {
          // Replace the old product with the updated one
          this.products[index] = updatedProduct;

          // Refresh the dataSource with the updated products array
          this.dataSource.data = this.products;

          Swal.fire('Updated!', 'The product has been updated.', 'success');
        }
      }
    });
  }

  // delete product functionality
  deleteProduct(product: any): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteProduct(product.id).subscribe(
          () => {
            this.products = this.products.filter(
              (prod) => prod.id !== product.id
            );
            this.dataSource.data = this.products;
            console.log('product deleted successfully!');
            Swal.fire('Deleted!', 'The product has been deleted.', 'success');
          },
          (error) => {
            console.log('Error deleting product', error);
            Swal.fire('Error!', 'Failed to delete the product.', 'error');
          }
        );
      }
    });
  }
}
