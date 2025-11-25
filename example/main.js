import { createApp } from 'vue'
import App from './App.vue'
import { logComponents } from './debug-utils.js'

// Log all available components in development mode
logComponents()

createApp(App).mount('#app')