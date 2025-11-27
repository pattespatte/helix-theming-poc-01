<template>
	<div id="app">
		<h1>Components</h1>
		<section class="component-container">
			<p>Helix component, no custom styling</p>
			<!-- Helix components automatically use FKUI with custom theme -->
			<HxButton variant="primary"> Helix Themed Button </HxButton>
		</section>

		<section class="component-container">
			<!-- Can still use FKUI components directly -->
			<p>FKUI component, no custom styling</p>
			<FTextField v-model="value" />
		</section>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { HxButton } from "@helix/vue";
import { FTextField } from "@fkui/vue";
import "@helix/design"; // Import theme styles

const value = ref("");
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
