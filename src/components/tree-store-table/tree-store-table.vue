<script setup lang="ts">
import { items } from '@/data/items';
import { TreeStore } from '@/models/tree-store';
import type { ItemType } from '@/types';
import { themeQuartz, type ColDef, type GetRowIdFunc, type ValueGetterParams } from 'ag-grid-community';
import { AgGridVue } from 'ag-grid-vue3';
import { ref } from 'vue';

const theme = themeQuartz.withParams({
  headerColumnBorder: true,
  pinnedColumnBorder: false,
  headerBackgroundColor: '#f7f7f7',
});

const gridOptions = {
  rowNumbers: true,
};

const getRowId = ref<GetRowIdFunc>((params) => params.data.id);

const defaultColDef = ref<ColDef>({
  flex: 1,
  sortable: false,
  filter: false,
  resizable: false,
});

const columnDefs = ref<ColDef<ItemType>[]>([
  {
    headerName: "Наименование",
    field: "label",
  },
]);

const autoGroupColumnDef = {
  headerName: "Категория",
  valueGetter: (params: ValueGetterParams<ItemType, any, any>) => params.node?.allChildrenCount ? 'Группа' : 'Элемент',
  sortable: false,
};

const model = new TreeStore(items);
const rowData = ref<ItemType[]>(model.getAll());
</script>

<template>
  <h1>Tree store</h1>

  <ag-grid-vue style="width: 100%; height: 100vh;" gridId="tree-store" :theme :gridOptions :getRowId :treeData="true"
    treeDataParentIdField="parent" :autoGroupColumnDef :columnDefs :defaultColDef :rowData />
</template>

<style>
div[col-id="ag-Grid-RowNumbersColumn"]:not(.ag-header-cell) {
  background-color: #fff;
}

div[col-id="ag-Grid-RowNumbersColumn"].ag-header-cell::before {
  content: "№ п\\п";
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>