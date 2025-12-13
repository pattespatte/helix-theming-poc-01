# How to Find the Node ID in Figma

## Method 1: From Figma URL (Easiest)

1. **In Figma Desktop App**, look at the top of the window
2. **Check the URL bar** - it should show something like:

   ```
   figma://file/RaTelScdNhGXaioJ8dCKXJ?node-id=123:456
   ```

3. **Copy the node-id value** (the part after `node-id=`)
   - Example: `123:456` or `123-456`

## Method 2: Copy Link

1. **Right-click** on the "Input with label" layer
2. **Select "Copy link"** or "Copy link to selection"
3. **Paste the link** - it will look like:

   ```
   https://www.figma.com/design/RaTelScdNhGXaioJ8dCKXJ/Helix---Version-0.2.0?node-id=123:456
   ```

4. **Extract the node-id** from the URL

## Method 3: From Browser (if opened in browser)

1. If you have the file open in a browser tab
2. The URL will contain `?node-id=123:456`
3. Copy that part

## What the Node ID Looks Like

- Format: Numbers separated by colon or dash
- Examples: `123:456`, `789:012`, `1-2`, `123-456`
- Both formats work: `123:456` = `123-456`

## Quick Check

Once you have the node ID, it should:

- ✅ Be numbers separated by `:` or `-`
- ✅ Look something like `123:456`
- ✅ Be visible in the Figma URL when the layer is selected
