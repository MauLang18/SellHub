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
    let inputs = {
      numFilter: 0,
      textFilter: "",
      stateFilter: null,
      startDate: null,
      endDate: null,
    };

    if (this.component.filters.numFilter != "") {
      inputs.numFilter = this.component.filters.numFilter;
      inputs.textFilter = this.component.filters.textFilter;
    }

    if (this.component.filters.stateFilter != null) {
      inputs.stateFilter = this.component.filters.stateFilter;
    }

    if (
      this.component.filters.startDate != "" &&
      this.component.filters.endDate != ""
    ) {
      inputs.startDate = this.component.filters.startDate;
      inputs.endDate = this.component.filters.endDate;
    }

    this.component.getInputs = inputs;
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
          .subscribe(() => this.formatGetInputs());
      }
    });
  }
}
