import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHistoryComponent } from './admin-history.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  
import { AdminHeaderModule } from '../../app/admin-header/admin-header.module';
import { FooterModule } from '../components/footer/footer.module';

const routes: Routes = [
  {
      path: '',
      component: AdminHistoryComponent,
      pathMatch: 'full'
  }
];

@NgModule({
  declarations: [AdminHistoryComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminHeaderModule,
    RouterModule.forChild(routes),
    FormsModule,
    FooterModule
  ]
})

export class AdminHistoryModule { }
