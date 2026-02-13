<template>
  <AccordionPanel :value="value">
    <slot></slot>
  </AccordionPanel>
</template>
<script setup lang="ts">
import AccordionPanel from 'primevue/accordionpanel';
defineProps({
  value: {
    type: Number,
    required: true,
  },
})
</script>