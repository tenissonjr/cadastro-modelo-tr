import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Attribute, Category, FilterType, TermoReferencia } from '@/types'

export const useAtualizacaoAtributosModeloTermoReferenciaStore = defineStore('useAtualizacaoAtributosModeloTermoReferenciaStore', () => {
  // State
  const termoReferencia = ref<TermoReferencia>({
    titulo: '',
    tipo: 'aquisicao',
  })

  const searchQuery = ref('')
  const filterType = ref<FilterType>('all')

  const categories = ref<Category[]>([
    { id: 1, name: 'Informações Iniciais', icon: '▼', expanded: true },
    { id: 2, name: 'Definição do Objeto', icon: '▼', expanded: true },
    { id: 3, name: 'Fundamentação da Contratação', icon: '▼', expanded: true },
    { id: 4, name: 'Item - Requisitos', icon: '▼', expanded: true },
    { id: 5, name: 'Item - Modelo de Execução', icon: '▼', expanded: true },
    { id: 6, name: 'Item - Seleção Fornecedor', icon: '▼', expanded: true },
    {
      id: 7,
      name: 'Item - Critérios de Medição e Pagamento',
      icon: '▼',
      expanded: true,
    },
  ])

  const attributes = ref<Attribute[]>([
    // Informações Iniciais
    { id: 1, name: 'UNIDADES SUPRIDORAS', categoryId: 1, selected: true },
    { id: 2, name: 'JUSTIFICATIVA', categoryId: 1, selected: false },
    { id: 3, name: 'DESCRIÇÃO DA DEMANDA', categoryId: 1, selected: false },

    // Definição do Objeto
    { id: 4, name: 'OBJETO', categoryId: 2, selected: true },
    { id: 5, name: 'ESPECIFICAÇÕES TÉCNICAS', categoryId: 2, selected: false },
    { id: 6, name: 'QUANTITATIVOS', categoryId: 2, selected: true },
    { id: 7, name: 'CATÁLOGO DE MATERIAIS', categoryId: 2, selected: false },

    // Fundamentação da Contratação
    {
      id: 8,
      name: 'JUSTIFICATIVA DA CONTRATAÇÃO',
      categoryId: 3,
      selected: true,
    },
    {
      id: 9,
      name: 'ESTUDOS TÉCNICOS PRELIMINARES',
      categoryId: 3,
      selected: false,
    },
    { id: 10, name: 'ANÁLISE DE RISCOS', categoryId: 3, selected: false },

    // Item - Requisitos
    { id: 11, name: 'CONFECCIONADO EM MADEIRA?', categoryId: 4, selected: true },
    {
      id: 12,
      name: 'ESPECIFICAÇÕES DE QUALIDADE',
      categoryId: 4,
      selected: true,
    },
    { id: 13, name: 'CERTIFICAÇÕES NECESSÁRIAS', categoryId: 4, selected: false },
    { id: 14, name: 'GARANTIA MÍNIMA', categoryId: 4, selected: false },
    { id: 15, name: 'PRAZO DE VALIDADE', categoryId: 4, selected: false },

    // Item - Modelo de Execução
    { id: 16, name: 'PRAZO DE ENTREGA DO OBJETO', categoryId: 5, selected: true },
    { id: 17, name: 'LOCAL DE ENTREGA', categoryId: 5, selected: false },
    { id: 18, name: 'CONDIÇÕES DE ARMAZENAMENTO', categoryId: 5, selected: false },

    // Item - Seleção Fornecedor
    { id: 19, name: 'HAVERÁ AMOSTRAS', categoryId: 6, selected: true },
    { id: 20, name: 'QUALIFICAÇÃO TÉCNICA', categoryId: 6, selected: false },
    { id: 21, name: 'CAPACIDADE OPERACIONAL', categoryId: 6, selected: false },
    { id: 22, name: 'EXPERIÊNCIA ANTERIOR', categoryId: 6, selected: false },

    // Item - Critérios de Medição e Pagamento
    { id: 23, name: 'CRITÉRIOS DE MEDIÇÃO', categoryId: 7, selected: false },
    { id: 24, name: 'FORMA DE PAGAMENTO', categoryId: 7, selected: false },
  ])

  // Getters
  const totalAttributes = computed(() => attributes.value.length)

  const totalSelected = computed(() => attributes.value.filter((attr) => attr.selected).length)

  const totalUnselected = computed(() => totalAttributes.value - totalSelected.value)

  const getAttributesByCategory = (categoryId: number) => {
    return attributes.value.filter((attr) => attr.categoryId === categoryId)
  }

  const getSelectedCountByCategory = (categoryId: number) => {
    return attributes.value.filter((attr) => attr.categoryId === categoryId && attr.selected).length
  }

  const getTotalCountByCategory = (categoryId: number) => {
    return attributes.value.filter((attr) => attr.categoryId === categoryId).length
  }

  const getVisibleAttributesByCategory = (categoryId: number) => {
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

  const getVisibleCountByCategory = (categoryId: number) => {
    return getVisibleAttributesByCategory(categoryId).length
  }

  const isCategoryVisible = (categoryId: number) => {
    return getVisibleCountByCategory(categoryId) > 0
  }

  const visibleCategories = computed(() => {
    return categories.value.filter((cat) => isCategoryVisible(cat.id))
  })

  // Actions
  const toggleAttribute = (attributeId: number) => {
    const attr = attributes.value.find((a) => a.id === attributeId)
    if (attr) {
      attr.selected = !attr.selected
    }
  }

  const toggleCategory = (categoryId: number) => {
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
