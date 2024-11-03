import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormCrudModalComponent } from '../form-crud-modal/form-crud-modal.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { v4 as uuidv4 } from 'uuid';
// import { FormGroup } from '@angular/forms';
// import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-form-crud',
  standalone: true,
  imports: [MatTableModule, MatIcon, MatButtonModule],
  templateUrl: './form-crud.component.html',
  styleUrls: ['./form-crud.component.css'],
})
export class FormCrudComponent {
  users: any[] = [];
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'DOB',
    'phoneNumber',
    'email',
    'actions',
  ];
  dataSource = new MatTableDataSource<any>(this.users);

  constructor(private dialog: MatDialog) {} //the 'dialog' name can be anything here, like we can also give name like 'modal'

  openDialog(): void {
    const dialogRef = this.dialog.open(FormCrudModalComponent, {
      width: '400px',
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        result.id = result.id || uuidv4(); // Ensure ID is set for new users
        this.users.push(result);
        this.dataSource.data = [...this.users];
      }
    });
  }

  editProduct(user: any): void {
    // console.log(user, 'edit product');

    const dialogRef = this.dialog.open(FormCrudModalComponent, {
      width: '400px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((updatedUser) => {
      if (updatedUser) {
        const index = this.users.findIndex((u) => u.id === updatedUser.id);

        if (index !== -1) {
          this.users[index] = updatedUser;
          this.dataSource.data = [...this.users];
        }
      }
    });
  }

  deleteProduct(user: any): void {
    this.users = this.users.filter((u) => u.id !== user.id);
    this.dataSource.data = [...this.users];
  }
}
