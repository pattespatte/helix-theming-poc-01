<template>
	<FButton v-bind="$attrs" :class="['helix-button', customClass]">
		<slot />
	</FButton>
</template>

<script setup>
import { FButton } from "@fkui/vue";
import { computed } from "vue";

const props = defineProps({
	variant: {
		type: String,
		default: "primary",
	},
	class: String,
});

const customClass = computed(() => {
	return [`helix-button--${props.variant}`, props.class];
});
</script>

<style scoped>
/* Additional Helix-specific styles */
.helix-button {
	/* Custom transitions or effects */
	transition: all 0.3s ease;
}
</style>
