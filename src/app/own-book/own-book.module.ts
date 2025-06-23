import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnBookComponent } from './own-book.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { HeaderModule } from '../../app/components/header/header.module';
import { FooterModule } from '../components/footer/footer.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

const routes: Routes = [
  {
      path: '',
      component: OwnBookComponent,
      pathMatch: 'full'
  }
];

@NgModule({
  declarations: [OwnBookComponent],
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

export class OwnBookModule { }
