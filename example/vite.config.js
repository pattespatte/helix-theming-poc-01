import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
	plugins: [vue()],
	server: {
		port: 3001,
		watch: {
			ignored: ['!**/node_modules/@helix/**'],
			interval: 100
		}
	},
	optimizeDeps: {
		exclude: ['@helix/vue', '@helix/design']
	},
	resolve: {
		alias: {
			'@helix/vue': resolve(__dirname, '../packages/vue/src'),
			'@helix/design': resolve(__dirname, '../packages/design/src')
		}
	}
})