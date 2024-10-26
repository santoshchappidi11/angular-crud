import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-product-modal',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.css'],
})
export class EditProductModalComponent {
  productForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    // Initialize form with product data
    this.productForm = this.fb.group({
      id: [data.id],
      title: [data.title],
      price: [data.price],
      category: [data.category],
      description: [data.description],
      image: [data.image],
    });
  }

  onSave(): void {
    // Pass updated product data back to the main component
    this.dialogRef.close(this.productForm.value);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
