export interface Attribute {
  id: number
  name: string
  categoryId: number
  selected: boolean
}

export interface Category {
  id: number
  name: string
  icon: string
  expanded: boolean
}

export type FilterType = 'all' | 'selected' | 'unselected'

export interface TermoReferencia {
  titulo: string
  tipo: string
}
