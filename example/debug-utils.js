/**
 * Debug utility to list all available components from FKUI and Helix
 */

/**
 * Extracts component names from an object's exports
 * @param {Object} exports - The exports object to analyze
 * @returns {Array<string>} - Array of component names
 */
function extractComponentNames(exports, prefix = 'F') {
	const componentNames = [];
	
	// List of actual Vue components we want to show for FKUI
	const fkuiTargetComponents = [
		'FTextField',
		'FCard',
		'FCheckboxField',
		'FRadioField',
		'FTextareaField',
		'FSelectField',
		'FMessageBox',
		'FBadge',
		'FValidationForm',
		'FButton'
	];

	// List of actual Vue components we want to show for Helix
	const helixTargetComponents = [
		'HxButton',
		'HxTextField',
		'HxCard',
		'HxCheckboxField',
		'HxRadioField',
		'HxTextareaField',
		'HxSelectField',
		'HxMessageBox',
		'HxBadge',
		'HxValidationForm'
	];

	// Select the appropriate target list based on prefix
	const targetComponents = prefix === 'Hx' ? helixTargetComponents : fkuiTargetComponents;

	for (const [key, value] of Object.entries(exports)) {
		// Only include components that:
		// 1. Start with the specified prefix (F or Hx)
		// 2. Are in our target components list
		// 3. Are actual Vue components (have render function or component structure)
		if (key.startsWith(prefix) &&
			targetComponents.includes(key) &&
			(typeof value === 'function' ||
			(typeof value === 'object' && value !== null && (
				value.render ||
				value.template ||
				value.__vccOpts ||
				value.setup ||
				value.components
			)))) {
			componentNames.push(key);
		}
	}

	return componentNames.sort();
}

/**
 * Logs all available components from FKUI and Helix
 * Only runs in development mode
 */
export function logComponents() {
	// Only run in development mode
	if (import.meta.env.MODE !== 'development') {
		return;
	}

	console.log('[DEBUG] Components');

	// Import all components from the helix vue package
	import('@helix/vue').then((helixExports) => {
		// Since FKUI components are re-exported from @helix/vue, we need to separate them
		// We'll import FKUI directly to identify which components are from FKUI
		import('@fkui/vue').then((fkuiExports) => {
			// Extract FKUI components (F-prefixed)
			const fkuiComponentNames = extractComponentNames(fkuiExports, 'F');

			// Extract Helix components (Hx-prefixed) from helix exports
			const helixComponentNames = extractComponentNames(helixExports, 'Hx');

			console.log('');
			console.log('- FKUI:');
			fkuiComponentNames.forEach(name => {
				console.log(`  - ${name}`);
			});

			console.log('');
			console.log('- Helix:');
			helixComponentNames.forEach(name => {
				console.log(`  - ${name}`);
			});

			console.log('');
		}).catch(error => {
			console.error('Error importing FKUI components:', error);
		});
	}).catch(error => {
		console.error('Error importing Helix components:', error);
	});
}