<template>
	<div id="app">
		<!-- Helix components automatically use FKUI with custom theme -->
		<EhmdsButton variant="primary"> Helix Themed Button </EhmdsButton>

		<!-- Can still use FKUI components directly -->
		<FTextField v-model="value" />
	</div>
</template>

<script setup>
import { ref } from "vue";
import { EhmdsButton } from "@helix/vue";
import { FTextField } from "@fkui/vue";
import "@helix/design"; // Import theme styles

const value = ref("");
</script>
