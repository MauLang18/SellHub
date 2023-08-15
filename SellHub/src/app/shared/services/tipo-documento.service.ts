import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoints } from "@shared/apis/endpoints";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { TipoDocumento } from "@shared/models/tipoDocumento.interface";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class TipoDocumentoService {
  constructor(private _http: HttpClient) {}

  listTipoDocumentos(): Observable<TipoDocumento[]> {
    const requestUrl = `${env.api}${endpoints.LIST_TIPO_DOCUMENTO}`;

    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse ) => {
        return resp.data;
      })
    );
  }
}
