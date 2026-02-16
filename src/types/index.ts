export interface ITipoCapituloDTO {
  id: number
  descricao: string
  selecionado: boolean
}

export interface IAgrupamentoAtributoDTO {
  id: number
  descricao: string
  expanded: boolean
  tiposCapitulo: ITipoCapituloDTO[]
}

export type TipoFiltroAtributo = 'todos' | 'selecionados' | 'naoSelecionados'

export interface TermoReferencia {
  titulo: string
  tipo: string
}
