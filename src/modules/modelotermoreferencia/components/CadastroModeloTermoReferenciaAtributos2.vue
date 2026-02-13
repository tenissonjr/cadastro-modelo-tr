<template>
    
      <app-accordion-panel v-if="isVisible" :value="category.id" >
        <app-accordion-header >

            <div class="accordion-title">
                <span>{{ category.name }}</span>
            </div>
            <div class="accordion-badges">
                <span class="badge badge-total">📊 {{ visibleCount }}{{ visibleCount !== totalCount ? ` de ${totalCount}` : '' }} {{ totalCount === 1 ? 'atributo' : 'atributos' }}</span>
                <span class="badge badge-selected">✓ {{ selectedCount }}/{{ visibleCount }}</span>
            </div>
        </app-accordion-header>
        <app-accordion-content v-show="category.expanded" v-for="attr in visibleAttributes" :key="attr.id">
          <cadastro-modelo-termo-referencia-atributos-item2 :attribute="attr" :search-query="searchQuery" @toggle="handleAttributeToggle" />
        </app-accordion-content>
      </app-accordion-panel>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CadastroModeloTermoReferenciaAtributosItem2 from './CadastroModeloTermoReferenciaAtributosItem2.vue';
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
    'toggle-category': [id: number];
    'toggle-attribute': [id: number];
}>();

const handleToggle = () => {
    emit('toggle-category', props.category.id);
};

const handleAttributeToggle = (id: number) => {
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
    margin-left: auto;
    justify-content: flex-end;
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