<template>
    <div class="attribute-item">
        <input :id="`attr-${atributo.id}`" type="checkbox" :checked="atributo.selecionado" @change="handleToggle">
        <label :for="`attr-${atributo.id}`" class="attribute-label" v-html="highlightedName"></label>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ITipoCapituloDTO } from '@/types';

interface Props {
    atributo: ITipoCapituloDTO;
    descricaoPesquisa?: string;
}

const props = withDefaults(defineProps<Props>(), {
    descricaoPesquisa: ''
});

const emit = defineEmits<{
    toggle: [id: number]
}>();

const handleToggle = () => {
    emit('toggle', props.atributo.id);
};

const highlightedName = computed(() => {
    if (!props.descricaoPesquisa) {
        return props.atributo.descricao;
    }

    const regex = new RegExp(`(${props.descricaoPesquisa})`, 'gi');
    return props.atributo.descricao.replace(
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