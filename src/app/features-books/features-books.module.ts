import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesBooksComponent } from './features-books.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderModule } from '../../app/components/header/header.module';
import { FooterModule } from '../components/footer/footer.module';

const routes: Routes = [
  {
      path: '',
      component: FeaturesBooksComponent,
      pathMatch: 'full'
  }
];

@NgModule({
  declarations: [FeaturesBooksComponent],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    RouterModule.forChild(routes),
    FormsModule,
  ]
})

export class FeaturesBooksModule { }
