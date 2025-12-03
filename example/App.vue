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

		<h2>Helix wrapped components</h2>
			<p>Using Helix wrapper components that wrap FKUI components</p>
		<div class="masonry-container">
			<section class="component-container">
				<p>
					<code>HxTextField</code> component with
					<code>density-default</code> applied
				</p>
				<HxTextField v-model="defaultValue" class="density-default" />
			</section>
			<section class="component-container">
				<p>
					<code>HxTextField</code> component with
					<code>density-dense</code> applied
				</p>
				<HxTextField v-model="denseValue" class="density-dense" />
			</section>
			<section class="component-container">
				<p>
					<code>HxTextField</code> component with
					<code>density-densest</code> applied
				</p>
				<HxTextField v-model="densestValue" class="density-densest" />
			</section>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { HxButton, HxTextField } from "@helix/vue";
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


</style>
