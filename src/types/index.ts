export interface Attribute {
  id: number
  name: string
  selected: boolean
}

export interface Category {
  id: number
  name: string
  icon: string
  expanded: boolean
  attributes: Attribute[]
}

export type FilterType = 'all' | 'selected' | 'unselected'

export interface TermoReferencia {
  titulo: string
  tipo: string
}
