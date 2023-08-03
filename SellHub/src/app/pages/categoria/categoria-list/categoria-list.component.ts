import { stagger40ms } from "./../../../../@vex/animations/stagger.animation";
import { fadeInRight400ms } from "./../../../../@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "./../../../../@vex/animations/scale-in.animation";
import { Component, OnInit } from "@angular/core";
import { CustomTitleService } from "@shared/services/custom-title.service";
import { CategoriaService } from "src/app/services/categoria.service";
import { componentSettings } from "./categoria-list-config";
import { CategoriaApi } from "src/app/responses/categoria/categoria.responses";
import { DatesFilter } from "@shared/functions/actions";
import { MatDialog } from "@angular/material/dialog";

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

  setData(data: any = null) {
    this.component.filters.stateFilter = data.value;
    this.component.filters.menuOpen = false;
    this.formatGetInputs();
  }

  search(data: any) {
    this.component.filters.numFilter = data.searchValue;
    this.component.filters.textFilter = data.searchString;
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

    if(this.component.filters.startDate != "" && this.component.filters.endDate != "") {
      inputs.startDate = this.component.filters.startDate
      inputs.endDate = this.component.filters.endDate
    }

    this.component.getInputs = inputs;
  }

  CategoriaEdit(row: CategoriaApi) {}

  CategoriaRemove(categoria: any) {}
}
