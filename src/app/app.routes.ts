import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { FormCrudComponent } from './form-crud/form-crud.component';
// import { HomeComponent } from './home/home.component';
// import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'form-crud', component: FormCrudComponent },
];
