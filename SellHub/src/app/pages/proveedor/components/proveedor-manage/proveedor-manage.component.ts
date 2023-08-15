import { Component, Inject, OnInit } from "@angular/core";
import { IconsService } from "@shared/services/icons.service";
import * as configs from "../../../../../static-data/configs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "@shared/services/alert.service";
import { ProveedorService } from "../../services/proveedor.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TipoDocumentoService } from "@shared/services/tipo-documento.service";
import { TipoDocumento } from "@shared/models/tipoDocumento.interface";

@Component({
  selector: "vex-proveedor-manage",
  templateUrl: "./proveedor-manage.component.html",
  styleUrls: ["./proveedor-manage.component.scss"],
})
export class ProveedorManageComponent implements OnInit {
  icClose = IconsService.prototype.getIcon("icClose");
  configs = configs;

  tipoDocumentos: TipoDocumento[];
  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      pkTblPosProveedor: [0, [Validators.required]],
      nombre: ["", [Validators.required]],
      correo: ["", [Validators.required]],
      fkIdTipoDocumento: ["", [Validators.required]],
      numeroDocumento: ["", [Validators.required]],
      direccion: [""],
      telefono: [""],
      estado: ["", [Validators.required]],
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _proveedorService: ProveedorService,
    public _dialogRef: MatDialogRef<ProveedorManageComponent>,
    private _tipoDocumentoService: TipoDocumentoService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.listTipoDocumentos();

    if(this.data != null){
      this.proveedorById(this.data.data.pkTblPosProveedor);
    }
  }

  proveedorById(pkTblPosProveedor: number): void{
    this._proveedorService.proveedorById(pkTblPosProveedor).subscribe((resp) => {
      this.form.reset({
        pkTblPosProveedor: resp.pkTblPosProveedor,
        nombre: resp.nombre,
        correo: resp.correo,
        fkIdTipoDocumento: resp.fkIdTipoDocumento,
        numeroDocumento: resp.numeroDocumento,
        direccion: resp.direccion,
        telefono: resp.telefono,
        estado: resp.estado
      });
    })
  }

  listTipoDocumentos(): void {
    this._tipoDocumentoService.listTipoDocumentos().subscribe((resp) => {
      this.tipoDocumentos = resp;
    });
  }

  proveedorSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const pkTblPosProveedor = this.form.get("pkTblPosProveedor").value;

    if (pkTblPosProveedor > 0) {
      this.proveedorEdit(pkTblPosProveedor);
    } else {
      this.proveedorRegister();
    }
  }

  proveedorRegister(): void {
    this._proveedorService
      .proveedorRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  proveedorEdit(pkTblPosProveedor: number): void {
    this._proveedorService.proveedorEdit(pkTblPosProveedor, this.form.value)
    .subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success("Excelente", resp.message);
        this._dialogRef.close(true);
      } else {
        this._alert.warn("Atención", resp.message);
      }
    })
  }
}
