# Distribution and Usage of Helix Packages

## Current Dependency Structure

**Yes, users will need to install FKUI separately**. Here's how the packages are designed to work:

## 1. Package Dependencies

**@helix/vue** ([`packages/vue/package.json`](packages/vue/package.json:10-12)):

```json
"peerDependencies": {
  "@fkui/vue": "*",
  "vue": "^3.0.0"
}
```

**@helix/design** ([`packages/design/package.json`](packages/design/package.json:11-12)):

```json
"peerDependencies": {
  "@fkui/design": "*"
}
```

## 2. How Helix Works with FKUI

**Re-export Strategy** ([`packages/vue/src/index.js:3`](packages/vue/src/index.js)):

```javascript
// Re-export everything upstream
// Reuse all FKUI components
export * from '@fkui/vue';

// Always include Helix design layer
import '@helix/design';

// Override specific components if needed
export { default as HxButton } from './components/Button.vue';
```

**Build Configuration** ([`packages/vue/vite.config.js`](packages/vue/vite.config.js:14)):

```javascript
external: ['vue', '@fkui/vue'],
```

## 3. Distribution Model

**For End Users**, they would need to install:

```bash
# Required dependencies
npm install @fkui/vue @fkui/design vue

# Helix packages
npm install @helix/vue @helix/design
```

## 4. Usage Example

```javascript
import { FButton, FCard, HxButton } from '@helix/vue';
import '@helix/design'; // Applies Helix theming

// All FKUI components are available through @helix/vue
// Helix theme is automatically applied
```

## 5. Benefits of This Approach

**For Consumers**:

- Single import point: `@helix/vue` provides both FKUI and Helix components
- Automatic theming: Importing `@helix/vue` automatically applies the Helix theme
- Familiar API: All FKUI components work exactly as expected, just with Helix styling

**For Developers**:

- No need to fork FKUI: Helix extends rather than modifies FKUI
- Selective overrides: Only specific components need custom implementations
- Automatic updates: Benefits from FKUI updates without manual merging

## 6. Alternative Distribution Options

If you want to simplify the installation process, you could consider:

**Option A: Bundle FKUI Dependencies**

- Change `peerDependencies` to regular `dependencies`
- Increase package size but simplify installation
- Would require careful version management

**Option B: Create a Meta-Package**

- Create `@helix/all` that installs all required dependencies
- Users would only need to install one package
- Could include FKUI as a dependency

**Option C: Publish to Private Registry**

- Bundle everything together in a private registry
- Simplify distribution within your organization

## 7. Current Recommendation

The current approach with peerDependencies is actually the **best practice** for design systems because:

1. **Version flexibility**: Users can choose their FKUI version
2. **Smaller bundles**: No duplicate dependencies
3. **Clear dependency tree**: Explicit about what's required
4. **Standard pattern**: Follows common practices in the Vue ecosystem

The example project ([`example/package.json`](example/package.json:14)) shows this pattern:

```json
"dependencies": {
  "vue": "^3.0.0",
  "@helix/vue": "file:../packages/vue",
  "@helix/design": "file:../packages/design",
  "@fkui/vue": "latest"
}
```

So users will need to install both FKUI and Helix packages, but they get a unified experience through the `@helix/vue` package.
