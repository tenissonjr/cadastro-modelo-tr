export interface ITipoCapituloDTO {
  id: number
  descricao: string
  selecionado: boolean
}

export interface IAgrupamentoAtributoDTO {
  id: number
  descricao: string
  icon: string
  expanded: boolean
  attributes: ITipoCapituloDTO[]
}

export type FilterType = 'todos' | 'selecionados' | 'naoSelecionados'

export interface TermoReferencia {
  titulo: string
  tipo: string
}
