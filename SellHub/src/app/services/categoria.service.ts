import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertService } from "@shared/services/alert.service";
import { CategoriaApi } from "../responses/categoria/categoria.responses";
import { environment as env } from "src/environments/environment";
import { endpoints } from "@shared/apis/endpoints";
import { ListCategoriaRequest } from "../requests/categoria/list-categoria.request";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CategoriaService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(size, sort, order, page, getInputs): Observable<CategoriaApi> {
    const requestUrl = `${env.api}${endpoints.LIST_CATEGORIAS}`;
    const params: ListCategoriaRequest = new ListCategoriaRequest(
      page + 1,
      order,
      sort,
      size,
      getInputs.numFilter,
      getInputs.textFilter,
      getInputs.stateFilter,
      getInputs.startDate,
      getInputs.endDate
    );

    return this._http.post<CategoriaApi>(requestUrl, params).pipe(
      map((data: CategoriaApi) => {
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
        });
        return data;
      })
    );
  }
}
