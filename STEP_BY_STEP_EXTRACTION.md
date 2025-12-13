# Step-by-Step Variable Extraction Guide

## Current Status

✅ **Layer Selected**: "Input with label" in Figma Desktop App

## Step 1: Extract the Node ID

### Option A: From Figma URL (Recommended)

1. **Check the Figma URL** in your browser or desktop app
2. Look for the `node-id` parameter in the URL
3. The URL should look like:

   ```
   https://www.figma.com/design/RaTelScdNhGXaioJ8dCKXJ/Helix---Version-0.2.0?node-id=123:456
   ```

4. **Extract the node ID**: Copy the part after `node-id=`
   - Format can be: `123:456` or `123-456`
   - Both formats work, but we'll use the colon format (`123:456`)

### Option B: From Figma Desktop App

1. Right-click on the selected "Input with label" layer
2. Select "Copy link" or check the URL bar
3. The node ID will be in the copied link

### What to Note

- Write down the node ID (e.g., `123:456`)
- Keep the Figma Desktop App open with the layer selected

---

## Step 2: Use the MCP Tool to Extract Variables

Now we'll use the `get_variable_defs` tool to extract variable definitions.

### Tool Parameters

You need to provide:

- **fileKey**: `RaTelScdNhGXaioJ8dCKXJ` (from the Figma URL)
- **nodeId**: The node ID you extracted in Step 1 (e.g., `123:456`)
- **clientLanguages**: `javascript,typescript` (for logging)
- **clientFrameworks**: `vue` (for logging)

### How to Call the Tool

**In Cursor, you can ask me to:**
> "Extract variable definitions for node ID [your-node-id] from the Helix Figma file"

Or I can call it directly once you provide the node ID.

### Expected Output

The tool will return a JSON object containing:

- Variable names and their definitions
- Variable types (COLOR, FLOAT, STRING, etc.)
- Variable values
- Mode configurations (if applicable)
- Reference chains (if variables reference other variables)

---

## Step 3: Save the Extracted Data

### Create a JSON File

1. **Create a directory** for variable extractions (if it doesn't exist):

   ```bash
   mkdir -p variables-extracted
   ```

2. **Save the output** to a JSON file:
   - Name it descriptively: `variables-input-label.json`
   - Save it in the `variables-extracted/` directory

### File Structure

```
helix-theming-poc-01/
├── variables-extracted/
│   └── variables-input-label.json  ← Save here
```

### Example File Content Structure

The JSON file should contain variable definitions like:

```json
{
  "Foundation/Colors/Primary-600": {
    "type": "COLOR",
    "value": "#2563eb",
    "modes": {
      "Light": "#2563eb",
      "Dark": "#3b82f6"
    }
  },
  "Semantic/Colors/Input/Border/Default": {
    "type": "COLOR",
    "value": {
      "reference": "Foundation/Colors/Neutral-300"
    }
  }
}
```

---

## Step 4: Process the Extracted Data

### Run the Processing Script

1. **Navigate to the project root** (if not already there):

   ```bash
   cd /Users/patrik/repo/helix-theming-poc-01
   ```

2. **Run the processing script**:

   ```bash
   node scripts/process-variables.js variables-extracted/variables-input-label.json
   ```

### What the Script Does

The script will:

- ✅ Categorize variables (Foundation, Semantic, Component)
- ✅ Extract reference chains
- ✅ Generate organized JSON files
- ✅ Create markdown documentation

### Generated Files

After running the script, you'll get:

```
variables-extracted/
├── variables-input-label.json                    # Original extraction
├── variables-input-label-categorized.json       # Organized by category
├── variables-input-label-references.json        # Reference mappings
└── variables-input-label-documentation.md       # Formatted documentation
```

### Review the Output

1. **Check the console output** for:
   - Number of variables found
   - Categories breakdown
   - Number of references found

2. **Open the documentation file**:

   ```bash
   cat variables-extracted/variables-input-label-documentation.md
   ```

3. **Review the categorized JSON** to understand the structure:

   ```bash
   cat variables-extracted/variables-input-label-categorized.json
   ```

---

## Step 5: Analyze the Results

### What to Look For

1. **Variable Collections**
   - Which collections are present? (Foundation, Semantic, etc.)
   - How are they organized?

2. **Variable Types**
   - Colors used in the input component
   - Spacing variables
   - Typography variables
   - Border radius variables

3. **Reference Chains**
   - Which semantic variables reference foundation variables?
   - Are there multi-level references? (Semantic → Semantic → Foundation)

4. **Mode Support**
   - Does the component support light/dark modes?
   - What are the mode-specific values?

### Document Your Findings

Create notes about:

- **Foundation variables** found (base tokens)
- **Semantic variables** found (contextual tokens)
- **Connections** between Foundation and Semantic
- **Mode configurations** if present

---

## Step 6: Update the Analysis Document

### Update `figma-variable-structure.md`

1. **Open the file**: `figma-variable-structure.md`

2. **Find the template sections** (around line 450+):
   - "Foundation Collections (Actual Data)"
   - "Semantic Collections (Actual Data)"
   - "Foundation → Semantic Connection Map (Actual Data)"
   - "Mode Configurations (Actual Data)"

3. **Replace template content** with actual data:

   **Example for Foundation Collections:**

   ```markdown
   ### Foundation Collections (Actual Data)

   #### Colors
   - **Foundation/Colors/Primary-600**
     - Type: COLOR
     - Value: #2563eb
     - Modes:
       - Light: #2563eb
       - Dark: #3b82f6
   
   - **Foundation/Colors/Neutral-300**
     - Type: COLOR
     - Value: #d1d5db
   ```

   **Example for Semantic Collections:**

   ```markdown
   ### Semantic Collections (Actual Data)

   #### Input Component Colors
   - **Semantic/Colors/Input/Border/Default**
     - Type: COLOR
     - References: Foundation/Colors/Neutral-300
     - Modes:
       - Light: → Foundation/Colors/Neutral-300 (Light)
       - Dark: → Foundation/Colors/Neutral-300 (Dark)
   ```

   **Example for Connection Map:**

   ```markdown
   ### Foundation → Semantic Connection Map (Actual Data)

   | Semantic Variable | Foundation Variable | Reference Type | Modes |
   |-------------------|---------------------|----------------|-------|
   | Semantic/Colors/Input/Border/Default | Foundation/Colors/Neutral-300 | Direct | Light, Dark |
   ```

4. **Update status indicators**:
   - Change `⏳ Pending extraction` to `✅ Extracted from "Input with label"`

---

## Step 7: Repeat for Additional Nodes (Optional)

To get a complete picture, extract variables from:

1. **Foundation nodes**:
   - Color palette swatches
   - Typography examples
   - Spacing guides

2. **Other semantic nodes**:
   - Button components
   - Text styles
   - Other form components

3. **Save each extraction** with descriptive names:
   - `variables-foundation-colors.json`
   - `variables-semantic-buttons.json`
   - etc.

---

## Step 8: Create Summary Documentation

### Generate a Summary

After extracting from multiple nodes, create a summary:

1. **List all collections found**
2. **Map all Foundation → Semantic connections**
3. **Document mode configurations**
4. **Create a visual hierarchy diagram**

---

## Troubleshooting

### If the Tool Returns "Nothing Selected"

- ✅ **Check**: Is the layer still selected in Figma Desktop App?
- ✅ **Solution**: Click on the "Input with label" layer again
- ✅ **Verify**: The layer should be highlighted in the layers panel

### If No Variables Are Returned

- ✅ **Check**: Does the "Input with label" component actually use variables?
- ✅ **Solution**:
  - Look at the right panel in Figma
  - Check if properties show variable names (not hardcoded values)
  - Try selecting a different component if needed

### If the Processing Script Fails

- ✅ **Check**: Is the JSON file valid?
- ✅ **Solution**:

  ```bash
   # Validate JSON
   node -e "JSON.parse(require('fs').readFileSync('variables-extracted/variables-input-label.json', 'utf8'))"
   ```

### If Node ID Format is Wrong

- ✅ **Check**: Node ID should be `123:456` or `123-456`
- ✅ **Solution**: Both formats work, but prefer colon format

---

## Quick Reference Commands

```bash
# 1. Create extraction directory
mkdir -p variables-extracted

# 2. Process extracted variables
node scripts/process-variables.js variables-extracted/variables-input-label.json

# 3. View documentation
cat variables-extracted/variables-input-label-documentation.md

# 4. View categorized data
cat variables-extracted/variables-input-label-categorized.json

# 5. View references
cat variables-extracted/variables-input-label-references.json
```

---

## Next Action

**Right now, you need to:**

1. ✅ **Extract the node ID** from the Figma URL (see Step 1)
2. ✅ **Share the node ID with me**, or I can try to extract it for you
3. ✅ **I'll call the `get_variable_defs` tool** with your node ID
4. ✅ **We'll save and process the results** together

**What's your node ID?** (It should be in the Figma URL after `node-id=`)

Or, if you'd like, I can guide you through finding it step by step!
