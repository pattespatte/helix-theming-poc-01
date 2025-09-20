// Re-export everything upstream
// Reuse all FKUI components
export * from '@fkui/vue';

// Always include Helix design layer
import '@helix/design';

// Override specific components if needed
export { default as HxButton } from './components/Button.vue';