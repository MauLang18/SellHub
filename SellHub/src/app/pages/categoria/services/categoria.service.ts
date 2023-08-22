import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertService } from "@shared/services/alert.service";
import { environment as env } from "src/environments/environment";
import { endpoints } from "@shared/apis/endpoints";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { categoriaRequest } from "../models/categoria-request.interface";
import { getIcon } from "@shared/functions/helpers";
import { ListCategoriaRequest } from "../models/list-categoria-request.interface";
import { Categoria } from "src/app/pages/categoria/models/categoria-responses.interface";
import { BaseApiResponse, BaseResponse } from "@shared/models/base-api-response.interface";

@Injectable({
  providedIn: "root",
})
export class CategoriaService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(size, sort, order, page, getInputs): Observable<BaseApiResponse> {
    const requestUrl = `${env.api}${
      endpoints.LIST_CATEGORIAS
    }?records=${size}&sort=${sort}&order=${order}&numPage=${page + 1}${getInputs}`;

    return this._http.get<BaseApiResponse>(requestUrl).pipe(
      map((data: BaseApiResponse) => {
        data.data.items.forEach(function (e: any) {
          switch (e.estado) {
            case 0:
              e.badgeColor = "text-gray bg-gray-light";
              break;
            case 1:
              e.badgeColor = "text-green bg-green-light";
              break;
            default:
              e.badgeColor = "text-gray bg-gray-light";
              break;
          }
          e.icEdit = getIcon("icEdit", "Editar Categoria", true,);
          e.icDelete = getIcon("icDelete", "Eliminar Categoria", true);
        });
        return data;
      })
    );
  }

  CategoriaRegister(categoria: categoriaRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoints.REGISTER_CATEGORIA}`;

    return this._http.post(requestUrl, categoria).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  CategoriaById(pkTblPosCategoria: number): Observable<Categoria> {
    const requestUrl = `${env.api}${endpoints.CATEGORIA_BY_ID}${pkTblPosCategoria}`;

    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  CategoriaEdit(
    pkTblPosCategoria: number,
    categoria: categoriaRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoints.EDIT_CATEGORIA}${pkTblPosCategoria}`;

    return this._http.put(requestUrl, categoria).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  CategoriaRemove(pkTblPosCategoria: number): Observable<void> {
    const requestUrl = `${env.api}${endpoints.REMOVE_CATEGORIA}${pkTblPosCategoria}`;

    return this._http.put(requestUrl, "").pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
