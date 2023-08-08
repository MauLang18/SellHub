export interface Categoria {
  pkTblPosCategoria: number
  nombre: string
  descripcion: string
  fechacreacionauditoria : Date
  estado: number
  estadoCategoria: string
}

export interface CategoriaApi {
  data: any
  totalRecords: number
}