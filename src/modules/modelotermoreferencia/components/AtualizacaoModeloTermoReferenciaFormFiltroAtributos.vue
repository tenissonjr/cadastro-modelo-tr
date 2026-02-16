<template>
    <div class="filter-container">
        <div class="filter-group">
            <span class="filter-label">Exibir:</span>

            <label class="radio-option">
                <input type="radio" name="filter" value="todos" 
                    v-model="store.tipoFiltroAtributo">
                <span class="radio-label">
                    Todos atributos <span class="count">({{ store.totalAtributos }})</span>
                </span>
            </label>

            <label class="radio-option">
                <input type="radio" name="filter" value="selecionados" 
                    v-model="store.tipoFiltroAtributo">
                <span class="radio-label">
                    Atributos vinculados <span class="count">({{ store.totalAtributosSelecionados }})</span>
                </span>
            </label>

            <label class="radio-option">
                <input type="radio" name="filter" value="naoSelecionados" 
                    v-model="store.tipoFiltroAtributo">
                <span class="radio-label">
                    Atributos não vinculados <span class="count">({{ store.totalAtributosNaoSelecionados }})</span>
                </span>
            </label>
        </div>
        <button class="toggle-button" :class="{ 'active': isTodosAgrupamentosExpandidos }" @click="emit('toggle-all')">
            <span class="icon">{{ isTodosAgrupamentosExpandidos ? '🔼' : '🔽' }}</span>
            <span class="text">{{ isTodosAgrupamentosExpandidos ? 'Recolher Todos' : 'Expandir Todos' }}</span>
        </button>
    </div>
</template>

<script setup lang="ts">
import type { TipoFiltroAtributo } from '@/types';
import { useAtualizacaoAtributosModeloTermoReferenciaStore } from '@/stores/AtualizacaoAtributosModeloTermoReferenciaStore';


const store = useAtualizacaoAtributosModeloTermoReferenciaStore();


interface Props {
    isTodosAgrupamentosExpandidos: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
    'toggle-all': []
}>();

</script>

<style scoped>
.filter-container {
    margin-bottom: 20px;
    padding: 12px;
    background-color: #f8f9fa;
    border-radius: 6px;
    border: 1px solid #dee2e6;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.filter-group {
    display: flex;
    align-items: center;
    gap: 24px;
}

.filter-label {
    font-weight: 600;
    color: #495057;
    font-size: 14px;
}

.radio-option {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    padding: 6px 12px;
    border-radius: 4px;
    transition: background-color 0.2s;
}

.radio-option:hover {
    background-color: #e9ecef;
}

.radio-option input[type="radio"] {
    margin-right: 6px;
    cursor: pointer;
    width: 16px;
    height: 16px;
}

.radio-label {
    font-size: 14px;
    color: #333;
}

.count {
    color: #6c757d;
    font-size: 13px;
    margin-left: 4px;
}

.toggle-button {
    padding: 8px 16px;
    font-size: 14px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
}

.toggle-button:hover {
    background-color: #0056b3;
}

.toggle-button.active {
    background-color: #0056b3;
}
</style>