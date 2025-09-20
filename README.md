# Helix - Enhanced Design System

Helix is a theme layer built on top of FKUI – [Försäkringskassans Designsystem](https://designsystem.forsakringskassan.se/latest/).

## Quick Start

To run the example application:

```bash
# 1. Install dependencies
npm install

# 2. Build the packages (required before running example)
npm run build:design
npm run build:vue

# 3. Run the example
cd example && npm run dev
```

The example will be available at <http://localhost:3000>

## Development Setup

This is a monorepo with the following structure:

- `packages/design/` - SCSS theme files that extend FKUI
- `packages/vue/` - Vue components with Helix theming
- `example/` - Demo application showing Helix in action

### Building Packages

```bash
# Build all packages
npm run build

# Or build individually
npm run build:design  # Compiles SCSS to CSS
npm run build:vue     # Builds Vue components
```

### Watch Mode

For development, you can watch for changes:

```bash
npm run watch
```

## Installation (for external projects)

```bash
npm install @helix/vue @helix/design
```

## Usage

```javascript
import { createApp } from 'vue';
import '@helix/design'; // Import theme styles
import { HxButton } from '@helix/vue';

const app = createApp(App);
```

### Available Components

- `HxButton` - Enhanced button component with Helix theming
- All FKUI components are re-exported and available

### Example Usage

```vue
<template>
  <div>
    <!-- Helix themed components -->
    <HxButton variant="primary">Helix Button</HxButton>
    
    <!-- Standard FKUI components (also themed) -->
    <FTextField v-model="value" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { HxButton, FTextField } from '@helix/vue';
import '@helix/design';

const value = ref('');
</script>
```

## Customization

Override CSS variables in your app:

```css
:root {
  --hx-primary: #your-color;
}
```

## Troubleshooting

If you encounter dependency resolution errors:

1. Make sure you've built the packages first: `npm run build:design && npm run build:vue`
2. Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
3. For the example, ensure you're in the example directory: `cd example && npm run dev`

## Requirements

- Node.js 16+
- npm 7+
