import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-crud-modal',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './form-crud-modal.component.html',
  styleUrls: ['./form-crud-modal.component.css'],
})
export class FormCrudModalComponent {
  userForm: FormGroup;
  isEditMode: boolean;

  constructor(
    private dialogRef: MatDialogRef<FormCrudModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    // Check if data is provided to determine if this is edit mode
    this.isEditMode = data.id ? true : false;

    this.userForm = this.fb.group({
      firstName: [data?.firstName || '', Validators.required],
      lastName: [data?.lastName || '', Validators.required],
      DOB: [data?.DOB || '', Validators.required],
      phoneNumber: [
        data?.phoneNumber || '',
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      ],
      email: [
        data?.email || '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
          ),
        ],
      ],
    });
  }

  onSave(): void {
    if (this.userForm.valid) {
      const updateduser = { ...this.userForm.value, id: this.data?.id };
      this.dialogRef.close(updateduser);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
