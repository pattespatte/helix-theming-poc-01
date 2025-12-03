<template>
	<FBadge v-bind="$attrs" :class="['helix-badge', customClass]">
		<slot />
	</FBadge>
</template>

<script setup>
import { FBadge } from "@fkui/vue";
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
.helix-badge {
	/* Custom transitions or effects */
	transition: all 0.3s ease;
}
</style>