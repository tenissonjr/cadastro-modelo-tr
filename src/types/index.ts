export interface Attribute {
  id: string
  name: string
  categoryId: string
  selected: boolean
}

export interface Category {
  id: string
  name: string
  icon: string
  expanded: boolean
}

export type FilterType = 'all' | 'selected' | 'unselected'

export interface TermoReferencia {
  titulo: string
  tipo: string
}
