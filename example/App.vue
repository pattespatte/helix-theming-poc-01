<template>
	<div id="app">
		<h1>Components</h1>
		<h2>Helix components</h2>
		<div class="masonry-container">			
			<section class="component-container">
				<p><code>HxButton</code> component with <code>density-default</code> applied</p>
				<HxButton variant="primary" class="density-default"> Helix Themed Button </HxButton>
			</section>
			<section class="component-container">
				<p><code>HxButton</code> component with <code>density-dense</code> applied</p>
				<HxButton variant="primary" class="density-dense"> Helix Themed Button </HxButton>
			</section>
			<section class="component-container">
				<p><code>HxButton</code> component with <code>density-densest</code> applied</p>
				<HxButton variant="primary" class="density-densest"> Helix Themed Button </HxButton>
			</section>
		</div>

		<h2>FKUI components</h2>
		<p>This setup can still use FKUI components directly, with <b>Helix styling</b> applied</p>
		
		<h3>Input Fields</h3>
		<div class="masonry-container">
			<section class="component-container">
				<p>
					<code>FTextField</code> component with
					<code>density-default</code> applied
				</p>
				<FTextField v-model="defaultValue" class="density-default" />
			</section>
			<section class="component-container">
				<p>
					<code>FTextField</code> component with
					<code>density-dense</code> applied
				</p>
				<FTextField v-model="denseValue" class="density-dense" />
			</section>
			<section class="component-container">
				<p>
					<code>FTextField</code> component with
					<code>density-densest</code> applied
				</p>
				<FTextField v-model="densestValue" class="density-densest" />
			</section>
			<section class="component-container">
				<p>
					<code>FTextField</code> with placeholder and label
				</p>
				<FTextField
					v-model="labeledValue"
					label="Full Name"
					placeholder="Enter your name"
					class="density-default"
				/>
			</section>
			<section class="component-container">
				<p>
					<code>FTextField</code> with validation state
				</p>
				<FTextField
					v-model="validatedValue"
					label="Email Address"
					placeholder="email@example.com"
					class="density-default"
					validation-state="error"
				/>
			</section>
		</div>

		<h3>Form Elements</h3>
		<div class="masonry-container">
			<section class="component-container">
				<p>
					<code>FValidationForm</code> with <code>FTextField</code> and label
				</p>
				<FValidationForm class="density-default">
					<FTextField
						v-model="formValue1"
						label="First Name"
						placeholder="Enter first name"
					/>
				</FValidationForm>
			</section>
			<section class="component-container">
				<p>
					<code>FTextField</code> with hint text
				</p>
				<FTextField
					v-model="hintedValue"
					label="Password"
					type="password"
					hint="Password must be at least 8 characters"
					class="density-default"
				/>
			</section>
			<section class="component-container">
				<p>
					<code>FTextField</code> with success state
				</p>
				<FTextField
					v-model="successValue"
					label="Username"
					placeholder="Choose a username"
					class="density-default"
					validation-state="success"
				/>
			</section>
			<section class="component-container">
				<p>
					<code>FTextareaField</code> component
				</p>
				<FTextareaField
					v-model="textAreaValue"
					label="Comments"
					placeholder="Enter your comments here..."
					class="density-default"
				/>
			</section>
			<section class="component-container">
				<p>
					<code>FSelectField</code> dropdown
				</p>
				<FSelectField
					v-model="selectValue"
					label="Country"
					class="density-default"
				>
					<option value="">Select a country</option>
					<option value="se">Sweden</option>
					<option value="no">Norway</option>
					<option value="dk">Denmark</option>
					<option value="fi">Finland</option>
				</FSelectField>
			</section>
		</div>

		<h3>Checkboxes and Radio Buttons</h3>
		<div class="masonry-container">
			<section class="component-container">
				<p>
					<code>FCheckboxField</code> components
				</p>
				<div class="checkbox-group">
					<FCheckboxField
						:value="checkbox1"
						@update:value="checkbox1 = $event"
						label="I agree to the terms and conditions"
						class="density-default"
					/>
					<FCheckboxField
						:value="checkbox2"
						@update:value="checkbox2 = $event"
						label="Subscribe to newsletter"
						class="density-default"
					/>
					<FCheckboxField
						:value="checkbox3"
						@update:value="checkbox3 = $event"
						label="Enable notifications"
						class="density-default"
					/>
				</div>
			</section>
			<section class="component-container">
				<p>
					<code>FRadioField</code> components
				</p>
				<div class="radio-group">
					<FRadioField
						:value="radioValue"
						@update:value="radioValue = $event"
						option-value="option1"
						label="Option 1"
						class="density-default"
					/>
					<FRadioField
						:value="radioValue"
						@update:value="radioValue = $event"
						option-value="option2"
						label="Option 2"
						class="density-default"
					/>
					<FRadioField
						:value="radioValue"
						@update:value="radioValue = $event"
						option-value="option3"
						label="Option 3"
						class="density-default"
					/>
				</div>
			</section>
			<section class="component-container">
				<p>
					<code>FCheckboxField</code> with validation state
				</p>
				<FCheckboxField
					:value="checkboxError"
					@update:value="checkboxError = $event"
					label="Required checkbox"
					class="density-default"
					validation-state="error"
				/>
			</section>
		</div>

		<h3>UI Components</h3>
		<div class="masonry-container">
			<section class="component-container">
				<p>
					<code>FButton</code> variants
				</p>
				<div class="button-group">
					<FButton variant="primary" class="density-default">Primary</FButton>
					<FButton variant="secondary" class="density-default">Secondary</FButton>
					<FButton variant="danger" class="density-default">Danger</FButton>
				</div>
			</section>
			<section class="component-container">
				<p>
					<code>FButton</code> with different densities
				</p>
				<div class="button-group">
					<FButton variant="primary" class="density-default">Default</FButton>
					<FButton variant="primary" class="density-dense">Dense</FButton>
					<FButton variant="primary" class="density-densest">Densest</FButton>
				</div>
			</section>
			<section class="component-container">
				<p>
					<code>FCard</code> component
				</p>
				<FCard class="density-default">
					<h3>Card Title</h3>
					<p>This is a card component with Helix styling applied. It demonstrates the updated visual design.</p>
				</FCard>
			</section>
			<section class="component-container">
				<p>
					<code>FMessageBox</code> variants
				</p>
				<div class="alert-group">
					<FMessageBox type="info" class="density-default">This is an info alert</FMessageBox>
					<FMessageBox type="success" class="density-default">This is a success alert</FMessageBox>
					<FMessageBox type="warning" class="density-default">This is a warning alert</FMessageBox>
					<FMessageBox type="error" class="density-default">This is an error alert</FMessageBox>
				</div>
			</section>
			<section class="component-container">
				<p>
					<code>FBadge</code> components
				</p>
				<div class="badge-group">
					<FBadge variant="primary" class="density-default">Primary</FBadge>
					<FBadge variant="secondary" class="density-default">Secondary</FBadge>
					<FBadge variant="success" class="density-default">Success</FBadge>
					<FBadge variant="warning" class="density-default">Warning</FBadge>
					<FBadge variant="error" class="density-default">Error</FBadge>
				</div>
			</section>
		</div>

		<h3>Tables</h3>
		<div class="masonry-container">
			<section class="component-container">
				<p>
					<code>FDataTable</code> with Helix styling
				</p>
				<table class="density-default">
					<thead>
						<tr>
							<th>Name</th>
							<th>Age</th>
							<th>City</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>John Doe</td>
							<td>35</td>
							<td>Stockholm</td>
						</tr>
						<tr>
							<td>Jane Smith</td>
							<td>28</td>
							<td>Gothenburg</td>
						</tr>
						<tr>
							<td>Bob Johnson</td>
							<td>42</td>
							<td>Malmö</td>
						</tr>
					</tbody>
				</table>
			</section>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { HxButton } from "@helix/vue";
import {
	FTextField,
	FTextareaField,
	FSelectField,
	FCheckboxField,
	FRadioField,
	FButton,
	FCard,
	FMessageBox,
	FBadge,
	FDataTable,
	FValidationForm
} from "@fkui/vue";
import "@helix/design"; // Import theme styles

// Fix for FTextField label visibility issue
// This script copies the label text from input's label attribute to the label element
const fixFTextFieldLabels = () => {
  const textFields = document.querySelectorAll('.text-field');
  
  textFields.forEach(field => {
    const input = field.querySelector('input[label]');
    const label = field.querySelector('label.label');
    
    if (input && label && !label.textContent.trim()) {
      const labelText = input.getAttribute('label');
      if (labelText) {
        label.textContent = labelText;
      }
    }
  });
};

// Run the fix when DOM is loaded and when Vue components are mounted
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', fixFTextFieldLabels);
} else {
  fixFTextFieldLabels();
}

// Also run after a short delay to ensure Vue components are fully rendered
setTimeout(fixFTextFieldLabels, 100);

// Text field values
const value = ref("");
const defaultValue = ref("");
const denseValue = ref("");
const densestValue = ref("");
const labeledValue = ref("");
const validatedValue = ref("");
const formValue1 = ref("");
const hintedValue = ref("");
const successValue = ref("");

// Text area value
const textAreaValue = ref("");

// Select value
const selectValue = ref("");

// Checkbox values
const checkbox1 = ref(false);
const checkbox2 = ref(true);
const checkbox3 = ref(false);
const checkboxError = ref(false);

// Radio value
const radioValue = ref("option1");
</script>

<style>
html {
	font-size: 1rem;
}

body {
	padding: 10%;
	display: flex;
	font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
		"Lucida Sans", Arial, sans-serif;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	background-color: #f5f5f5;
}

code {
	margin: 0;
	padding: 0;
}

.masonry-container {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
	gap: 1rem;
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
}

/* Large screens (desktop) - 1200px and up */
@media (min-width: 1200px) {
	.masonry-container {
		max-width: 1200px;
		grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
	}
}

/* Medium screens (tablets) - 768px to 1199px */
@media (max-width: 1199px) and (min-width: 768px) {
	.masonry-container {
		max-width: 100%;
		grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
	}
}

/* Small screens (mobile) - 767px and below */
@media (max-width: 767px) {
	.masonry-container {
		max-width: 100%;
		grid-template-columns: 1fr;
		gap: 0.75rem;
	}
}

.component-container {
	padding: 5%;
	box-sizing: border-box;
	background-color: white;
	border-radius: 1rem;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Component group styling */
.checkbox-group,
.radio-group,
.button-group,
.alert-group,
.badge-group {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
}

.button-group {
	flex-direction: row;
	flex-wrap: wrap;
	gap: 0.5rem;
}

.alert-group {
	gap: 1rem;
}

.badge-group {
	flex-direction: row;
	flex-wrap: wrap;
	gap: 0.5rem;
}

/* Table styling */
table {
	width: 100%;
	border-collapse: collapse;
}

th, td {
	padding: 0.75rem;
	text-align: left;
	border-bottom: 1px solid #e5e7eb;
}

th {
	background-color: #f9fafb;
	font-weight: 600;
}

/* Card styling */
.f-card {
	padding: 1rem;
	border: 1px solid #e5e7eb;
	border-radius: 0.5rem;
	background-color: white;
}

/* Form spacing */
.form-field {
	margin-bottom: 1rem;
}

h3 {
	margin-top: 2rem;
	margin-bottom: 1rem;
	color: #374151;
}

</style>
