# Three approaches regarding the relationship between Helix and FKUI components

## Current Architecture Analysis

The current setup in this POC follows the first approach: **"Let consumers use Helix and FKUI by just installing Helix"**

In [`packages/vue/src/index.js`](packages/vue/src/index.js:3), we are re-exporting all FKUI components:

```javascript
export * from '@fkui/vue';
```

This means when someone installs `@helix/vue`, they automatically get access to all FKUI components as well as the Helix-specific overrides like [`HxButton`](packages/vue/src/components/Button.vue:2).

## Evaluating the Three Approaches

### 1. Current Approach: Let consumers use both

**Pros:**

- Maximum flexibility for developers
- No breaking changes for existing FKUI users
- Easy migration path

**Cons:**

- Larger bundle size (all FKUI components are included)
- Potential confusion about which components to use
- Inconsistent user experience if developers mix styles

### 2. Restyle FKUI to match Helix

This would involve more extensive overrides in [`packages/design/src/overrides/_buttons.scss`](packages/design/src/overrides/_buttons.scss) for all FKUI components.

**Pros:**

- Consistent appearance across all components
- Developers can use familiar FKUI components with Helix styling

**Cons:**

- Maintenance overhead (need to track FKUI changes)
- Still includes all FKUI code in bundles
- Potential for CSS specificity conflicts

### 3. Block FKUI components (approached used in current Helix)

**Technical Implementation Options:**

```javascript
// Option A: Selective exports
import { FButton, FTextField } from '@fkui/vue';
export { FButton, FTextField }; // Only export what is needed

// Option B: Wrapper components only
// Don't re-export FKUI components directly
// Only export the Helix wrappers like HxButton
```

**Benefits of blocking FKUI:**

1. **Reduced Bundle Size**: Tree-shaking would be more effective if only needed components are exported
2. **Clearer API**: Developers only see Helix components
3. **Better Control**: Ensure consistent theming

**Challenges:**

1. **Breaking Change**: Existing code using FKUI directly would break
2. **Maintenance Burden**: You'd need to create wrappers for every component
3. **Loss of Flexibility**: Developers couldn't access FKUI components that aren't wrapped

## Bundle Size Analysis

Looking at the current setup, the bundle size impact depends on:

1. **Build Tool Configuration**: Modern bundlers (Vite, Webpack) can tree-shake unused exports
2. **Import Patterns**: If developers use specific imports (`import { FButton } from '@helix/vue'`), unused components won't be included
3. **CSS Overhead**: The main issue is that [`@helix/design`](packages/design/src/index.scss:2) imports the entire FKUI CSS bundle

## Recommendation

For maximum bundle efficiency while maintaining flexibility, consider this hybrid approach:

```javascript
// packages/vue/src/index.js
// Export only commonly needed FKUI components explicitly
export { FTextField, FSelect, FCheckbox } from '@fkui/vue';

// Or create a migration path
export * from '@fkui/vue'; // Current approach
// Add deprecation warnings for direct FKUI usage
```

We could also optimize the CSS by importing only needed FKUI styles rather than the entire bundle in [`packages/design/src/index.scss`](packages/design/src/index.scss:2).
