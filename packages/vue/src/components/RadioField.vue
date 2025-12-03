<template>
	<FRadioField v-bind="$attrs" :class="['helix-radio-field', customClass]">
		<slot />
	</FRadioField>
</template>

<script setup>
import { FRadioField } from "@fkui/vue";
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
.helix-radio-field {
	/* Custom transitions or effects */
	transition: all 0.3s ease;
}
</style>
