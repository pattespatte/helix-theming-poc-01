# Extracting Variable Definitions from Figma

This guide explains how to extract variable definitions from the Helix Figma file to complete the variable structure analysis.

## Prerequisites

1. **Figma Desktop App**: The MCP tools require the Figma desktop app to be running
2. **File Access**: You need access to the [Helix - Version 0.2.0](https://www.figma.com/design/RaTelScdNhGXaioJ8dCKXJ/Helix---Version-0.2.0) file
3. **Node Selection**: You need to select a node in Figma that uses variables

## Step-by-Step Process

### Step 1: Open the Figma File

1. Open the Figma desktop app
2. Navigate to: [Helix - Version 0.2.0](https://www.figma.com/design/RaTelScdNhGXaioJ8dCKXJ/Helix---Version-0.2.0)
3. Ensure you're viewing a page that contains components or elements using variables

### Step 2: Select a Node with Variables

To extract variable definitions, you need to select a node (layer/component) that uses variables. Good candidates include:

- **Components** that use color, spacing, or typography variables
- **Frames** that have variables applied to their properties
- **Text layers** using typography variables
- **Shapes** using color variables

**How to find nodes with variables:**

1. Look for components in the design system pages
2. Check the right panel - if you see variables (not hardcoded values), that node uses variables
3. Common locations:
   - Button components
   - Text styles
   - Color swatches
   - Spacing examples

### Step 3: Extract Node ID

Once you've selected a node:

1. The node ID can be found in the Figma URL when a node is selected
2. Format: `https://figma.com/design/RaTelScdNhGXaioJ8dCKXJ/...?node-id=123:456`
3. Extract the node ID: `123:456` (or `123-456` - both formats work)

### Step 4: Use the MCP Tool

Once you have a node selected and know its ID, you can use the `get_variable_defs` tool:

```bash
# The tool will be called automatically when you provide:
# - fileKey: RaTelScdNhGXaioJ8dCKXJ
# - nodeId: [the node ID you extracted]
```

### Step 5: Process Multiple Nodes

To get a complete picture, you may need to:

1. **Select nodes from different collections:**
   - A node using Foundation variables
   - A node using Semantic variables
   - A node that shows the connection between them

2. **Document the results:**
   - Save the variable definitions output
   - Map the relationships between variables
   - Note which variables reference which foundations

## What to Look For

When extracting variable definitions, pay attention to:

### 1. Variable Collections

- Collection names (e.g., "Foundation/Colors", "Semantic/Colors")
- How collections are organized

### 2. Variable References

- Which semantic variables reference foundation variables
- The reference chain (semantic → semantic → foundation)

### 3. Variable Modes

- Light mode values
- Dark mode values
- How modes are configured per collection

### 4. Variable Types

- COLOR variables
- FLOAT variables (spacing, radius, etc.)
- STRING variables (font families)
- BOOLEAN variables

## Example Workflow

1. **Select a Button Component**
   - Should use semantic color variables
   - Extract: `get_variable_defs` with button node ID
   - Document: Which semantic colors it uses

2. **Select a Color Swatch**
   - Should use foundation color variables
   - Extract: `get_variable_defs` with color node ID
   - Document: Foundation color structure

3. **Select a Text Element**
   - Should use typography variables
   - Extract: `get_variable_defs` with text node ID
   - Document: Typography variable structure

## Troubleshooting

### "You currently have nothing selected"

- **Solution**: Make sure you have a layer selected in Figma desktop app
- The selection must be active in the Figma app, not just in the browser

### "Invalid node ID"

- **Solution**: Double-check the node ID format
- Use format: `123:456` or `123-456`
- Extract from the URL when the node is selected

### No variables returned

- **Solution**: The selected node might not use variables
- Try selecting a different node (component, styled text, etc.)
- Check the right panel in Figma to confirm variables are applied

## Next Steps After Extraction

Once you have the variable definitions:

1. **Update `figma-variable-structure.md`** with:
   - Actual collection names
   - Real variable names and values
   - Documented reference chains
   - Mode configurations

2. **Create a mapping document** showing:
   - Foundation → Semantic connections
   - Variable hierarchies
   - Mode bindings

3. **Generate code structure** for:
   - Design token files
   - Theme configuration
   - Variable exports

## Quick Reference

- **File Key**: `RaTelScdNhGXaioJ8dCKXJ`
- **File URL**: <https://www.figma.com/design/RaTelScdNhGXaioJ8dCKXJ/Helix---Version-0.2.0>
- **Tool**: `get_variable_defs`
- **Required**: Node selected in Figma desktop app
