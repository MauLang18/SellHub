import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit, Inject } from "@angular/core";
import icClose from "@iconify/icons-ic/twotone-close";
import * as configs from "../../../../../static-data/configs";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AlertService } from "@shared/services/alert.service";
import { CategoriaService } from "src/app/pages/categoria/services/categoria.service";

@Component({
  selector: "vex-categoria-manage",
  templateUrl: "./categoria-manage.component.html",
  styleUrls: ["./categoria-manage.component.scss"],
})
export class CategoriaManageComponent implements OnInit {
  icClose = icClose;
  configs = configs;

  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      pkTblPosCategoria: [0, [Validators.required]],
      nombre: ["", [Validators.required]],
      descripcion: [""],
      estado: ["", [Validators.required]],
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _categoriaService: CategoriaService,
    public _dialogRef: MatDialogRef<CategoriaManageComponent>
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    if (this.data != null) {
      this.CategoriaById(this.data.data.pkTblPosCategoria);
    }
  }

  CategoriaById(PkTblPosCategoria: number): void {
    this._categoriaService
      .CategoriaById(PkTblPosCategoria)
      .subscribe((resp) => {
        this.form.reset({
          pkTblPosCategoria: resp.pkTblPosCategoria,
          nombre: resp.nombre,
          descripcion: resp.descripcion,
          estado: resp.estado,
        });
      });
  }

  CategoriaSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const pkTblPosCategoria = this.form.get("pkTblPosCategoria").value;

    if (pkTblPosCategoria > 0) {
      this.CategoriaEdit(pkTblPosCategoria);
    } else {
      this.CategoriaRegister();
    }
  }

  CategoriaRegister(): void {
    this._categoriaService
      .CategoriaRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  CategoriaEdit(pkTblPosCategoria: number): void {
    this._categoriaService
      .CategoriaEdit(pkTblPosCategoria, this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }
}
