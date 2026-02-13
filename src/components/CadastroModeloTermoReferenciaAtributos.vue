<template>
    <div v-if="isVisible" class="accordion-item">
        <div class="accordion-header" @click="handleToggle">
            <div class="accordion-title">
                <span class="accordion-icon">{{ category.icon }}</span>
                {{ category.name }}
            </div>
            <div class="accordion-badges">
                <span class="badge badge-total">
                    📊 {{ visibleCount }}{{ visibleCount !== totalCount ? ` de ${totalCount}` : '' }}
                    {{ totalCount === 1 ? 'atributo' : 'atributos' }}
                </span>
                <span class="badge badge-selected" :class="{ 'empty': selectedCount === 0 }">
                    ✓ {{ selectedCount }}/{{ visibleCount }}
                </span>
            </div>
        </div>
        <div v-show="category.expanded" class="accordion-content">
            <cadastro-modelo-termo-referencia-atributos-item v-for="attr in visibleAttributes" :key="attr.id"
                :attribute="attr" :search-query="searchQuery" @toggle="handleAttributeToggle" />
            <div v-if="visibleAttributes.length === 0" class="no-results">
                Nenhum atributo encontrado
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CadastroModeloTermoReferenciaAtributosItem from './CadastroModeloTermoReferenciaAtributosItem.vue';
import type { Category, Attribute } from '@/types';

interface Props {
    category: Category;
    attributes: Attribute[];
    visibleAttributes: Attribute[];
    selectedCount: number;
    totalCount: number;
    visibleCount: number;
    isVisible: boolean;
    searchQuery: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
    'toggle-category': [id: string];
    'toggle-attribute': [id: string];
}>();

const handleToggle = () => {
    emit('toggle-category', props.category.id);
};

const handleAttributeToggle = (id: string) => {
    emit('toggle-attribute', id);
};
</script>

<style scoped>
.accordion-item {
    border-bottom: 1px solid #dee2e6;
}

.accordion-item:last-child {
    border-bottom: none;
}

.accordion-header {
    padding: 14px 16px;
    background-color: #f8f9fa;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #dee2e6;
    transition: background-color 0.2s;
}

.accordion-header:hover {
    background-color: #e9ecef;
}

.accordion-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #333;
}

.accordion-icon {
    font-size: 12px;
    color: #6c757d;
    min-width: 12px;
}

.accordion-badges {
    display: flex;
    gap: 8px;
    align-items: center;
}

.badge {
    padding: 3px 10px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;
}

.badge-total {
    background-color: #6c757d;
    color: white;
}

.badge-selected {
    background-color: #28a745;
    color: white;
}

.badge-selected.empty {
    background-color: #dc3545;
}

.accordion-content {
    padding: 12px 16px;
    background-color: white;
}

.no-results {
    padding: 16px;
    text-align: center;
    color: #6c757d;
    font-size: 14px;
}
</style>