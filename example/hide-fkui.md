# Solely exposing Helix components

## Project Structure

This is a theming proof-of-concept where:

- **FKUI** is the base design system (Försäkringskassan's Designsystem)
- **Helix** is a theme layer built on top of FKUI
- The [`packages/vue/src/index.js:3`](packages/vue/src/index.js) re-exports all FKUI components
- The [`HxButton`](packages/vue/src/components/Button.vue:2) is a Helix-wrapped component that internally uses [`FButton`](packages/vue/src/components/Button.vue:2) from FKUI

## How to Comment Out FKUI Components

To see only the Helix component without exposing FKUI directly in the example, you have a few options:

### Option 1: Comment out in the example App.vue

In [`example/App.vue`](example/App.vue:7), comment out the direct FKUI component usage:

```vue
<template>
  <div id="app">
    <!-- Helix components automatically use FKUI with custom theme -->
    <HxButton variant="primary"> Helix Themed Button </HxButton>

    <!-- Can still use FKUI components directly -->
    <!-- <FTextField v-model="value" /> -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import { HxButton } from "@helix/vue";
// import { FTextField } from "@fkui/vue"; // Comment this line
import "@helix/design"; // Import theme styles

const value = ref("");
</script>
```

### Option 2: Modify the Helix Vue package export

In [`packages/vue/src/index.js:3`](packages/vue/src/index.js), you could comment out the FKUI re-export:

```javascript
// Re-export everything upstream
// Reuse all FKUI components
// export * from '@fkui/vue'; // Comment this line

// Always include Helix design layer
import '@helix/design';

// Override specific components if needed
export { default as HxButton } from './components/Button.vue';
```

However, this approach would break the [`HxButton`](packages/vue/src/components/Button.vue:8) component since it internally imports [`FButton`](packages/vue/src/components/Button.vue:8) from FKUI.

### Option 3: Create a standalone Helix component

If you want a truly independent Helix component that doesn't rely on FKUI, you would need to rewrite the [`Button.vue`](packages/vue/src/components/Button.vue:1) component to not use [`FButton`](packages/vue/src/components/Button.vue:2) internally.

## Recommendation

The simplest approach for your proof-of-concept is **Option 1** - just comment out the direct FKUI usage in the example. This way:

- The [`HxButton`](example/App.vue:4) will still work (showing the Helix theme)
- You won't see any direct FKUI components in the UI
- The underlying FKUI dependency remains intact for the Helix theming to work
