import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user-details.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  
import { AdminHeaderModule } from '../../app/admin-header/admin-header.module';
import { FooterModule } from '../components/footer/footer.module';

const routes: Routes = [
  {
      path: '',
      component: UserDetailsComponent,
      pathMatch: 'full'
  }
];

@NgModule({
  declarations: [UserDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminHeaderModule,
    RouterModule.forChild(routes),
    FormsModule,
    FooterModule
  ]
})

export class UserDetailsModule { }
