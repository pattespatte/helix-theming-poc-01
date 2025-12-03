<template>
	<FSelectField v-bind="$attrs" :class="['helix-select-field', customClass]">
		<slot />
	</FSelectField>
</template>

<script setup>
import { FSelectField } from "@fkui/vue";
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
.helix-select-field {
	/* Custom transitions or effects */
	transition: all 0.3s ease;
}
</style>
