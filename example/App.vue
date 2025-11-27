<template>
	<div id="app">
		<h1>Components</h1>
		<h2>Helix components</h2> 
		<section class="component-container">
			<p><code>HxButton</code> component</p>
			<HxButton variant="primary"> Helix Themed Button </HxButton>
		</section>

		<h2>FKUI components</h2> 
		<p>This setup can still use FKUI components directly</p>
		<section class="component-container">
			<p><code>FTextField</code> component with <code>density-default</code> applied</p>
			<FTextField v-model="defaultValue" class="density-default" />
		</section>

		<section class="component-container">
			<p><code>FTextField</code> component with <code>density-dense</code> applied</p>
			<FTextField v-model="denseValue" class="density-dense" />
		</section>

		<section class="component-container">
			<p><code>FTextField</code> component with <code>density-densest</code> applied</p>
			<FTextField v-model="densestValue" class="density-densest" />
		</section>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { HxButton } from "@helix/vue";
import { FTextField } from "@fkui/vue";
import "@helix/design"; // Import theme styles

const value = ref("");
const defaultValue = ref("");
const denseValue = ref("");
const densestValue = ref("");
</script>

<style>
html {
	font-size: 1rem;
}

body {
	padding: 0;
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

.component-container {
	width: 30rem;
	padding: 10%;
	box-sizing: border-box;
	margin: 1rem 0;
	background-color: white;
	border-radius: 1rem;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
	.component-container {
		width: inherit;
	}
}
</style>
