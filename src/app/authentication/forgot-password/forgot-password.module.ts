import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  
import { HeaderModule } from '../../components/header/header.module';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
      path: '',
      component: ForgotPasswordComponent,
      pathMatch: 'full'
  }
];

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    FormsModule,
  ]
})

export class ForgotPasswordModule { }
