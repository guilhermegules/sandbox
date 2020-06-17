import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterTestingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientTestingModule,
  ],
  exports: [
    CommonModule,
    RouterTestingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientTestingModule,
  ]
})
export class TestingModule {}
