import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { CategoriaListComponent } from './categoria-list/categoria-list.component';
import { SharedModule } from '@shared/shared.module';
import { CategoriaManageComponent } from './categoria-manage/categoria-manage.component';


@NgModule({
  declarations: [
    CategoriaListComponent,
    CategoriaManageComponent
  ],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    SharedModule
  ]
})
export class CategoriaModule { }
