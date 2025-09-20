import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
	plugins: [vue()],
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.js'),
			name: 'Helix',
			formats: ['es', 'umd']
		},
		rollupOptions: {
			external: ['vue', '@fkui/vue'],
			output: {
				globals: {
					vue: 'Vue',
					'@fkui/vue': 'FKUI'
				}
			}
		}
	}
});