<template>
	<FValidationForm
		v-bind="$attrs"
		:class="['helix-validation-form', customClass]"
	>
		<slot />
	</FValidationForm>
</template>

<script setup>
import { FValidationForm } from "@fkui/vue";
import { computed } from "vue";

const props = defineProps({
	class: String,
});

const customClass = computed(() => {
	return props.class;
});
</script>

<style scoped>
/* Additional Helix-specific styles */
.helix-validation-form {
	/* Custom transitions or effects */
	transition: all 0.3s ease;
}
</style>
