import { stagger40ms } from "./../../../../@vex/animations/stagger.animation";
import { fadeInRight400ms } from "./../../../../@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "./../../../../@vex/animations/scale-in.animation";
import { Component, OnInit } from "@angular/core";
import { CustomTitleService } from "@shared/services/custom-title.service";
import { CategoriaService } from "src/app/services/categoria.service";
import { componentSettings } from "./categoria-list-config";
import { CategoriaApi } from "src/app/responses/categoria/categoria.responses";

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
    public _categoriaService: CategoriaService
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

  CategoriaEdit(row: CategoriaApi) {}

  CategoriaRemove(categoria: any) {}
}
