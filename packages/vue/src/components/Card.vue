<template>
	<FCard v-bind="$attrs" :class="['helix-card', customClass]">
		<slot />
	</FCard>
</template>

<script setup>
import { FCard } from "@fkui/vue";
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
.helix-card {
	/* Custom transitions or effects */
	transition: all 0.3s ease;
}
</style>