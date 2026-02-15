import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ITipoCapituloDTO, IAgrupamentoAtributoDTO, TipoFiltroAtributo, TermoReferencia } from '@/types'

export const useAtualizacaoAtributosModeloTermoReferenciaStore = defineStore('useAtualizacaoAtributosModeloTermoReferenciaStore', () => {
  // State
  const termoReferencia = ref<TermoReferencia>({
    titulo: '',
    tipo: 'aquisicao',
  })

  const descricaoPesquisa = ref('')
  const tipoFiltroAtributo = ref<TipoFiltroAtributo>('todos')

  const agrupamentos = ref<IAgrupamentoAtributoDTO[]>([
    {
      id: 1,
      descricao: 'Informações Iniciais',
      icon: '▼',
      expanded: true,
      tiposCapitulo: [
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
      tiposCapitulo: [
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
      tiposCapitulo: [
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
      tiposCapitulo: [
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
      tiposCapitulo: [
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
      tiposCapitulo: [
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
      tiposCapitulo: [
        { id: 23, descricao: 'CRITÉRIOS DE MEDIÇÃO', selecionado: false },
        { id: 24, descricao: 'FORMA DE PAGAMENTO', selecionado: false },
      ],
    },
  ])

  const tiposCapitulo = computed<ITipoCapituloDTO[]>(() => {
    return agrupamentos.value.flatMap((agrupamento) => agrupamento.tiposCapitulo)
  })

  // Getters
  const totalAtributos = computed(() => tiposCapitulo.value.length)

  const totalAtributosSelecionados = computed(() => tiposCapitulo.value.filter((attr) => attr.selecionado).length)

  const totalAtributosNaoSelecionados = computed(() => totalAtributos.value - totalAtributosSelecionados.value)

  const getAtributosPorAgrupamento = (agrupamentoId: number) => {
    const agrupamento = agrupamentos.value.find((agrupamento) => agrupamento.id === agrupamentoId)
    return agrupamento ? agrupamento.tiposCapitulo : []
  }

  const getAtributosSelecionadosPorAgrupamento = (agrupamentoId: number) => {
    return getAtributosPorAgrupamento(agrupamentoId).filter((atributo) => atributo.selecionado).length
  }

  const getTotalAtributosPorAgrupamento = (agrupamentoId: number) => {
    return getAtributosPorAgrupamento(agrupamentoId).length
  }

  const getAtributosVisiveisPorAgrupamento = (agrupamentoId: number) => {
    let attrs = getAtributosPorAgrupamento(agrupamentoId)

    // Apply search filter
    if (descricaoPesquisa.value) {
      const query = descricaoPesquisa.value.toLowerCase()
      attrs = attrs.filter((attr) => attr.descricao.toLowerCase().includes(query))
    }

    // Apply selection filter
    if (tipoFiltroAtributo.value === 'selecionados') {
      attrs = attrs.filter((attr) => attr.selecionado)
    } else if (tipoFiltroAtributo.value === 'naoSelecionados') {
      attrs = attrs.filter((attr) => !attr.selecionado)
    }

    return attrs
  }

  const getTotalAtributosVisiveisPorAgrupamento = (agrupamentoId: number) => {
    return getAtributosVisiveisPorAgrupamento(agrupamentoId).length
  }

  const isAgrupamentoVisivel = (agrupamentoId: number) => {
    return getTotalAtributosVisiveisPorAgrupamento(agrupamentoId) > 0
  }

  const agrupamentosVisiveis = computed(() => {
    return agrupamentos.value.filter((cat) => isAgrupamentoVisivel(cat.id))
  })

  // Actions
  const toggleAtributo = (idAtributo: number) => {
    for (const agrupamento of agrupamentos.value) {
      const atributo = agrupamento.tiposCapitulo.find((atributo) => atributo.id === idAtributo)
      if (atributo) {
        atributo.selecionado = !atributo.selecionado
        return
      }
    }
  }

  const toggleAgrupamento = (idAgrupamento: number) => {
    const agrupamento = agrupamentos.value.find((c) => c.id === idAgrupamento)
    if (agrupamento) {
      agrupamento.expanded = !agrupamento.expanded
      agrupamento.icon = agrupamento.expanded ? '▼' : '▶'
    }
  }

  const toggleTodosAgrupamentos = (expand: boolean) => {
    agrupamentos.value.forEach((c) => {
      c.expanded = expand
      c.icon = expand ? '▼' : '▶'
    })
  }

  const setDescricaoPesquisa = (query: string) => {
    descricaoPesquisa.value = query
  }

  const limparPesquisa = () => {
    descricaoPesquisa.value = ''
  }

  const setTipoFiltroAtributo = (type: TipoFiltroAtributo) => {
    tipoFiltroAtributo.value = type
  }

  const resetForm = () => {
    termoReferencia.value = {
      titulo: '',
      tipo: 'aquisicao',
    }
    agrupamentos.value.forEach((category) => {
      category.tiposCapitulo.forEach((attr) => {
        attr.selecionado = false
      })
    })
  }

  const submitForm = () => {
    const selectedAttributes = tiposCapitulo.value
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
    searchQuery: descricaoPesquisa,
    filterType: tipoFiltroAtributo,
    categories: agrupamentos,
    attributes: tiposCapitulo,

    // Getters
    totalAttributes: totalAtributos,
    totalSelected: totalAtributosSelecionados,
    totalUnselected: totalAtributosNaoSelecionados,
    visibleCategories: agrupamentosVisiveis,
    getAttributesByCategory: getAtributosPorAgrupamento,
    getSelectedCountByCategory:getAtributosSelecionadosPorAgrupamento,
    getTotalCountByCategory: getTotalAtributosPorAgrupamento,
    getVisibleAttributesByCategory: getAtributosVisiveisPorAgrupamento,
    getVisibleCountByCategory: getTotalAtributosVisiveisPorAgrupamento,
    isCategoryVisible: isAgrupamentoVisivel,

    // Actions
    toggleAttribute: toggleAtributo,
    toggleCategory: toggleAgrupamento,
    toggleAllCategories: toggleTodosAgrupamentos,
    setDescricaoPesquisa: setDescricaoPesquisa,
    limparPesquisa: limparPesquisa,
    setTipoFiltroAtributo: setTipoFiltroAtributo,
    resetForm: resetForm,
    submitForm,
  }
})
