import { environment as env } from "./../../../../environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  BaseApiResponse,
  BaseResponse,
} from "@shared/models/base-api-response.interface";
import { endpoints } from "@shared/apis/endpoints";
import { map } from "rxjs/operators";
import {
  ProveedorById,
  ProveedorResponse,
} from "../models/proveedor-response.interface";
import { getIcon } from "@shared/functions/helpers";
import { ProveedorRequest } from "../models/proveedor-request.interface";
import { AlertService } from "@shared/services/alert.service";

@Injectable({
  providedIn: "root",
})
export class ProveedorService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseApiResponse> {
    const requestUrl = `${env.api}${
      endpoints.LIST_PROVEEDORES
    }?records=${size}&sort=${sort}&order=${order}&numPage=${page + 1}${getInputs}`;

    return this._http.get<BaseApiResponse>(requestUrl).pipe(
      map((resp) => {
        resp.data.items.forEach(function (prov: ProveedorResponse) {
          switch (prov.estado) {
            case 0:
              prov.badgeColor = "text-gray bg-gray-light";
              break;
            case 1:
              prov.badgeColor = "text-green bg-green-light";
              break;
            default:
              prov.badgeColor = "text-gray bg-gray-light";
              break;
          }
          prov.icEdit = getIcon("icEdit", "Editar Proveedor", true);
          prov.icDelete = getIcon(
            "icDelete",
            "Eliminar Proveedor",
            true
          );
        });
        return resp;
      })
    );
  }

  proveedorById(pkTblPosProveedor: number): Observable<ProveedorById> {
    const requestUrl = `${env.api}${endpoints.PROVEEDOR_BY_ID}${pkTblPosProveedor}`;

    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  proveedorRegister(proveedor: ProveedorRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoints.REGISTER_PROVEEDOR}`;

    return this._http.post(requestUrl, proveedor).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  proveedorEdit(
    proveedorId: number,
    proveedor: ProveedorRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoints.EDIT_PROVEEDOR}${proveedorId}`;

    return this._http.put<BaseResponse>(requestUrl, proveedor);
  }

  proveedorRemove(proveedorId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoints.REMOVE_PROVEEDOR}${proveedorId}`;

    return this._http.put<BaseResponse>(requestUrl, "").pipe(
      map((resp: BaseResponse) => {
        if(resp.isSuccess){
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
