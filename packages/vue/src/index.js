// Re-export everything upstream
// Reuse all FKUI components
export * from '@fkui/vue';

// Always include Helix design layer
import '@helix/design';

// Override specific components if needed
export { default as HxButton } from './components/Button.vue';

// Export Helix components (these will be implemented later)
// For now, we'll re-export the FKUI components with Hx prefixes
import {
	FTextField,
	FCard,
	FCheckboxField,
	FRadioField,
	FTextareaField,
	FSelectField,
	FMessageBox,
	FBadge,
	FValidationForm
} from '@fkui/vue';

// Re-export with Hx prefixes
export {
	FTextField as HxTextField,
	FCard as HxCard,
	FCheckboxField as HxCheckboxField,
	FRadioField as HxRadioField,
	FTextareaField as HxTextareaField,
	FSelectField as HxSelectField,
	FMessageBox as HxMessageBox,
	FBadge as HxBadge,
	FValidationForm as HxValidationForm
};