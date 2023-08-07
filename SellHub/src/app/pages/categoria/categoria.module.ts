import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { CategoriaListComponent } from './categoria-list/categoria-list.component';
import { SharedModule } from '@shared/shared.module';
import { CategoriaManageComponent } from './categoria-manage/categoria-manage.component';
import { ListTableComponent } from 'src/app/core/components/list-table/list-table.component';


@NgModule({
  declarations: [
    CategoriaListComponent,
    CategoriaManageComponent
  ],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    SharedModule,
    ListTableComponent
  ]
})
export class CategoriaModule { }
