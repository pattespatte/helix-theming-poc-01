<template>
	<FMessageBox v-bind="$attrs" :class="['helix-message-box', customClass]">
		<slot />
	</FMessageBox>
</template>

<script setup>
import { FMessageBox } from "@fkui/vue";
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
.helix-message-box {
	/* Custom transitions or effects */
	transition: all 0.3s ease;
}
</style>
