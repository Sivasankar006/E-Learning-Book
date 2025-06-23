import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAddbookComponent } from './admin-addbook.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  
import { AdminHeaderModule } from '../../app/admin-header/admin-header.module';
import { HttpClientModule } from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FooterModule } from '../components/footer/footer.module';


const routes: Routes = [
  {
      path: '',
      component: AdminAddbookComponent,
      pathMatch: 'full'
  }
];

@NgModule({
  declarations: [AdminAddbookComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminHeaderModule,
    HttpClientModule,
    CKEditorModule,
    RouterModule.forChild(routes),
    FormsModule,
    FooterModule,
  ]
})

export class AdminAddbookModule {}
