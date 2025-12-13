#!/usr/bin/env node

/**
 * Helper script to process and organize Figma variable definitions
 * 
 * Usage:
 *   1. Extract variable definitions from Figma using get_variable_defs
 *   2. Save the output to a JSON file
 *   3. Run: node scripts/process-variables.js <input-file.json>
 *   4. The script will generate organized output and markdown documentation
 */

const fs = require('fs');
const path = require('path');

// Color helper functions
function formatColor(color) {
  if (typeof color === 'string') return color;
  if (color.r !== undefined) {
    // RGB format
    const r = Math.round(color.r * 255);
    const g = Math.round(color.g * 255);
    const b = Math.round(color.b * 255);
    const a = color.a !== undefined ? Math.round(color.a * 100) / 100 : 1;
    if (a < 1) {
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    return `rgb(${r}, ${g}, ${b})`;
  }
  return JSON.stringify(color);
}

function formatValue(value, type) {
  if (type === 'COLOR') {
    return formatColor(value);
  }
  if (typeof value === 'object' && value !== null) {
    return JSON.stringify(value);
  }
  return String(value);
}

function inferType(value) {
  if (typeof value === 'string') {
    if (value.startsWith('#')) return 'COLOR';
    if (value.match(/^rgba?\(/)) return 'COLOR';
    if (!isNaN(value) && !isNaN(parseFloat(value))) return 'FLOAT';
    if (value.includes('Font(') || value.includes('Effect(')) return 'COMPOSITE';
    return 'STRING';
  }
  if (typeof value === 'number') return 'FLOAT';
  if (typeof value === 'boolean') return 'BOOLEAN';
  return 'UNKNOWN';
}

function categorizeVariables(variables) {
  const categories = {
    foundation: {
      colors: [],
      typography: [],
      spacing: [],
      radius: [],
      shadow: [],
      opacity: [],
      other: []
    },
    semantic: {
      colors: [],
      typography: [],
      spacing: [],
      radius: [],
      shadow: [],
      opacity: [],
      other: []
    },
    component: {
      colors: [],
      typography: [],
      spacing: [],
      radius: [],
      shadow: [],
      opacity: [],
      other: []
    },
    unknown: []
  };

  Object.entries(variables).forEach(([name, def]) => {
    const lowerName = name.toLowerCase();
    const isFoundation = lowerName.includes('foundation') || lowerName.startsWith('foundation/');
    const isSemantic = lowerName.includes('semantic') || lowerName.startsWith('semantic/');
    const isComponent = lowerName.includes('component') || lowerName.startsWith('component/');

    let category = 'unknown';
    let subcategory = 'other';

    // Categorize based on naming patterns
    if (isFoundation) {
      category = 'foundation';
    } else if (isSemantic) {
      category = 'semantic';
    } else if (isComponent) {
      category = 'component';
    } else {
      // If no explicit category, infer from structure
      // Variables with slashes like "color/text/primary" are typically semantic
      // Simple names like "Primary-600" might be foundation
      if (name.includes('/')) {
        // Slash-separated names are usually semantic (e.g., "color/text/primary")
        category = 'semantic';
      } else if (name.match(/^[A-Z][a-z]+-\d+$/)) {
        // Pattern like "Primary-600" suggests foundation
        category = 'foundation';
      } else {
        // Default to semantic for contextual names
        category = 'semantic';
      }
    }

    // Handle both formats: simple (value) and complex (object with type, value, etc.)
    const isSimpleFormat = typeof def === 'string' || typeof def === 'number';
    const variableType = isSimpleFormat ? null : (def.type || null);
    const variableValue = isSimpleFormat ? def : (def.value !== undefined ? def.value : def);

    // Determine subcategory
    if (lowerName.includes('color') || lowerName.includes('icon/color') || variableType === 'COLOR' || (isSimpleFormat && typeof def === 'string' && def.startsWith('#'))) {
      subcategory = 'colors';
    } else if (lowerName.includes('typography') || lowerName.includes('font') || lowerName.includes('line height') || lowerName.includes('font size') || lowerName.includes('font weight') || lowerName.includes('💻 Standard')) {
      subcategory = 'typography';
    } else if (lowerName.includes('spacing') || lowerName.includes('padding') || lowerName.includes('margin') || lowerName.includes('gap')) {
      subcategory = 'spacing';
    } else if (lowerName.includes('radius') || lowerName.includes('border')) {
      subcategory = 'radius';
    } else if (lowerName.includes('shadow') || lowerName.includes('effect') || lowerName.includes('Focus')) {
      subcategory = 'shadow';
    } else if (lowerName.includes('opacity')) {
      subcategory = 'opacity';
    }

    // Create variable object in consistent format
    const variableObj = isSimpleFormat
      ? { name, value: variableValue, type: inferType(variableValue) }
      : { name, ...def };

    // Ensure subcategory exists
    if (!categories[category][subcategory]) {
      categories[category][subcategory] = [];
    }

    categories[category][subcategory].push(variableObj);
  });

  return categories;
}

function extractReferences(variables) {
  const references = [];

  Object.entries(variables).forEach(([name, def]) => {
    if (def.references) {
      def.references.forEach(ref => {
        references.push({
          from: name,
          to: ref,
          type: 'alias'
        });
      });
    }
    if (def.value && typeof def.value === 'object' && def.value.reference) {
      references.push({
        from: name,
        to: def.value.reference,
        type: 'direct'
      });
    }
  });

  return references;
}

function generateMarkdown(categories, references, outputPath) {
  let markdown = `# Extracted Variable Definitions\n\n`;
  markdown += `*Generated from Figma variable definitions*\n\n`;
  markdown += `---\n\n`;

  // Foundation Variables
  markdown += `## Foundation Variables\n\n`;
  Object.entries(categories.foundation).forEach(([subcat, vars]) => {
    if (vars.length > 0) {
      markdown += `### ${subcat.charAt(0).toUpperCase() + subcat.slice(1)}\n\n`;
      vars.forEach(v => {
        markdown += `- **${v.name}**\n`;
        markdown += `  - Type: ${v.type}\n`;
        if (v.value !== undefined) {
          markdown += `  - Value: ${formatValue(v.value, v.type)}\n`;
        }
        if (v.modes && Object.keys(v.modes).length > 0) {
          markdown += `  - Modes:\n`;
          Object.entries(v.modes).forEach(([mode, value]) => {
            markdown += `    - ${mode}: ${formatValue(value, v.type)}\n`;
          });
        }
        if (v.references && v.references.length > 0) {
          markdown += `  - References: ${v.references.join(', ')}\n`;
        }
        markdown += `\n`;
      });
    }
  });

  // Semantic Variables
  markdown += `## Semantic Variables\n\n`;
  Object.entries(categories.semantic).forEach(([subcat, vars]) => {
    if (vars.length > 0) {
      markdown += `### ${subcat.charAt(0).toUpperCase() + subcat.slice(1)}\n\n`;
      vars.forEach(v => {
        markdown += `- **${v.name}**\n`;
        markdown += `  - Type: ${v.type}\n`;
        if (v.value !== undefined) {
          markdown += `  - Value: ${formatValue(v.value, v.type)}\n`;
        }
        if (v.modes && Object.keys(v.modes).length > 0) {
          markdown += `  - Modes:\n`;
          Object.entries(v.modes).forEach(([mode, value]) => {
            markdown += `    - ${mode}: ${formatValue(value, v.type)}\n`;
          });
        }
        if (v.references && v.references.length > 0) {
          markdown += `  - References: ${v.references.join(', ')}\n`;
        }
        markdown += `\n`;
      });
    }
  });

  // References Map
  if (references.length > 0) {
    markdown += `## Variable Reference Map\n\n`;
    markdown += `| From | To | Type |\n`;
    markdown += `|------|----|----|\n`;
    references.forEach(ref => {
      markdown += `| ${ref.from} | ${ref.to} | ${ref.type} |\n`;
    });
    markdown += `\n`;
  }

  fs.writeFileSync(outputPath, markdown, 'utf8');
  console.log(`✅ Markdown documentation generated: ${outputPath}`);
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: node scripts/process-variables.js <input-file.json>');
    console.error('');
    console.error('The input file should contain variable definitions from get_variable_defs');
    process.exit(1);
  }

  const inputFile = args[0];

  if (!fs.existsSync(inputFile)) {
    console.error(`Error: File not found: ${inputFile}`);
    process.exit(1);
  }

  console.log(`📖 Reading variable definitions from: ${inputFile}`);

  let data;
  try {
    const content = fs.readFileSync(inputFile, 'utf8');
    data = JSON.parse(content);
  } catch (error) {
    console.error(`Error parsing JSON: ${error.message}`);
    process.exit(1);
  }

  // Extract variables from the response
  // The format may vary, so we'll try to handle different structures
  let variables = {};

  if (data.variables) {
    variables = data.variables;
  } else if (typeof data === 'object' && !Array.isArray(data)) {
    variables = data;
  } else {
    console.error('Error: Unexpected data format');
    console.error('Expected an object with variable definitions');
    process.exit(1);
  }

  console.log(`📊 Found ${Object.keys(variables).length} variables`);

  // Categorize variables
  const categories = categorizeVariables(variables);

  console.log('\n📁 Variable Categories:');
  console.log(`  Foundation: ${Object.values(categories.foundation).flat().length} variables`);
  console.log(`  Semantic: ${Object.values(categories.semantic).flat().length} variables`);
  console.log(`  Component: ${Object.values(categories.component).flat().length} variables`);
  console.log(`  Unknown: ${categories.unknown.length} variables`);

  // Extract references
  const references = extractReferences(variables);
  console.log(`\n🔗 Found ${references.length} variable references`);

  // Generate output files
  const baseName = path.basename(inputFile, path.extname(inputFile));
  const outputDir = path.dirname(inputFile);

  // Save categorized JSON
  const jsonOutput = path.join(outputDir, `${baseName}-categorized.json`);
  fs.writeFileSync(jsonOutput, JSON.stringify(categories, null, 2), 'utf8');
  console.log(`✅ Categorized JSON saved: ${jsonOutput}`);

  // Save references JSON
  const refOutput = path.join(outputDir, `${baseName}-references.json`);
  fs.writeFileSync(refOutput, JSON.stringify(references, null, 2), 'utf8');
  console.log(`✅ References JSON saved: ${refOutput}`);

  // Generate markdown
  const mdOutput = path.join(outputDir, `${baseName}-documentation.md`);
  generateMarkdown(categories, references, mdOutput);

  console.log('\n✨ Processing complete!');
  console.log(`\nNext steps:`);
  console.log(`  1. Review the generated documentation: ${mdOutput}`);
  console.log(`  2. Update figma-variable-structure.md with the extracted data`);
  console.log(`  3. Use the categorized JSON to understand the variable structure`);
}

if (require.main === module) {
  main();
}

module.exports = { categorizeVariables, extractReferences, formatValue };

