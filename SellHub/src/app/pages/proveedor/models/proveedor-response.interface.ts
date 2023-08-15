export interface ProveedorResponse{
  pkTblPosProveedor: number;
  nombre: string;
  correo: string;
  tipoDocumento: string;
  numeroDocumento: string;
  direccion: string;
  telefono: string;
  fechaCreacionAuditoria: Date;
  estado: number;
  estadoProveedor: string;
  badgeColor: string;
  icEdit: any;
  icDelete: any;
}

export interface ProveedorById{
  pkTblPosProveedor: number;
  nombre: string;
  correo: string;
  fkIdTipoDocumento: number;
  numeroDocumento: string;
  direccion: string;
  telefono: string;
  estado: number;
}