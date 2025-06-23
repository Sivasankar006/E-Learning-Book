import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderBooksComponent } from './order-books.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { HeaderModule } from '../../app/components/header/header.module';
import { FooterModule } from '../components/footer/footer.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

const routes: Routes = [
  {
      path: '',
      component: OrderBooksComponent,
      pathMatch: 'full'
  }
];

@NgModule({
  declarations: [OrderBooksComponent],
  imports: [
    CommonModule,
    HeaderModule,
    ReactiveFormsModule,
    FooterModule,
    RouterModule.forChild(routes),
    FormsModule,
    CKEditorModule
  ]
})


export class OrderBooksModule { }
