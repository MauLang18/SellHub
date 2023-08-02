export interface Categoria {
  PkTblPosCategoria: number
  Nombre: string
  Descripcion: string
  Fechacreacionauditoria : Date
  Estado: number
  EstadoCategoria: string
}

export interface CategoriaApi {
  data: any
  totalRecords: number
}