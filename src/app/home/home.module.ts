import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderModule } from '../../app/components/header/header.module';
import { FooterModule } from '../components/footer/footer.module';

const routes: Routes = [
  {
      path: '',
      component: HomeComponent,
      pathMatch: 'full'
  }
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    RouterModule.forChild(routes),
    FormsModule,
  ]
})

export class HomeModule { }
