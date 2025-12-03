/**
 * Debug utility to list all available components from FKUI and Helix
 */

/**
 * Extracts component names from an object's exports
 * @param {Object} exports - The exports object to analyze
 * @returns {Array<string>} - Array of component names
 */
function extractComponentNames(exports) {
	const componentNames = [];

	for (const [key, value] of Object.entries(exports)) {
		// Check if it's a Vue component (has a name property or is a function)
		if (typeof value === 'function' ||
			(typeof value === 'object' && value !== null && value.__v_skip !== true)) {
			componentNames.push(key);
		}
	}

	return componentNames.sort();
}

/**
 * Logs all available Helix components
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
		// Get all exports from @helix/vue
		const allExports = helixExports;
		const allComponentNames = extractComponentNames(allExports);

		// Filter to only show Hx-prefixed components (Helix components)
		const helixComponentNames = allComponentNames.filter(
			name => name.startsWith('Hx')
		);

		console.log('');
		console.log('- Helix Components:');
		helixComponentNames.forEach(name => {
			console.log(`  - ${name}`);
		});

		console.log('');
	}).catch(error => {
		console.error('Error importing Helix components:', error);
	});
}