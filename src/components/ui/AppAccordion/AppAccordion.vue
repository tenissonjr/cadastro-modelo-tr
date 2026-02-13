<template>
    <Accordion :value="value">
        <slot></slot>
    </Accordion>
</template>
<script setup lang="ts">
import Accordion from 'primevue/accordion';
defineProps({
    value: {
        type: Number,
        required: true,
    },
})

</script>