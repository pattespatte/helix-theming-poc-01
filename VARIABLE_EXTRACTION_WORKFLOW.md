# Variable Extraction Workflow

This document provides a complete workflow for extracting and documenting Figma variables from the Helix design system.

## Overview

The workflow consists of three main steps:

1. **Extract** variable definitions from Figma
2. **Process** the extracted data
3. **Document** the results in the analysis document

## Quick Start

### Step 1: Extract Variables from Figma

1. Open [Helix - Version 0.2.0](https://www.figma.com/design/RaTelScdNhGXaioJ8dCKXJ/Helix---Version-0.2.0) in Figma Desktop App
2. Select a node (component/layer) that uses variables
3. Extract the node ID from the URL (format: `123:456`)
4. Use the `get_variable_defs` MCP tool with:
   - `fileKey`: `RaTelScdNhGXaioJ8dCKXJ`
   - `nodeId`: Your extracted node ID
5. Save the output to a JSON file (e.g., `variables-foundation.json`)

**Repeat for different node types:**

- Foundation variables: Select a color swatch or base component
- Semantic variables: Select a styled component (button, text, etc.)
- Connection examples: Select components that show Foundation → Semantic relationships

### Step 2: Process the Extracted Data

Run the processing script on your extracted JSON files:

```bash
node scripts/process-variables.js variables-foundation.json
node scripts/process-variables.js variables-semantic.json
```

The script will generate:

- `*-categorized.json` - Variables organized by category
- `*-references.json` - Variable reference mappings
- `*-documentation.md` - Formatted markdown documentation

### Step 3: Update Documentation

1. Review the generated documentation files
2. Update `figma-variable-structure.md` with:
   - Actual collection names and structures
   - Real variable values and types
   - Documented reference chains
   - Mode configurations

## Detailed Instructions

### Finding Nodes with Variables

**Good candidates for extraction:**

1. **Foundation Variables:**
   - Color palette swatches
   - Typography examples
   - Spacing guides
   - Border radius examples

2. **Semantic Variables:**
   - Button components (use semantic colors)
   - Text styles (use semantic typography)
   - Layout components (use semantic spacing)

3. **Connection Examples:**
   - Components that clearly show Foundation → Semantic relationships
   - Design system documentation pages

### Extracting Node IDs

When you select a node in Figma, the URL will update:

```
https://figma.com/design/RaTelScdNhGXaioJ8dCKXJ/...?node-id=123:456
                                                                    ^^^^^^
                                                                    Extract this
```

The node ID format can be:

- `123:456` (colon separator)
- `123-456` (dash separator)

Both formats work with the MCP tool.

### Processing Multiple Extractions

For a complete analysis, extract variables from:

1. **At least one Foundation node** - to understand base tokens
2. **At least one Semantic node** - to understand contextual tokens
3. **Multiple nodes of each type** - to get comprehensive coverage

The processing script can handle multiple files - run it on each extraction.

## File Structure

After extraction and processing, you'll have:

```
helix-theming-poc-01/
├── variables-foundation.json          # Raw extraction
├── variables-foundation-categorized.json
├── variables-foundation-references.json
├── variables-foundation-documentation.md
├── variables-semantic.json            # Raw extraction
├── variables-semantic-categorized.json
├── variables-semantic-references.json
├── variables-semantic-documentation.md
├── figma-variable-structure.md        # Main analysis document
└── EXTRACT_VARIABLES.md              # Detailed extraction guide
```

## Troubleshooting

### No Variables Returned

- **Check**: Does the selected node actually use variables?
- **Solution**: Look at the right panel in Figma - if you see hardcoded values, try a different node
- **Tip**: Components in design system pages are more likely to use variables

### "Nothing Selected" Error

- **Check**: Is the Figma Desktop App running?
- **Solution**: Make sure you have a layer selected in the desktop app (not just the browser)
- **Tip**: The selection must be active in the Figma app window

### Processing Script Errors

- **Check**: Is the JSON file valid?
- **Solution**: Verify the JSON structure matches what `get_variable_defs` returns
- **Tip**: The script expects an object with variable definitions

## Next Steps After Extraction

Once you have extracted and processed the variables:

1. **Review the categorized JSON** to understand the structure
2. **Check the references** to map Foundation → Semantic connections
3. **Update `figma-variable-structure.md`** with actual data:
   - Replace template sections with real variable names
   - Document actual reference chains
   - Add mode configurations
4. **Create implementation files** based on the extracted structure:
   - Design token files
   - Theme configuration
   - Variable exports

## Resources

- **Extraction Guide**: See `EXTRACT_VARIABLES.md` for detailed step-by-step instructions
- **Analysis Document**: See `figma-variable-structure.md` for the structure template
- **Figma File**: [Helix - Version 0.2.0](https://www.figma.com/design/RaTelScdNhGXaioJ8dCKXJ/Helix---Version-0.2.0)

## Example Commands

```bash
# Extract variables (using MCP tool in Cursor)
# Then save output to file

# Process Foundation variables
node scripts/process-variables.js variables-foundation.json

# Process Semantic variables  
node scripts/process-variables.js variables-semantic.json

# Review generated documentation
cat variables-foundation-documentation.md
cat variables-semantic-documentation.md
```
