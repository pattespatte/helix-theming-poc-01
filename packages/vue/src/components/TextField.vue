<template>
	<FTextField v-bind="$attrs" :class="['helix-text-field', customClass]">
		<slot />
	</FTextField>
</template>

<script setup>
import { FTextField } from "@fkui/vue";
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
.helix-text-field {
	/* Custom transitions or effects */
	transition: all 0.3s ease;
}
</style>
