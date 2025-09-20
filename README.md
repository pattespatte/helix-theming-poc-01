# Helix - Enhanced Design System

Helix is a theme layer built on top of FKUI – [Försäkringskassans Designsystem](https://designsystem.forsakringskassan.se/latest/).

## Installation

```bash
npm install @helix/vue @helix/design
```

## Usage

```javascript
import { createApp } from 'vue';
import '@helix/design'; // Import theme
import { EhmdsButton } from '@helix/vue';

const app = createApp(App);
app.use(Helix);
```

## Customization

Override CSS variables in your app:

```css
:root {
  --hx-primary: #your-color;
}
```
