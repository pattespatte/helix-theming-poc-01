# Figma Variable Structure Analysis

## Helix Design System - Version 0.2.0

**File:** [Helix - Version 0.2.0](https://www.figma.com/design/RaTelScdNhGXaioJ8dCKXJ/Helix---Version-0.2.0)

---

## Overview

This document analyzes the variable structure in the Helix design system Figma file, with particular attention to the connection points between variable collections, especially the relationship between **Foundation** and **Semantic** collections.

---

## Variable Collection Architecture

### Collection Hierarchy

Figma variables are typically organized in a hierarchical structure that follows design token best practices:

```
┌─────────────────────────────────────┐
│     Foundation Collections          │
│  (Base design tokens - raw values)  │
└──────────────┬──────────────────────┘
               │
               │ References
               │
┌──────────────▼──────────────────────┐
│     Semantic Collections             │
│  (Contextual tokens - meaning)       │
└──────────────┬──────────────────────┘
               │
               │ References
               │
┌──────────────▼──────────────────────┐
│     Component-Specific Variables     │
│  (Applied in component instances)    │
└─────────────────────────────────────┘
```

---

## Foundation Collections

Foundation collections contain the **primitive design values** that serve as the building blocks of the design system. These are typically organized by token type:

### 1. **Color Foundation**

- Base color palettes (primary, secondary, accent)
- Neutral scales (grays, whites, blacks)
- Raw color values (hex, RGB, HSL)
- No semantic meaning attached

**Example Structure:**

```
Foundation/Colors/
├── Primary/
│   ├── Primary-50
│   ├── Primary-100
│   ├── ...
│   └── Primary-900
├── Neutral/
│   ├── Neutral-50
│   ├── Neutral-100
│   ├── ...
│   └── Neutral-900
└── Accent/
    ├── Accent-50
    └── ...
```

### 2. **Typography Foundation**

- Font families
- Font sizes (raw pixel/rem values)
- Font weights (numeric values)
- Line heights (raw values)
- Letter spacing

### 3. **Spacing Foundation**

- Base spacing scale (typically 4px or 8px grid)
- Raw spacing values (0, 4, 8, 12, 16, 24, 32, etc.)

### 4. **Border Radius Foundation**

- Base radius values
- Raw pixel/rem values

### 5. **Shadow Foundation**

- Base shadow definitions
- Raw shadow values

### 6. **Opacity Foundation**

- Base opacity values (0%, 10%, 20%, etc.)

---

## Semantic Collections

Semantic collections provide **contextual meaning** to foundation tokens. They reference foundation variables but add semantic intent:

### 1. **Color Semantic**

Semantic colors reference foundation colors but provide meaning:

**Connection Pattern:**

```
Foundation/Colors/Primary-600 
    ↓ (referenced by)
Semantic/Colors/Interactive/Default
    ↓ (referenced by)
Semantic/Colors/Button/Primary/Background
```

**Example Structure:**

```
Semantic/Colors/
├── Interactive/
│   ├── Default (→ Foundation/Primary-600)
│   ├── Hover (→ Foundation/Primary-700)
│   ├── Active (→ Foundation/Primary-800)
│   └── Disabled (→ Foundation/Neutral-300)
├── Text/
│   ├── Primary (→ Foundation/Neutral-900)
│   ├── Secondary (→ Foundation/Neutral-600)
│   ├── Tertiary (→ Foundation/Neutral-400)
│   └── Inverse (→ Foundation/Neutral-50)
├── Background/
│   ├── Primary (→ Foundation/Neutral-50)
│   ├── Secondary (→ Foundation/Neutral-100)
│   └── Tertiary (→ Foundation/Neutral-200)
├── Border/
│   ├── Default (→ Foundation/Neutral-300)
│   ├── Focus (→ Foundation/Primary-500)
│   └── Error (→ Foundation/Error-500)
└── Status/
    ├── Success (→ Foundation/Green-600)
    ├── Warning (→ Foundation/Orange-600)
    ├── Error (→ Foundation/Red-600)
    └── Info (→ Foundation/Blue-600)
```

### 2. **Typography Semantic**

Semantic typography references foundation typography but provides usage context:

**Connection Pattern:**

```
Foundation/Typography/FontSize/16px
    ↓ (referenced by)
Semantic/Typography/Body/Medium
    ↓ (referenced by)
Semantic/Typography/Button/Default
```

**Example Structure:**

```
Semantic/Typography/
├── Heading/
│   ├── H1 (→ Foundation/FontSize/32px + Foundation/FontWeight/700)
│   ├── H2 (→ Foundation/FontSize/24px + Foundation/FontWeight/600)
│   └── H3 (→ Foundation/FontSize/20px + Foundation/FontWeight/600)
├── Body/
│   ├── Large (→ Foundation/FontSize/16px)
│   ├── Medium (→ Foundation/FontSize/14px)
│   └── Small (→ Foundation/FontSize/12px)
└── Label/
    ├── Default (→ Foundation/FontSize/14px + Foundation/FontWeight/500)
    └── Small (→ Foundation/FontSize/12px + Foundation/FontWeight/500)
```

### 3. **Spacing Semantic**

Semantic spacing provides contextual spacing names:

**Connection Pattern:**

```
Foundation/Spacing/16px
    ↓ (referenced by)
Semantic/Spacing/Component/Padding/Medium
```

**Example Structure:**

```
Semantic/Spacing/
├── Component/
│   ├── Padding/Small (→ Foundation/Spacing/8px)
│   ├── Padding/Medium (→ Foundation/Spacing/16px)
│   └── Padding/Large (→ Foundation/Spacing/24px)
├── Layout/
│   ├── Gap/Small (→ Foundation/Spacing/8px)
│   ├── Gap/Medium (→ Foundation/Spacing/16px)
│   └── Gap/Large (→ Foundation/Spacing/32px)
└── Section/
    ├── Margin/Small (→ Foundation/Spacing/16px)
    └── Margin/Large (→ Foundation/Spacing/32px)
```

---

## Connection Points: Foundation → Semantic

### Key Connection Mechanisms

1. **Variable Aliasing**
   - Semantic variables **reference** (alias) foundation variables
   - Changes to foundation automatically propagate to semantic
   - Maintains single source of truth

2. **Mode Support**
   - Foundation variables can have multiple modes (Light, Dark)
   - Semantic variables inherit mode support from referenced foundations
   - Enables theme switching

3. **Binding Types**
   - **Direct Reference**: Semantic directly points to Foundation
   - **Alias Chain**: Semantic → Semantic → Foundation (for complex hierarchies)

### Example Connection Flow

```
┌─────────────────────────────────────────┐
│ Foundation/Colors/Primary-600 = #2563eb │
└──────────────┬──────────────────────────┘
               │
               │ Alias Reference
               │
┌──────────────▼──────────────────────────┐
│ Semantic/Colors/Interactive/Default     │
│   → Foundation/Colors/Primary-600       │
└──────────────┬──────────────────────────┘
               │
               │ Alias Reference
               │
┌──────────────▼──────────────────────────┐
│ Semantic/Colors/Button/Primary/Default  │
│   → Semantic/Colors/Interactive/Default │
└─────────────────────────────────────────┘
```

---

## Variable Modes

Variables in Figma can support multiple **modes**, typically:

### Light Mode (Default)

- Foundation colors: Light backgrounds, dark text
- Semantic tokens inherit light mode values

### Dark Mode

- Foundation colors: Dark backgrounds, light text
- Semantic tokens automatically switch via mode binding

**Mode Binding Example:**

```
Foundation/Colors/Background/Primary
├── Light Mode: #FFFFFF
└── Dark Mode: #1E293B

Semantic/Colors/Background/Page
├── Light Mode: → Foundation/Colors/Background/Primary (Light)
└── Dark Mode: → Foundation/Colors/Background/Primary (Dark)
```

---

## Variable Types

### 1. **Color Variables**

- Type: `COLOR`
- Foundation: Raw color values
- Semantic: Contextual color meanings

### 2. **Number Variables**

- Type: `FLOAT`
- Foundation: Raw numeric values (spacing, radius, etc.)
- Semantic: Named numeric values with context

### 3. **String Variables**

- Type: `STRING`
- Foundation: Raw string values (font families)
- Semantic: Named string values with context

### 4. **Boolean Variables**

- Type: `BOOLEAN`
- Used for feature flags or conditional logic

---

## Best Practices Observed

### 1. **Separation of Concerns**

- Foundation = **What** (raw values)
- Semantic = **Why** (purpose/meaning)

### 2. **Single Source of Truth**

- Foundation variables are the source
- Semantic variables reference, never duplicate

### 3. **Naming Conventions**

- Foundation: Descriptive (e.g., `Primary-600`)
- Semantic: Purpose-driven (e.g., `Interactive/Default`)

### 4. **Hierarchical Organization**

- Collections organized by category
- Sub-collections for specific use cases
- Clear parent-child relationships

### 5. **Mode Consistency**

- All variables in a collection share mode support
- Mode changes propagate through references

---

## Implementation Notes

### For Developers

When implementing design tokens from Figma variables:

1. **Export Foundation First**
   - Extract all foundation variables as base tokens
   - These become your design system primitives

2. **Map Semantic to Foundation**
   - Document which semantic variables reference which foundations
   - Maintain this mapping for theme updates

3. **Preserve Mode Support**
   - Implement both light and dark mode values
   - Use mode switching mechanism in your code

4. **Maintain Reference Chain**
   - Keep the foundation → semantic relationship
   - Don't flatten the hierarchy unnecessarily

### Token Structure in Code

```javascript
// Foundation tokens (raw values)
const foundation = {
  colors: {
    primary: {
      50: '#eff6ff',
      600: '#2563eb',  // ← Source of truth
      700: '#1d4ed8',
    }
  }
}

// Semantic tokens (contextual)
const semantic = {
  colors: {
    interactive: {
      default: foundation.colors.primary[600],  // ← References foundation
      hover: foundation.colors.primary[700],
    }
  }
}
```

---

## Analysis Summary

### Foundation Collections

- **Purpose**: Raw design values without semantic meaning
- **Characteristics**:
  - Numeric/color values
  - Organized by type (color, spacing, typography)
  - Mode-aware (Light/Dark)
  - Single source of truth

### Semantic Collections

- **Purpose**: Contextual tokens with meaning and intent
- **Characteristics**:
  - Reference foundation variables
  - Organized by usage context
  - Inherit mode support from foundations
  - Enable design system consistency

### Connection Mechanism

- **Aliasing**: Semantic variables alias foundation variables
- **Propagation**: Changes to foundation automatically update semantic
- **Mode Binding**: Semantic inherits mode support from referenced foundations
- **Hierarchy**: Can chain semantic → semantic → foundation

---

## Next Steps

To complete this analysis with specific details from the Helix file:

1. **Select a node** in Figma that uses variables
2. **Use `get_variable_defs`** to extract actual variable structure
3. **Document specific collections** and their relationships
4. **Map exact connections** between foundation and semantic variables
5. **Extract mode configurations** for each collection

---

## References

- [Figma Variables Documentation](https://help.figma.com/hc/en-us/articles/15339657135383)
- Design Token Best Practices
- W3C Design Tokens Community Group

---

*Document generated based on Figma variable structure best practices. To get specific details from the Helix file, please select a node in Figma that uses variables and re-run the analysis.*
