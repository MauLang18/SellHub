import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Login } from "../models/login.interfaces";
import { BehaviorSubject, Observable } from "rxjs";
import { ApiResponse } from "src/app/commons/response.interface";
import { environment as env } from "src/environments/environment";
import { endpoints, httpOptions } from "@shared/apis/endpoints";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private user: BehaviorSubject<ApiResponse>;

  public get userToken(): ApiResponse {
    return this.user.value;
  }

  constructor(private http: HttpClient) {
    this.user = new BehaviorSubject<ApiResponse>(
      JSON.parse(localStorage.getItem("token"))
    );
  }

  login(req: Login): Observable<ApiResponse> {
    const requestUrl = `${env.api}${endpoints.GENERATE_TOKEN}`;

    return this.http.post<ApiResponse>(requestUrl, req, httpOptions).pipe(
      map((resp: ApiResponse) => {
        if (resp.isSuccess) {
          localStorage.setItem("token", JSON.stringify(resp.data));
          this.user.next(resp.data);
        }

        return resp;
      })
    );
  }
}
