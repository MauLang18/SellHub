import { TableColumn } from "@shared/models/list-table.interface";
import { MenuItems } from "@shared/models/menu-items.interface";
import { SearchOptions } from "@shared/models/search-options.interface";
import { IconsService } from "@shared/services/icons.service";
import { GenericValidators } from "@shared/validators/generic-validators";
import { ProveedorResponse } from "../../models/proveedor-response.interface";

const searchOptions: SearchOptions[] = [
  {
    label: "Nombre",
    value: 1,
    placeholder: "Buscar por Nombre",
    validation: [GenericValidators.defaultName],
    validation_desc: "Solo se permite letras en esta búsqueda",
    icon: "icName",
  },
  {
    label: "Email",
    value: 2,
    placeholder: "Buscar por Email",
    validation: [GenericValidators.emailValidation],
    validation_desc: "Solo se permite correos validos.",
    icon: "icMail",
  },
  {
    label: "N° Documento",
    value: 3,
    placeholder: "Buscar por N° Documento",
    validation: [GenericValidators.document],
    validation_desc: "Solo se permite documentos válidos",
    icon: "icDescription",
  },
];

const menuItems: MenuItems[] = [
  {
    type: "link",
    id: "all",
    icon: IconsService.prototype.getIcon("icViewHeadline"),
    label: "Todos",
  },
  {
    type: "link",
    id: "Activo",
    value: 1,
    icon: IconsService.prototype.getIcon("icLabel"),
    label: "Activo",
    class: {
      icon: "text-green",
    },
  },
  {
    type: "link",
    id: "Inactivo",
    value: 0,
    icon: IconsService.prototype.getIcon("icLabel"),
    label: "Inactivo",
    class: {
      icon: "text-gray",
    },
  },
];

const tableColumns: TableColumn<ProveedorResponse>[] = [
  {
    label: "NOMBRE",
    cssLabel: ["font-bold", "text-sm"],
    property: "nombre",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: true,
    sort: true,
    sortProperty: "nombre",
    visible: true,
    download: true,
  },
  {
    label: "EMAIL",
    cssLabel: ["font-bold", "text-sm"],
    property: "correo",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "correo",
    visible: true,
    download: true,
  },
  {
    label: "TIPO DOCUMENTO",
    cssLabel: ["font-bold", "text-sm"],
    property: "tipoDocumento",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "tipoDocumento",
    visible: true,
    download: true,
  },
  {
    label: "N° DOCUMENTO",
    cssLabel: ["font-bold", "text-sm"],
    property: "numeroDocumento",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "numeroDocumento",
    visible: true,
    download: true,
  },
  {
    label: "DIRECCIÓN",
    cssLabel: ["font-bold", "text-sm"],
    property: "direccion",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "direccion",
    visible: true,
    download: true,
  },
  {
    label: "TELEFONO",
    cssLabel: ["font-bold", "text-sm"],
    property: "telefono",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "telefono",
    visible: true,
    download: true,
  },
  {
    label: "F. DE CREACIÓN",
    cssLabel: ["font-bold", "text-sm"],
    property: "fechaCreacionAuditoria",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "datetime",
    sticky: false,
    sort: false,
    visible: true,
    download: true,
  },
  {
    label: "ESTADO",
    cssLabel: ["font-bold", "text-sm"],
    property: "estadoProveedor",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "badge",
    sticky: false,
    sort: false,
    visible: true,
    download: true,
  },
  {
    label: "",
    cssLabel: [],
    property: "icEdit",
    cssProperty: [],
    type: "icon",
    action: "edit",
    sticky: false,
    sort: false,
    visible: true,
    download: false,
  },
  {
    label: "",
    cssLabel: [],
    property: "icDelete",
    cssProperty: [],
    type: "icon",
    action: "remove",
    sticky: false,
    sort: false,
    visible: true,
    download: false,
  },
];

const filters = {
  numFilter: 0,
  textFilter: "",
  stateFilter: null,
  startDate: null,
  endDate: null,
  refresh: false,
};

const getInputs: string = "";

export const componentSettings = {
  //ICONS
  icProvider: IconsService.prototype.getIcon("icProvider"),
  icCalendarMonth: IconsService.prototype.getIcon("icCalendarMonth"),
  //LAYOUT SETTINGS
  menuOpen: false,
  //TABLE SETTINGS
  tableColumns: tableColumns,
  initialSort: "Id",
  initialSortDir: "desc",
  getInputs: getInputs,
  buttonLabel: "EDITAR",
  buttonLabel2: "ELIMINAR",
  //SEARCH FILTERS
  menuItems: menuItems,
  searchOptions: searchOptions,
  filters_date_active: false,
  filters: filters,
  datesFilterArray: ["Fecha de creación"],
  filename: "listado-de-proveedores",
};