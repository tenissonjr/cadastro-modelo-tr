<template>
    <div v-if="isVisible" class="accordion-item">
        <div class="accordion-header" @click="handleToggle">
            <div class="accordion-title">
                <span class="accordion-icon">{{ agrupamentos.expanded ? '▼' : '▶' }}</span>
                {{ agrupamentos.descricao }}
            </div>
            <div class="accordion-badges">
                <span class="badge badge-total">
                    📊 {{ totalAtributosVisiveis }}{{ totalAtributosVisiveis !== totalAtributos ? ` de ${totalAtributos}` : '' }}
                    {{ totalAtributos === 1 ? 'atributo' : 'atributos' }}
                </span>
                <span class="badge badge-selected" :class="{ 'empty': totalAtributosSelecionados === 0 }">
                    ✓ {{ totalAtributosSelecionados }}/{{ totalAtributosVisiveis }}
                </span>
            </div>
        </div>
        <div v-show="agrupamentos.expanded" class="accordion-content">
            <atualizacao-modelo-termo-referencia-form-agrupamentos-atributo v-for="attr in atributosVisiveis" :key="attr.id"
                :atributo="attr" :descricaoPesquisa="descricaoPesquisa" @toggle="handleAttributeToggle" />
            <div v-if="atributosVisiveis.length === 0" class="no-results">
                Nenhum atributo encontrado
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import AtualizacaoModeloTermoReferenciaFormAgrupamentosAtributo from './AtualizacaoModeloTermoReferenciaFormAgrupamentosAtributo.vue';
import type { IAgrupamentoAtributoDTO, ITipoCapituloDTO } from '@/types';

interface Props {
    agrupamentos: IAgrupamentoAtributoDTO;
    atributosVisiveis: ITipoCapituloDTO[];
    totalAtributosSelecionados: number;
    totalAtributos: number;
    totalAtributosVisiveis: number;
    isVisible: boolean;
    descricaoPesquisa: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
    'toggle-agrupamento': [id: number];
    'toggle-atributo': [id: number];
}>();

const handleToggle = () => {
    emit('toggle-agrupamento', props.agrupamentos.id);
};

const handleAttributeToggle = (id: number) => {
    emit('toggle-atributo', id);
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