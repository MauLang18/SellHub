import { HttpHeaders } from "@angular/common/http"

export const endpoints = {
  //CATEGORIA MODULE
  LIST_CATEGORIAS: 'Categoria',
  LIST_SELECT_CATEGORIAS: 'Categoria/Select',
  CATEGORIA_BY_ID: 'Categoria/',
  REGISTER_CATEGORIA: 'Categoria/Register/',
  EDIT_CATEGORIA: 'Categoria/Edit/',
  REMOVE_CATEGORIA: 'Categoria/Remove/',

  //AUTH MODULE
  LOGIN: 'Auth/Login',
  LOGIN_GOOGLE: 'Auth/LoginWithGoogle',

  //PROVEEDOR MODULE
  LIST_PROVEEDORES: 'Proveedor',
  PROVEEDOR_BY_ID: 'Proveedor/',
  REGISTER_PROVEEDOR: 'Proveedor/Register/',
  EDIT_PROVEEDOR: 'Proveedor/Edit/',
  REMOVE_PROVEEDOR: 'Proveedor/Remove/',

  //TIPO DOCUMENTO MODULE
  LIST_TIPO_DOCUMENTO: 'TipoDocumento',
}

export const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  })
}