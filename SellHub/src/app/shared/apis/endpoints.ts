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
  GENERATE_TOKEN: 'Usuario/Generate/Token'
}

export const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  })
}