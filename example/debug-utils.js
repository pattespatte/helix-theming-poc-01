/**
 * Debug utility to list all available Hx and F-prefixed components from Helix and FKUI
 */

/**
 * Logs all available Hx and F-prefixed components from Helix and FKUI
 * Only runs in development mode
 */
export function logComponents() {
	// Only run in development mode
	if (import.meta.env.MODE !== 'development') {
		return;
	}

	console.log('[DEBUG] Component Libraries');

	// Import all components from both packages
	Promise.all([
		import('@helix/vue'),
		import('@fkui/vue')
	]).then(([helixExports, fkuiExports]) => {
		// List of Hx-prefixed components to display
		const hxComponents = [
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

		// List of F-prefixed components to display
		const fComponents = [
			'FTextField',
			'FCard',
			'FCheckboxField',
			'FRadioField',
			'FTextareaField',
			'FSelectField',
			'FMessageBox',
			'FBadge',
			'FValidationForm'
		];

		// Filter to only include components that are actually available
		const availableHxComponents = hxComponents.filter(name => name in helixExports);
		const availableFComponents = fComponents.filter(name => name in fkuiExports);

		console.log('');
		console.log('=== Helix Components ===');
		availableHxComponents.forEach(name => {
			console.log(`  - ${name}`);
		});

		// Show which expected Hx components are not available
		const missingHxComponents = hxComponents.filter(name => !(name in helixExports));
		if (missingHxComponents.length > 0) {
			console.log('');
			console.log('- Expected but not available:');
			missingHxComponents.forEach(name => {
				console.log(`  - ${name}`);
			});
		}

		console.log('');
		console.log('=== FKUI Components ===');
		availableFComponents.forEach(name => {
			console.log(`  - ${name}`);
		});

		// Show which expected F components are not available
		const missingFComponents = fComponents.filter(name => !(name in fkuiExports));
		if (missingFComponents.length > 0) {
			console.log('');
			console.log('- Expected but not available:');
			missingFComponents.forEach(name => {
				console.log(`  - ${name}`);
			});
		}

		console.log('');
	}).catch(error => {
		console.error('Error importing components:', error);
	});
}