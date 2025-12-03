<template>
	<FTextareaField v-bind="$attrs" :class="['helix-textarea-field', customClass]">
		<slot />
	</FTextareaField>
</template>

<script setup>
import { FTextareaField } from "@fkui/vue";
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
.helix-textarea-field {
	/* Custom transitions or effects */
	transition: all 0.3s ease;
}
</style>