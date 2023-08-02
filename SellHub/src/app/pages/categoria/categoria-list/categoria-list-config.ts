import { TableColumn } from "src/@vex/interfaces/table-column.interface";
import { Categoria } from "src/app/responses/categoria/categoria.responses";
import icCategory from "@iconify/icons-ic/twotone-category";

const tableColumns: TableColumn<Categoria>[] = [
  {
    label: "Nombre",
    property: "nombre",
    type: "text",
    cssClasses: ['font-medium', 'w-10'],
  },
  {
    label: "Descripcion",
    property: "descripcion",
    type: "textTruncate",
    cssClasses: ['font-medium', 'w-10'],
  },
  {
    label: "F. Creación",
    property: "fechacreacionauditoria",
    type: "datetime",
    cssClasses: ['font-medium', 'w-10'],
  },
  {
    label: "Estado",
    property: "estadoCategoria",
    type: "badge",
    cssClasses: ['font-medium', 'w-10'],
  },
  {
    label: "",
    property: 'menu',
    type: "buttonGroup",
    buttonItems: [
      {
        buttonLabel: "EDITAR",
        buttonAction: "edit",
        buttonCondition: null,
        disable: false
      },
      {
        buttonLabel: "ELIMINAR",
        buttonAction: "remove",
        buttonCondition: null,
        disable: false
      }
    ],
    cssClasses: ['font-medium', 'w-10']
  }
];

const inputs = {
  numFilter: 0,
  textFilte: "",
  stateFilter: null,
  startDate: null,
  endDate: null
}

export const componentSettings = {
  //ICONS
  icCategory: icCategory,
  
  //TABLE SETTINGS
  tableColumns: tableColumns,
  initialSort: "Id",
  initialSortDir: "desc",
  getInputs: inputs,
  buttonLabel: "EDITAR",
  buttonLabel2: "ELIMINAR",
  columsFilter: tableColumns.map((column) => {return {label: column.label, property: column.property, type: column.type}})
}
