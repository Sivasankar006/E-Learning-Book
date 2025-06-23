import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProfileComponent } from './admin-profile.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  
import { AdminHeaderModule } from '../../app/admin-header/admin-header.module';
import { HttpClientModule } from '@angular/common/http';
import { FooterModule } from '../components/footer/footer.module';
const routes: Routes = [
  {
      path: '',
      component: AdminProfileComponent,
      pathMatch: 'full'
  }
];

@NgModule({
  declarations: [AdminProfileComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminHeaderModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    FormsModule,
    FooterModule
  ]
})

export class AdminProfileModule { }
