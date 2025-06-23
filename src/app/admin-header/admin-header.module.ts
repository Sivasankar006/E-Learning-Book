import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from './admin-header.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AdminHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  exports: [AdminHeaderComponent]
})

export class AdminHeaderModule { }
