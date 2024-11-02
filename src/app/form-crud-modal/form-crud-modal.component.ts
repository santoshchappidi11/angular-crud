import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatButtonModule,
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
    this.isEditMode = data ? true : false;
    this.userForm = this.fb.group({
      firstName: [data?.firstName || '', Validators.required],
      lastName: [data?.lastName || '', Validators.required],
      DOB: [data?.DOB || '', Validators.required],
      phoneNumber: [data?.phoneNumber || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
    });
  }

  onSave(): void {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
