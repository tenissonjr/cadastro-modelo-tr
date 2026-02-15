import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ITipoCapituloDTO, IAgrupamentoAtributoDTO, FilterType, TermoReferencia } from '@/types'

export const useAtualizacaoAtributosModeloTermoReferenciaStore = defineStore('useAtualizacaoAtributosModeloTermoReferenciaStore', () => {
  // State
  const termoReferencia = ref<TermoReferencia>({
    titulo: '',
    tipo: 'aquisicao',
  })

  const searchQuery = ref('')
  const filterType = ref<FilterType>('todos')

  const agrupamentos = ref<IAgrupamentoAtributoDTO[]>([
    {
      id: 1,
      descricao: 'Informações Iniciais',
      icon: '▼',
      expanded: true,
      attributes: [
        { id: 1, descricao: 'UNIDADES SUPRIDORAS', selecionado: true },
        { id: 2, descricao: 'JUSTIFICATIVA', selecionado: false },
        { id: 3, descricao: 'DESCRIÇÃO DA DEMANDA', selecionado: false },
      ],
    },
    {
      id: 2,
      descricao: 'Definição do Objeto',
      icon: '▼',
      expanded: true,
      attributes: [
        { id: 4, descricao: 'OBJETO', selecionado: true },
        { id: 5, descricao: 'ESPECIFICAÇÕES TÉCNICAS', selecionado: false },
        { id: 6, descricao: 'QUANTITATIVOS', selecionado: true },
        { id: 7, descricao: 'CATÁLOGO DE MATERIAIS', selecionado: false },
      ],
    },
    {
      id: 3,
      descricao: 'Fundamentação da Contratação',
      icon: '▼',
      expanded: true,
      attributes: [
        { id: 8, descricao: 'JUSTIFICATIVA DA CONTRATAÇÃO', selecionado: true },
        { id: 9, descricao: 'ESTUDOS TÉCNICOS PRELIMINARES', selecionado: false },
        { id: 10, descricao: 'ANÁLISE DE RISCOS', selecionado: false },
      ],
    },
    {
      id: 4,
      descricao: 'Item - Requisitos',
      icon: '▼',
      expanded: true,
      attributes: [
        { id: 11, descricao: 'CONFECCIONADO EM MADEIRA?', selecionado: true },
        { id: 12, descricao: 'ESPECIFICAÇÕES DE QUALIDADE', selecionado: true },
        { id: 13, descricao: 'CERTIFICAÇÕES NECESSÁRIAS', selecionado: false },
        { id: 14, descricao: 'GARANTIA MÍNIMA', selecionado: false },
        { id: 15, descricao: 'PRAZO DE VALIDADE', selecionado: false },
      ],
    },
    {
      id: 5,
      descricao: 'Item - Modelo de Execução',
      icon: '▼',
      expanded: true,
      attributes: [
        { id: 16, descricao: 'PRAZO DE ENTREGA DO OBJETO', selecionado: true },
        { id: 17, descricao: 'LOCAL DE ENTREGA', selecionado: false },
        { id: 18, descricao: 'CONDIÇÕES DE ARMAZENAMENTO', selecionado: false },
      ],
    },
    {
      id: 6,
      descricao: 'Item - Seleção Fornecedor',
      icon: '▼',
      expanded: true,
      attributes: [
        { id: 19, descricao: 'HAVERÁ AMOSTRAS', selecionado: true },
        { id: 20, descricao: 'QUALIFICAÇÃO TÉCNICA', selecionado: false },
        { id: 21, descricao: 'CAPACIDADE OPERACIONAL', selecionado: false },
        { id: 22, descricao: 'EXPERIÊNCIA ANTERIOR', selecionado: false },
      ],
    },
    {
      id: 7,
      descricao: 'Item - Critérios de Medição e Pagamento',
      icon: '▼',
      expanded: true,
      attributes: [
        { id: 23, descricao: 'CRITÉRIOS DE MEDIÇÃO', selecionado: false },
        { id: 24, descricao: 'FORMA DE PAGAMENTO', selecionado: false },
      ],
    },
  ])

  const attributes = computed<ITipoCapituloDTO[]>(() => {
    return agrupamentos.value.flatMap((category) => category.attributes)
  })

  // Getters
  const totalAttributes = computed(() => attributes.value.length)

  const totalSelected = computed(() => attributes.value.filter((attr) => attr.selecionado).length)

  const totalUnselected = computed(() => totalAttributes.value - totalSelected.value)

  const getAttributesByCategory = (categoryId: number) => {
    const category = agrupamentos.value.find((cat) => cat.id === categoryId)
    return category ? category.attributes : []
  }

  const getSelectedCountByCategory = (categoryId: number) => {
    return getAttributesByCategory(categoryId).filter((attr) => attr.selecionado).length
  }

  const getTotalCountByCategory = (categoryId: number) => {
    return getAttributesByCategory(categoryId).length
  }

  const getVisibleAttributesByCategory = (categoryId: number) => {
    let attrs = getAttributesByCategory(categoryId)

    // Apply search filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      attrs = attrs.filter((attr) => attr.descricao.toLowerCase().includes(query))
    }

    // Apply selection filter
    if (filterType.value === 'selecionados') {
      attrs = attrs.filter((attr) => attr.selecionado)
    } else if (filterType.value === 'naoSelecionados') {
      attrs = attrs.filter((attr) => !attr.selecionado)
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
    return agrupamentos.value.filter((cat) => isCategoryVisible(cat.id))
  })

  // Actions
  const toggleAttribute = (attributeId: number) => {
    for (const category of agrupamentos.value) {
      const attr = category.attributes.find((attribute) => attribute.id === attributeId)
      if (attr) {
        attr.selecionado = !attr.selecionado
        return
      }
    }
  }

  const toggleCategory = (categoryId: number) => {
    const category = agrupamentos.value.find((c) => c.id === categoryId)
    if (category) {
      category.expanded = !category.expanded
      category.icon = category.expanded ? '▼' : '▶'
    }
  }

  const toggleAllCategories = (expand: boolean) => {
    agrupamentos.value.forEach((c) => {
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
    agrupamentos.value.forEach((category) => {
      category.attributes.forEach((attr) => {
        attr.selecionado = false
      })
    })
  }

  const submitForm = () => {
    const selectedAttributes = attributes.value
      .filter((attr) => attr.selecionado)
      .map((attr) => ({ id: attr.id, descricao: attr.descricao }))

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
    categories: agrupamentos,
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
