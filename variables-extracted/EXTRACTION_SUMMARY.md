# Variable Extraction Summary - Input with Label

**Extracted from**: "Input with label" component  
**Node ID**: `4122:3074`  
**Date**: Extracted successfully  
**Total Variables**: 24

## Overview

Successfully extracted **24 semantic variables** from the "Input with label" component. All variables follow a semantic naming convention using slash-separated paths (e.g., `color/text/primary`).

## Variable Breakdown

### Colors (12 variables)

**Text Colors:**

- `color/text/primary` → `#081130` (dark text)
- `color/text/secondary` → `#414651` (medium gray text)
- `color/text/disabled` → `#717680` (disabled text)

**Background Colors:**

- `color/background/primary` → `#ffffff` (white background)
- `color/background/disabled` → `#fafafa` (light gray disabled background)

**Border Colors:**

- `color/border/primary` → `#717680` (default border)
- `color/border/disabled` → `#e9eaeb` (disabled border)
- `color/action/border/primary/default` → `#232948` (active border)

**Feedback Colors:**

- `color/feedback/text/negative` → `#b42318` (error text)
- `color/feedback/border/negative` → `#d92d20` (error border)

**Icon Colors:**

- `icon/color/action/content/weak/default` → `#414651`
- `icon/color/feedback/content/negative` → `#b42318`
- `icon/color/content/disabled` → `#d5d7da`

### Typography (7 variables)

**Font Sizes:**

- `font size/text/md` → `16` (medium text size)

**Line Heights:**

- `line height/text/md` → `24` (medium line height)

**Font Families:**

- `typography/font family/label` → `Noto Sans`
- `typography/font family/description` → `Noto Sans`
- `typography/font family/body` → `Noto Sans`

**Font Weights:**

- `typography/font weight/regular` → `400`
- `typography/font weight/semibold` → `600`

### Composite Variables (4 variables)

These are composed styles that reference other variables:

**Font Styles:**

- `💻 Standard/label` - References: `typography/font family/label`, `font size/text/md`, `typography/font weight/semibold`, `line height/text/md`
- `💻 Standard/description` - References: `typography/font family/description`, `font size/text/md`, `typography/font weight/regular`, `line height/text/md`
- `💻 Standard/Body` - References: `typography/font family/body`, `font size/text/md`, `typography/font weight/regular`, `line height/text/md`

**Effects:**

- `Focus` - Drop shadow effect for focus states

## Key Observations

### Naming Convention

All variables use a **semantic naming pattern** with slash-separated paths:

- Format: `category/subcategory/specific-name`
- Examples:
  - `color/text/primary`
  - `typography/font family/label`
  - `icon/color/action/content/weak/default`

### Variable Structure

1. **No Foundation Variables Found**: This extraction only found semantic variables. Foundation variables (if they exist) would need to be extracted from different nodes (e.g., color palette swatches).

2. **Composite Variables Show References**: The `💻 Standard/*` variables demonstrate how semantic variables can reference other semantic variables, creating a reference chain.

3. **All Values Are Direct**: The extracted variables show direct color values (hex codes) and numeric values, not references to foundation variables. This suggests:
   - Either foundation variables aren't used in this component
   - Or the extraction shows resolved values rather than references
   - Or foundation variables are defined elsewhere

### Next Steps

To get a complete picture:

1. **Extract Foundation Variables**: Select nodes that contain base color palettes, typography scales, etc.
2. **Map References**: If foundation variables exist, map how semantic variables reference them.
3. **Check Mode Support**: Extract variables from components in different modes (Light/Dark) to see mode configurations.

## Files Generated

- `variables-input-label.json` - Raw extraction
- `variables-input-label-categorized.json` - Organized by category
- `variables-input-label-references.json` - Reference mappings (empty - no explicit references found)
- `variables-input-label-documentation.md` - Formatted documentation
