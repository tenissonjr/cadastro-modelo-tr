import type { IAgrupamentoAtributoDTO, TermoReferencia } from '@/types'

export const createInitialTermoReferencia = (): TermoReferencia => ({
  titulo: '',
  tipo: 'aquisicao',
})

export const createInitialAgrupamentos = (): IAgrupamentoAtributoDTO[] => [
  {
    id: 1,
    descricao: 'Informações Iniciais',
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
    expanded: true,
    tiposCapitulo: [
      { id: 23, descricao: 'CRITÉRIOS DE MEDIÇÃO', selecionado: false },
      { id: 24, descricao: 'FORMA DE PAGAMENTO', selecionado: false },
    ],
  },
]
