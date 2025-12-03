<template>
	<FCheckboxField v-bind="$attrs" :class="['helix-checkbox-field', customClass]">
		<slot />
	</FCheckboxField>
</template>

<script setup>
import { FCheckboxField } from "@fkui/vue";
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
.helix-checkbox-field {
	/* Custom transitions or effects */
	transition: all 0.3s ease;
}
</style>