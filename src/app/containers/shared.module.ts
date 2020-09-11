import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './product/add/add.component';

@NgModule({
  declarations: [
    AddProductComponent
  ],
  exports: [
    AddProductComponent
 ],
  imports: [CommonModule, FormsModule,ReactiveFormsModule]
})
export class SharedModule { }
