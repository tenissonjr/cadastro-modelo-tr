import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ITipoCapituloDTO, IAgrupamentoAtributoDTO, TipoFiltroAtributo, TermoReferencia } from '@/types'
import {
  createInitialAgrupamentos,
  createInitialTermoReferencia,
} from '@/modules/modelotermoreferencia/mocks/atualizacaoAtributosModeloTermoReferenciaInitialState'

export const useAtualizacaoAtributosModeloTermoReferenciaStore = defineStore('useAtualizacaoAtributosModeloTermoReferenciaStore', () => {
  // State
  const termoReferencia = ref<TermoReferencia>(createInitialTermoReferencia())

  const descricaoPesquisa = ref('')
  const tipoFiltroAtributo = ref<TipoFiltroAtributo>('todos')

  const agrupamentos = ref<IAgrupamentoAtributoDTO[]>(createInitialAgrupamentos())

  const tiposCapitulo = computed<ITipoCapituloDTO[]>(() => {
    return agrupamentos.value.flatMap((agrupamento) => agrupamento.tiposCapitulo)
  })

  const agrupamentoPorId = computed(() => {
    const map = new Map<number, IAgrupamentoAtributoDTO>()
    for (const agrupamento of agrupamentos.value) {
      map.set(agrupamento.id, agrupamento)
    }
    return map
  })

  const atributoPorId = computed(() => {
    const map = new Map<number, ITipoCapituloDTO>()
    for (const agrupamento of agrupamentos.value) {
      for (const atributo of agrupamento.tiposCapitulo) {
        map.set(atributo.id, atributo)
      }
    }
    return map
  })

  // Getters
  const totalAtributos = computed(() => tiposCapitulo.value.length)

  const totalAtributosSelecionados = computed(() => tiposCapitulo.value.filter((attr) => attr.selecionado).length)

  const totalAtributosNaoSelecionados = computed(() => totalAtributos.value - totalAtributosSelecionados.value)

  const getAtributosPorAgrupamento = (agrupamentoId: number) => {
    return agrupamentoPorId.value.get(agrupamentoId)?.tiposCapitulo ?? []
  }

  const getAtributosSelecionadosPorAgrupamento = (agrupamentoId: number) => {
    return getAtributosPorAgrupamento(agrupamentoId).filter((atributo) => atributo.selecionado).length
  }

  const getTotalAtributosPorAgrupamento = (agrupamentoId: number) => {
    return getAtributosPorAgrupamento(agrupamentoId).length
  }

  const atributosVisiveisPorAgrupamento = computed(() => {
    const query = descricaoPesquisa.value.trim().toLowerCase()
    const filtro = tipoFiltroAtributo.value

    const matchesFiltro = (selecionado: boolean): boolean => {
      if (filtro === 'selecionados') {
        return selecionado
      }

      if (filtro === 'naoSelecionados') {
        return !selecionado
      }

      return true
    }

    const resultado = new Map<number, ITipoCapituloDTO[]>()

    for (const agrupamento of agrupamentos.value) {
      const atributos = agrupamento.tiposCapitulo.filter((atributo) => {
        const matchesBusca = !query || atributo.descricao.toLowerCase().includes(query)
        const matchesSelecao = matchesFiltro(atributo.selecionado)

        return matchesBusca && matchesSelecao
      })

      resultado.set(agrupamento.id, atributos)
    }

    return resultado
  })

  const getAtributosVisiveisPorAgrupamento = (agrupamentoId: number) => {
    return atributosVisiveisPorAgrupamento.value.get(agrupamentoId) ?? []
  }

  const getTotalAtributosVisiveisPorAgrupamento = (agrupamentoId: number) => {
    return getAtributosVisiveisPorAgrupamento(agrupamentoId).length
  }

  const isAgrupamentoVisivel = (agrupamentoId: number) => {
    return getTotalAtributosVisiveisPorAgrupamento(agrupamentoId) > 0
  }

  const agrupamentosVisiveis = computed(() => {
    return agrupamentos.value.filter((agrupamento) => {
      return (atributosVisiveisPorAgrupamento.value.get(agrupamento.id)?.length ?? 0) > 0
    })
  })

  // Actions
  const toggleAtributo = (idAtributo: number) => {
    const atributo = atributoPorId.value.get(idAtributo)
    if (!atributo) {
      return
    }

    atributo.selecionado = !atributo.selecionado
  }

  const toggleAgrupamento = (idAgrupamento: number) => {
    const agrupamento = agrupamentoPorId.value.get(idAgrupamento)
    if (!agrupamento) {
      return
    }

    agrupamento.expanded = !agrupamento.expanded
  }

  const toggleTodosAgrupamentos = (expand: boolean) => {
    agrupamentos.value.forEach((c) => {
      c.expanded = expand
    })
  }

  const setDescricaoPesquisa = (descricaoPesquisaParam: string) => {
    descricaoPesquisa.value = descricaoPesquisaParam
  }

  const limparPesquisa = () => {
    descricaoPesquisa.value = ''
  }

  const setTipoFiltroAtributo = (tipoFiltroAtributoParam: TipoFiltroAtributo) => {
    tipoFiltroAtributo.value = tipoFiltroAtributoParam
  }

  const resetForm = () => {
    termoReferencia.value = createInitialTermoReferencia()
    agrupamentos.value = createInitialAgrupamentos()
  }

  type SubmitFormPayload = TermoReferencia & {
    attributes: Array<{ id: number; descricao: string }>
  }

  const buildSubmitPayload = (): SubmitFormPayload => {
    const attributes = tiposCapitulo.value
      .filter((atributo) => atributo.selecionado)
      .map((atributo) => ({ id: atributo.id, descricao: atributo.descricao }))

    return {
      ...termoReferencia.value,
      attributes,
    }
  }

  const submitForm = (): SubmitFormPayload => {
    return buildSubmitPayload()
  }

  return {
    // State
    termoReferencia,
    descricaoPesquisa,
    tipoFiltroAtributo,
    agrupamentos,
    tiposCapitulo,

    // Getters
    totalAtributos,
    totalAtributosSelecionados,
    totalAtributosNaoSelecionados,
    agrupamentosVisiveis,
    getAtributosPorAgrupamento,
    getAtributosSelecionadosPorAgrupamento,
    getTotalAtributosPorAgrupamento,
    getAtributosVisiveisPorAgrupamento,
    getTotalAtributosVisiveisPorAgrupamento,
    isAgrupamentoVisivel,

    // Actions
    toggleAtributo,
    toggleAgrupamento,
    toggleTodosAgrupamentos,
    setDescricaoPesquisa,
    limparPesquisa,
    setTipoFiltroAtributo,
    resetForm,
    submitForm,
  }
})
