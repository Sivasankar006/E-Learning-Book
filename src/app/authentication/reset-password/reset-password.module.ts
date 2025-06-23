import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  
import { HeaderModule } from '../../components/header/header.module';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
      path: '',
      component: ResetPasswordComponent,
      pathMatch: 'full'
  }
];

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    FormsModule,
  ]
})

export class ResetPasswordModule { }
