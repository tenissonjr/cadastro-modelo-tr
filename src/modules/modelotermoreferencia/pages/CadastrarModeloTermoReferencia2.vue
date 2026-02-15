<template>
  <div class="container">
    <!-- Breadcrumb -->
    <div class="breadcrumb">
      🏠 <a href="#">Gerenciar Modelos de Termo de Referência</a> / Cadastrar Modelo de Termo de Referência
    </div>

    <!-- Header -->
    <div class="header">
      <h1>Cadastrar Modelo de Termo de Referência</h1>
    </div>

    <!-- Form Section -->
    <div class="form-section">
      <div class="form-row">
        <div class="form-group">
          <label for="titulo">Título</label>
          <input id="titulo" v-model="store.termoReferencia.titulo" type="text" name="titulo">
        </div>
        <div class="form-group">
          <label for="tipo">Tipo</label>
          <select id="tipo" v-model="store.termoReferencia.tipo" name="tipo">
            <option value="aquisicao">Aquisição</option>
            <option value="servico">Serviço</option>
            <option value="obra">Obra</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Attributes Section -->
    <div class="attributes-section">
      <div class="section-header">
        <span class="section-title">Atributos</span>
        <span class="total-counter">
          ({{ store.totalSelected }}/{{ store.totalAttributes }} selecionados)
        </span>
      </div>

      <!-- Search -->
      <div class="search-container">
        <input v-model="store.searchQuery" type="text" class="search-input" placeholder="🔍 Pesquisar atributos...">
        <button class="clear-button" @click="store.limparPesquisa">
          ✕ Limpar
        </button>
      </div>

      <!-- Filter -->
      <cadastro-modelo-termo-referencia-filtro-atributos v-model="store.filterType" :total-count="store.totalAttributes"
        :selected-count="store.totalSelected" :unselected-count="store.totalUnselected"
        @toggle-all="toggleAttributes" />

      <!-- Info Message -->
      <div v-if="showInfoMessage" class="info-message">
        {{ infoMessage }}
      </div>

      <!-- Accordion -->
    <app-accordion :value="0">     
        <cadastro-modelo-termo-referencia-atributos2 v-for="agrupamento in store.agrupamentosVisiveis" :key="agrupamento.id"
          :agrupamentos="agrupamento"
          :atributosVisiveis="store.getAtributosVisiveisPorAgrupamento(agrupamento.id)"
          :totalAtributosSelecionados="store.getAtributosSelecionadosPorAgrupamento(agrupamento.id)"
          :totalAtributos="store.getTotalAtributosPorAgrupamento(agrupamento.id)"
          :totalAtributosVisiveis="store.getTotalAtributosVisiveisPorAgrupamento(agrupamento.id)"
          :is-visible="store.isAgrupamentoVisivel(agrupamento.id)" :descricaoPesquisa="store.searchQuery"
          @toggle-category="store.toggleAgrupamento" @toggle-attribute="store.toggleAtributo" />
    </app-accordion>



      <!-- No Results -->
      <div v-if="store.agrupamentosVisiveis.length === 0" class="no-categories">
        <p>Nenhum atributo encontrado com os filtros aplicados.</p>
        <button class="btn btn-secondary" @click="resetFilters">
          Limpar Filtros
        </button>
      </div>
    </div>


    <!-- Actions -->
    <div class="actions">
      <button class="btn btn-primary" @click="handleSubmit">
        📋 Cadastrar Modelo de Termo de Referência
      </button>
      <button class="btn btn-secondary" @click="handleClear">
        🔄 Limpar
      </button>
      <button class="btn btn-outline" @click="handleReturn">
        ← Retornar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import CadastroModeloTermoReferenciaAtributos2 from '@/modules/modelotermoreferencia/components/CadastroModeloTermoReferenciaAtributos2.vue';
import cadastroModeloTermoReferenciaFiltroAtributos from '@/modules/modelotermoreferencia/components/CadastroModeloTermoReferenciaFiltroAtributos.vue';
import { useAtualizacaoAtributosModeloTermoReferenciaStore } from '@/stores/AtualizacaoAtributosModeloTermoReferenciaStore';
import { computed, ref } from 'vue';

const store = useAtualizacaoAtributosModeloTermoReferenciaStore();
const areAllExpanded = ref(true);

function toggleAttributes() {
  areAllExpanded.value = !areAllExpanded.value;
  store.toggleAllCategories(areAllExpanded.value);
}

const showInfoMessage = computed(() => {
  return store.filterType !== 'todos';
});

const infoMessage = computed(() => {
  if (store.filterType === 'selecionados') {
    return `ℹ️ Exibindo apenas atributos selecionados (${store.totalSelected})`;
  } else if (store.filterType === 'naoSelecionados') {
    return `ℹ️ Exibindo apenas atributos não selecionados (${store.totalUnselected})`;
  }
  return '';
});

const resetFilters = () => {
  store.limparPesquisa();
  store.setTipoFiltroAtributo('todos');
};

const handleSubmit = () => {
  const data = store.submitForm();
  alert('Formulário enviado! Veja o console para os dados.');
  console.log('Form Data:', data);
};

const handleClear = () => {
  if (confirm('Deseja realmente limpar todos os dados?')) {
    store.resetForm();
    resetFilters();
  }
};

const handleReturn = () => {
  if (confirm('Deseja realmente sair? Alterações não salvas serão perdidas.')) {
    window.history.back();
  }
};
</script>

<style scoped>
.container {
  max-width: 1400px;
  margin: 0 auto;
  background-color: white;
  border: 1px solid #ddd;
}

.breadcrumb {
  padding: 12px 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
}

.breadcrumb a {
  color: #0066cc;
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.header {
  padding: 20px;
  border-bottom: 1px solid #ddd;
}

h1 {
  font-size: 28px;
  color: #333;
  font-weight: 600;
}

.form-section {
  padding: 20px;
  background-color: #f8f9fa;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 6px;
  color: #333;
  font-size: 14px;
}

input[type="text"],
select {
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
}

select {
  background-color: white;
  cursor: pointer;
}

.attributes-section {
  padding: 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.total-counter {
  color: #6c757d;
  font-size: 14px;
  font-weight: 500;
}

.search-container {
  margin-bottom: 16px;
  display: flex;
  gap: 8px;
}

.search-input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
}

.clear-button {
  padding: 10px 16px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.clear-button:hover {
  background-color: #5a6268;
}

.info-message {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background-color: #d1ecf1;
  border: 1px solid #bee5eb;
  border-radius: 4px;
  color: #0c5460;
  margin-bottom: 16px;
  font-size: 14px;
}

.accordion-container {
  border: 1px solid #dee2e6;
  border-radius: 4px;
}

.no-categories {
  text-align: center;
  padding: 40px 20px;
  color: #6c757d;
}

.no-categories p {
  margin-bottom: 16px;
  font-size: 16px;
}

.actions {
  padding: 20px;
  background-color: #f8f9fa;
  border-top: 1px solid #ddd;
  display: flex;
  gap: 12px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.2s;
}

.btn-primary {
  background-color: #0066cc;
  color: white;
}

.btn-primary:hover {
  background-color: #0052a3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.btn-outline {
  background-color: white;
  color: #0066cc;
  border: 1px solid #0066cc;
}

.btn-outline:hover {
  background-color: #f0f7ff;
}
</style>