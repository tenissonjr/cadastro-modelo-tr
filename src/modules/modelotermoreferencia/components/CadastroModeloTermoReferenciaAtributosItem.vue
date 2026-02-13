<template>
    <div class="attribute-item">
        <input :id="`attr-${attribute.id}`" type="checkbox" :checked="attribute.selected" @change="handleToggle">
        <label :for="`attr-${attribute.id}`" class="attribute-label" v-html="highlightedName"></label>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Attribute } from '@/types';

interface Props {
    attribute: Attribute;
    searchQuery?: string;
}

const props = withDefaults(defineProps<Props>(), {
    searchQuery: ''
});

const emit = defineEmits<{
    toggle: [id: number]
}>();

const handleToggle = () => {
    emit('toggle', props.attribute.id);
};

const highlightedName = computed(() => {
    if (!props.searchQuery) {
        return props.attribute.name;
    }

    const regex = new RegExp(`(${props.searchQuery})`, 'gi');
    return props.attribute.name.replace(
        regex,
        '<span class="search-highlight">$1</span>'
    );
});
</script>

<style scoped>
.attribute-item {
    padding: 8px 0;
    display: flex;
    align-items: center;
}

.attribute-item input[type="checkbox"] {
    margin-right: 10px;
    width: 18px;
    height: 18px;
    cursor: pointer;
}

.attribute-label {
    font-size: 14px;
    color: #333;
    cursor: pointer;
    user-select: none;
}

:deep(.search-highlight) {
    background-color: #fff3cd;
    font-weight: bold;
    padding: 2px 0;
}
</style>