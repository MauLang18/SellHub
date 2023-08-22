import { Component, OnInit } from "@angular/core";
import { CustomTitleService } from "@shared/services/custom-title.service";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { ProveedorService } from "../../services/proveedor.service";
import { componentSettings } from "./proveedor-list-config";
import { FiltersBox } from "@shared/models/search-options.interface";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ProveedorManageComponent } from "../proveedor-manage/proveedor-manage.component";
import { ProveedorResponse } from "../../models/proveedor-response.interface";
import { RowClick } from "@shared/models/row-click.interface";
import Swal from "sweetalert2";

@Component({
  selector: "vex-proveedor-list",
  templateUrl: "./proveedor-list.component.html",
  styleUrls: ["./proveedor-list.component.scss"],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class ProveedorListComponent implements OnInit {
  component: any;

  constructor(
    customTitle: CustomTitleService,
    public _proveedorService: ProveedorService,
    public _dialog: MatDialog
  ) {
    customTitle.set("Proveedores");
  }

  ngOnInit(): void {
    this.component = componentSettings;
  }

  setMenu(value: number) {
    this.component.filters.stateFilter = value;
    this.formatGetInputs();
  }

  search(data: FiltersBox) {
    this.component.filters.numFilter = data.searchValue;
    this.component.filters.textFilter = data.searchData;
    this.formatGetInputs();
  }

  formatGetInputs() {
    let str = "";

    if (this.component.filters.textFilter != null) {
      str += `&numFilter=${this.component.filters.numFilter}&textFilter=${this.component.filters.textFilter}`;
    }

    if (this.component.filters.stateFilter != null) {
      str += `&stateFilter=${this.component.filters.stateFilter}`;
    }

    if (this.component.filters.refresh) {
      let random = Math.random();
      str += `&refresh=${random}`;
      this.component.filters.refresh = false;
    }

    this.component.getInputs = str;
  }

  openDialogRegister() {
    this._dialog.open(ProveedorManageComponent, {
      disableClose: true,
      width: "400px"
    })
    .afterClosed()
    .subscribe((resp) =>{
      if(resp){
        this.setGetInputsProveedores(true);
      }
    })
  }

  rowClick(rowClick: RowClick<ProveedorResponse>){
    let action = rowClick.action;
    let proveedor = rowClick.row;

    switch(action){
      case "edit":
        this.proveedorEdit(proveedor);
        break;
      case "remove":
        this.proveedorRemove(proveedor);
        break;
    }

    return false;
  }

  proveedorEdit(proveedorData: ProveedorResponse){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = proveedorData;

    this._dialog.open(ProveedorManageComponent,{
      data: dialogConfig,
      disableClose: true,
      width: "400px",
    })
    .afterClosed()
    .subscribe((resp) => {
      if(resp){
        this.setGetInputsProveedores(true);
      }
    })
  }

  proveedorRemove(proveedorData: ProveedorResponse){
    Swal.fire({
      title: `¿Realemnte deseas eliminar el proveedor ${proveedorData.nombre}?`,
      text: "Se borrará de forma permanente!",
      icon: "warning",
      showCancelButton: true,
      focusCancel: true,
      confirmButtonColor: "rgb(210,155,253)",
      cancelButtonColor: "rgb(79,109,253)",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      width: 430,
    }).then((result) => {
      if (result.isConfirmed) {
        this._proveedorService
          .proveedorRemove(proveedorData.pkTblPosProveedor)
          .subscribe(() => this.setGetInputsProveedores(true));
      }
    });
  }

  setGetInputsProveedores(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadUrl(){
    return `Proveedor?Download=true`;
  }
}
