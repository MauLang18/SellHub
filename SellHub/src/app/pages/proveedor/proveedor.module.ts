import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ListTableComponent } from '@shared/components/reusables/list-table/list-table.component';
import { MenuComponent } from '@shared/components/reusables/menu/menu.component';
import { SearchBoxMultipleComponent } from '@shared/components/reusables/search-box-multiple/search-box-multiple.component';
import { SharedModule } from '@shared/shared.module';
import { ProveedorRoutingModule } from './proveedor-routing.module';
import { ProveedorListComponent } from './components/proveedor-list/proveedor-list.component';
import { ProveedorManageComponent } from './components/proveedor-manage/proveedor-manage.component';
import { ExportExcelComponent } from '@shared/components/reusables/export-excel/export-excel.component';


@NgModule({
  declarations: [
    ProveedorListComponent,
    ProveedorManageComponent
  ],
  imports: [
    CommonModule,
    ProveedorRoutingModule,
    SharedModule,
    ListTableComponent,
    SearchBoxMultipleComponent,
    MenuComponent,
    ExportExcelComponent
  ]
})
export class ProveedorModule { }
