import { stagger40ms } from "../../../../../@vex/animations/stagger.animation";
import { fadeInRight400ms } from "../../../../../@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "../../../../../@vex/animations/scale-in.animation";
import { Component, OnInit } from "@angular/core";
import { CustomTitleService } from "@shared/services/custom-title.service";
import { CategoriaService } from "src/app/pages/categoria/services/categoria.service";
import { componentSettings } from "./categoria-list-config";
import { DatesFilter } from "@shared/functions/actions";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CategoriaManageComponent } from "../categoria-manage/categoria-manage.component";
import Swal from "sweetalert2";
import { FiltersBox } from "@shared/models/search-options.interface";
import { BaseApiResponse } from "@shared/models/base-api-response.interface";

@Component({
  selector: "vex-categoria-list",
  templateUrl: "./categoria-list.component.html",
  styleUrls: ["./categoria-list.component.scss"],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class CategoriaListComponent implements OnInit {
  component;

  constructor(
    customTitle: CustomTitleService,
    public _categoriaService: CategoriaService,
    public _dialog: MatDialog
  ) {
    customTitle.set("Categorias");
  }

  ngOnInit(): void {
    this.component = componentSettings;
  }

  setData(value: number) {
    this.component.filters.stateFilter = value;
    this.formatGetInputs();
  }

  search(data: FiltersBox) {
    this.component.filters.numFilter = data.searchValue;
    this.component.filters.textFilter = data.searchData;
    this.formatGetInputs();
  }

  datesFilterOpen() {
    DatesFilter(this);
  }

  formatGetInputs() {
    let str = "";

    if (this.component.filters.textFilter != null) {
      str += `&numFilter=${this.component.filters.numFilter}&textFilter=${this.component.filters.textFilter}`;
    }

    if (this.component.filters.stateFilter != null) {
      str += `&stateFilter=${this.component.filters.stateFilter}`;
    }

    if (
      this.component.filters.startDate != "" &&
      this.component.filters.endDate != ""
    ) {
      str += `&startDate=${this.component.filters.startDate}`;
      str += `&endDate=${this.component.filters.endDate}`;
    }

    if (this.component.filters.refresh) {
      let random = Math.random();
      str += `&refresh=${random}`;
      this.component.filters.refresh = false;
    }

    this.component.getInputs = str;
  }

  openDialogRegister() {
    this._dialog
      .open(CategoriaManageComponent, {
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.formatGetInputs();
          this.setGetInputsCategorias(true);
        }
      });
  }

  rowClick(e: any) {
    let action = e.action;
    let categoria = e.row;

    switch (action) {
      case "edit":
        this.CategoriaEdit(categoria);
        break;
      case "remove":
        this.CategoriaRemove(categoria);
        break;
    }
    return false;
  }

  CategoriaEdit(row: BaseApiResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = row;

    let dialogRef = this._dialog.open(CategoriaManageComponent, {
      data: dialogConfig,
      disableClose: true,
      width: "400px",
    });
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp) {
        this.formatGetInputs();
        this.setGetInputsCategorias(true);
      }
    });
  }

  CategoriaRemove(categoria: any) {
    Swal.fire({
      title: `¿Realemnte deseas eliminar la categoría ${categoria.nombre}?`,
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
        this._categoriaService
          .CategoriaRemove(categoria.pkTblPosCategoria)
          .subscribe(() => this.setGetInputsCategorias(true));
      }
    });
  }

  setGetInputsCategorias(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadUrl(){
    return `Categoria?Download=true`;
  }
}
