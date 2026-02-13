import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Attribute, Category, FilterType, TermoReferencia } from '@/types'

export const useAttributeStore = defineStore('attributes', () => {
  // State
  const termoReferencia = ref<TermoReferencia>({
    titulo: '',
    tipo: 'aquisicao',
  })

  const searchQuery = ref('')
  const filterType = ref<FilterType>('all')

  const categories = ref<Category[]>([
    { id: 'info-iniciais', name: 'Informações Iniciais', icon: '▼', expanded: true },
    { id: 'def-objeto', name: 'Definição do Objeto', icon: '▼', expanded: true },
    { id: 'fund-contratacao', name: 'Fundamentação da Contratação', icon: '▼', expanded: true },
    { id: 'item-requisitos', name: 'Item - Requisitos', icon: '▼', expanded: true },
    { id: 'item-execucao', name: 'Item - Modelo de Execução', icon: '▼', expanded: true },
    { id: 'item-selecao', name: 'Item - Seleção Fornecedor', icon: '▼', expanded: true },
    {
      id: 'item-medicao',
      name: 'Item - Critérios de Medição e Pagamento',
      icon: '▼',
      expanded: true,
    },
  ])

  const attributes = ref<Attribute[]>([
    // Informações Iniciais
    { id: '1', name: 'UNIDADES SUPRIDORAS', categoryId: 'info-iniciais', selected: true },
    { id: '2', name: 'JUSTIFICATIVA', categoryId: 'info-iniciais', selected: false },
    { id: '3', name: 'DESCRIÇÃO DA DEMANDA', categoryId: 'info-iniciais', selected: false },

    // Definição do Objeto
    { id: '4', name: 'OBJETO', categoryId: 'def-objeto', selected: true },
    { id: '5', name: 'ESPECIFICAÇÕES TÉCNICAS', categoryId: 'def-objeto', selected: false },
    { id: '6', name: 'QUANTITATIVOS', categoryId: 'def-objeto', selected: true },
    { id: '7', name: 'CATÁLOGO DE MATERIAIS', categoryId: 'def-objeto', selected: false },

    // Fundamentação da Contratação
    {
      id: '8',
      name: 'JUSTIFICATIVA DA CONTRATAÇÃO',
      categoryId: 'fund-contratacao',
      selected: true,
    },
    {
      id: '9',
      name: 'ESTUDOS TÉCNICOS PRELIMINARES',
      categoryId: 'fund-contratacao',
      selected: false,
    },
    { id: '10', name: 'ANÁLISE DE RISCOS', categoryId: 'fund-contratacao', selected: false },

    // Item - Requisitos
    { id: '11', name: 'CONFECCIONADO EM MADEIRA?', categoryId: 'item-requisitos', selected: true },
    {
      id: '12',
      name: 'ESPECIFICAÇÕES DE QUALIDADE',
      categoryId: 'item-requisitos',
      selected: true,
    },
    { id: '13', name: 'CERTIFICAÇÕES NECESSÁRIAS', categoryId: 'item-requisitos', selected: false },
    { id: '14', name: 'GARANTIA MÍNIMA', categoryId: 'item-requisitos', selected: false },
    { id: '15', name: 'PRAZO DE VALIDADE', categoryId: 'item-requisitos', selected: false },

    // Item - Modelo de Execução
    { id: '16', name: 'PRAZO DE ENTREGA DO OBJETO', categoryId: 'item-execucao', selected: true },
    { id: '17', name: 'LOCAL DE ENTREGA', categoryId: 'item-execucao', selected: false },
    { id: '18', name: 'CONDIÇÕES DE ARMAZENAMENTO', categoryId: 'item-execucao', selected: false },

    // Item - Seleção Fornecedor
    { id: '19', name: 'HAVERÁ AMOSTRAS', categoryId: 'item-selecao', selected: true },
    { id: '20', name: 'QUALIFICAÇÃO TÉCNICA', categoryId: 'item-selecao', selected: false },
    { id: '21', name: 'CAPACIDADE OPERACIONAL', categoryId: 'item-selecao', selected: false },
    { id: '22', name: 'EXPERIÊNCIA ANTERIOR', categoryId: 'item-selecao', selected: false },

    // Item - Critérios de Medição e Pagamento
    { id: '23', name: 'CRITÉRIOS DE MEDIÇÃO', categoryId: 'item-medicao', selected: false },
    { id: '24', name: 'FORMA DE PAGAMENTO', categoryId: 'item-medicao', selected: false },
  ])

  // Getters
  const totalAttributes = computed(() => attributes.value.length)

  const totalSelected = computed(() => attributes.value.filter((attr) => attr.selected).length)

  const totalUnselected = computed(() => totalAttributes.value - totalSelected.value)

  const getAttributesByCategory = (categoryId: string) => {
    return attributes.value.filter((attr) => attr.categoryId === categoryId)
  }

  const getSelectedCountByCategory = (categoryId: string) => {
    return attributes.value.filter((attr) => attr.categoryId === categoryId && attr.selected).length
  }

  const getTotalCountByCategory = (categoryId: string) => {
    return attributes.value.filter((attr) => attr.categoryId === categoryId).length
  }

  const getVisibleAttributesByCategory = (categoryId: string) => {
    let attrs = getAttributesByCategory(categoryId)

    // Apply search filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      attrs = attrs.filter((attr) => attr.name.toLowerCase().includes(query))
    }

    // Apply selection filter
    if (filterType.value === 'selected') {
      attrs = attrs.filter((attr) => attr.selected)
    } else if (filterType.value === 'unselected') {
      attrs = attrs.filter((attr) => !attr.selected)
    }

    return attrs
  }

  const getVisibleCountByCategory = (categoryId: string) => {
    return getVisibleAttributesByCategory(categoryId).length
  }

  const isCategoryVisible = (categoryId: string) => {
    return getVisibleCountByCategory(categoryId) > 0
  }

  const visibleCategories = computed(() => {
    return categories.value.filter((cat) => isCategoryVisible(cat.id))
  })

  // Actions
  const toggleAttribute = (attributeId: string) => {
    const attr = attributes.value.find((a) => a.id === attributeId)
    if (attr) {
      attr.selected = !attr.selected
    }
  }

  const toggleCategory = (categoryId: string) => {
    const category = categories.value.find((c) => c.id === categoryId)
    if (category) {
      category.expanded = !category.expanded
      category.icon = category.expanded ? '▼' : '▶'
    }
  }

  const toggleAllCategories = (expand: boolean) => {
    categories.value.forEach((c) => {
      c.expanded = expand
      c.icon = expand ? '▼' : '▶'
    })
  }

  const setSearchQuery = (query: string) => {
    searchQuery.value = query
  }

  const clearSearch = () => {
    searchQuery.value = ''
  }

  const setFilterType = (type: FilterType) => {
    filterType.value = type
  }

  const clearForm = () => {
    termoReferencia.value = {
      titulo: '',
      tipo: 'aquisicao',
    }
    attributes.value.forEach((attr) => {
      attr.selected = false
    })
  }

  const submitForm = () => {
    const selectedAttributes = attributes.value
      .filter((attr) => attr.selected)
      .map((attr) => ({ id: attr.id, name: attr.name }))

    const formData = {
      ...termoReferencia.value,
      attributes: selectedAttributes,
    }

    console.log('Submitting form:', formData)
    // Here you would typically send this to an API
    return formData
  }

  return {
    // State
    termoReferencia,
    searchQuery,
    filterType,
    categories,
    attributes,

    // Getters
    totalAttributes,
    totalSelected,
    totalUnselected,
    visibleCategories,
    getAttributesByCategory,
    getSelectedCountByCategory,
    getTotalCountByCategory,
    getVisibleAttributesByCategory,
    getVisibleCountByCategory,
    isCategoryVisible,

    // Actions
    toggleAttribute,
    toggleCategory,
    toggleAllCategories,
    setSearchQuery,
    clearSearch,
    setFilterType,
    clearForm,
    submitForm,
  }
})
