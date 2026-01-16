import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { ClientSideRowModelModule, ModuleRegistry } from 'ag-grid-community'
import { LicenseManager, TreeDataModule } from 'ag-grid-enterprise'

const app = createApp(App)

app.use(createPinia())
app.use(router)

ModuleRegistry.registerModules([ClientSideRowModelModule, TreeDataModule])
LicenseManager.setLicenseKey(import.meta.env.VITE_AG_GRID_KEY)

app.mount('#app')
