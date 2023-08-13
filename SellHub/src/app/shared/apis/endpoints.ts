import { HttpHeaders } from "@angular/common/http"

export const endpoints = {
  //CATEGORIA MODULE
  LIST_CATEGORIAS: 'Categoria',
  LIST_SELECT_CATEGORIS: 'Categoria/Select',
  CATEGORIA_BY_ID: 'Categoria/',
  REGISTER_CATEGORIA: 'Categoria/Register/',
  EDIT_CATEGORIA: 'Categoria/Edit/',
  REMOVE_CATEGORIA: 'Categoria/Remove/',

  //AUTH MODULE
  LOGIN: 'Auth/Login',
  LOGIN_GOOGLE: 'Auth/LoginWithGoogle',
}

export const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  })
}