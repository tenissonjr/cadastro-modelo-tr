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
    {
      id: 1,
      name: 'Informações Iniciais',
      icon: '▼',
      expanded: true,
      attributes: [
        { id: 1, name: 'UNIDADES SUPRIDORAS', selected: true },
        { id: 2, name: 'JUSTIFICATIVA', selected: false },
        { id: 3, name: 'DESCRIÇÃO DA DEMANDA', selected: false },
      ],
    },
    {
      id: 2,
      name: 'Definição do Objeto',
      icon: '▼',
      expanded: true,
      attributes: [
        { id: 4, name: 'OBJETO', selected: true },
        { id: 5, name: 'ESPECIFICAÇÕES TÉCNICAS', selected: false },
        { id: 6, name: 'QUANTITATIVOS', selected: true },
        { id: 7, name: 'CATÁLOGO DE MATERIAIS', selected: false },
      ],
    },
    {
      id: 3,
      name: 'Fundamentação da Contratação',
      icon: '▼',
      expanded: true,
      attributes: [
        { id: 8, name: 'JUSTIFICATIVA DA CONTRATAÇÃO', selected: true },
        { id: 9, name: 'ESTUDOS TÉCNICOS PRELIMINARES', selected: false },
        { id: 10, name: 'ANÁLISE DE RISCOS', selected: false },
      ],
    },
    {
      id: 4,
      name: 'Item - Requisitos',
      icon: '▼',
      expanded: true,
      attributes: [
        { id: 11, name: 'CONFECCIONADO EM MADEIRA?', selected: true },
        { id: 12, name: 'ESPECIFICAÇÕES DE QUALIDADE', selected: true },
        { id: 13, name: 'CERTIFICAÇÕES NECESSÁRIAS', selected: false },
        { id: 14, name: 'GARANTIA MÍNIMA', selected: false },
        { id: 15, name: 'PRAZO DE VALIDADE', selected: false },
      ],
    },
    {
      id: 5,
      name: 'Item - Modelo de Execução',
      icon: '▼',
      expanded: true,
      attributes: [
        { id: 16, name: 'PRAZO DE ENTREGA DO OBJETO', selected: true },
        { id: 17, name: 'LOCAL DE ENTREGA', selected: false },
        { id: 18, name: 'CONDIÇÕES DE ARMAZENAMENTO', selected: false },
      ],
    },
    {
      id: 6,
      name: 'Item - Seleção Fornecedor',
      icon: '▼',
      expanded: true,
      attributes: [
        { id: 19, name: 'HAVERÁ AMOSTRAS', selected: true },
        { id: 20, name: 'QUALIFICAÇÃO TÉCNICA', selected: false },
        { id: 21, name: 'CAPACIDADE OPERACIONAL', selected: false },
        { id: 22, name: 'EXPERIÊNCIA ANTERIOR', selected: false },
      ],
    },
    {
      id: 7,
      name: 'Item - Critérios de Medição e Pagamento',
      icon: '▼',
      expanded: true,
      attributes: [
        { id: 23, name: 'CRITÉRIOS DE MEDIÇÃO', selected: false },
        { id: 24, name: 'FORMA DE PAGAMENTO', selected: false },
      ],
    },
  ])

  const attributes = computed<Attribute[]>(() => {
    return categories.value.flatMap((category) => category.attributes)
  })

  // Getters
  const totalAttributes = computed(() => attributes.value.length)

  const totalSelected = computed(() => attributes.value.filter((attr) => attr.selected).length)

  const totalUnselected = computed(() => totalAttributes.value - totalSelected.value)

  const getAttributesByCategory = (categoryId: number) => {
    const category = categories.value.find((cat) => cat.id === categoryId)
    return category ? category.attributes : []
  }

  const getSelectedCountByCategory = (categoryId: number) => {
    return getAttributesByCategory(categoryId).filter((attr) => attr.selected).length
  }

  const getTotalCountByCategory = (categoryId: number) => {
    return getAttributesByCategory(categoryId).length
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
    for (const category of categories.value) {
      const attr = category.attributes.find((attribute) => attribute.id === attributeId)
      if (attr) {
        attr.selected = !attr.selected
        return
      }
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
    categories.value.forEach((category) => {
      category.attributes.forEach((attr) => {
        attr.selected = false
      })
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
