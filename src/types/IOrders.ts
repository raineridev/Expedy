interface IOrder extends Document {
  idERP_Order: number
  integracao: {
    id: string
    name: string
    tipo: string
    codigoErp?: string
    nomeNotaFiscal?: string
    configEtiqueta?: Record<string, any>
  }
  observation?: string
  company: string
  status_hub: string
  status?: string
  point_sale?: string
  shipment?: string
  shipment_value?: number
  gerando_arquivo?: boolean
  orderid: string
  shipmentControl?: {
    orderNumber?: string
    idTrack?: string
    operadorLogistico?: {
      idERP_Logistica?: number
      tipo?: string
      descricao?: string
    }
  }
  shipmentStatus?: string
  carrinho: any[]
  pack_id?: string
  partial_total?: number
  taxes?: number
  fullfillment?: boolean
  flex?: boolean
  discount?: number
  date?: Date
  dayToShip?: Date | null
  have_message?: boolean
  customer_id?: string
  point_sale_id?: string
  installment?: number
  total?: number
  numeroPedidoLoja?: string
  numeroBling?: string
  erroPedidoDrop?: string
  NotaFiscal?: {
    tipo?: string
    xml_path?: string
    danfe_path?: string
    numero?: string
    serie?: string
    dados?: Record<string, any>
  }
  marketplace?: {
    id?: string
    tipo?: string
    nome?: string
  }
  Customer?: {
    id?: string
    name?: string
    rg?: string
    cpf?: string
    cnpj?: string
    phone?: string
    cellphone?: string
    birth_date?: Date
    gender?: string
    email?: string
    type?: string
    company_name?: string
    state_inscription?: string
    CustomerAddresses?: {
      id?: string
      customer_id?: string
      address?: string
      number?: string
      complement?: string
      neighborhood?: string
      city?: string
      state?: string
      zip_code?: string
      country?: string
      type?: string
      description?: string
      recipient?: string
    }[]
  }
  ProductsSold: {
    id?: string
    order_id?: string
    product_kit_id?: string
    reference?: string
    original_name?: string
    database_name?: string
    tax_name?: string
    price?: number
    quantity?: number
    product_id?: string
    variant_id?: string
    variacao?: string
    format?: string
    composicaoKit?: any[]
    produtoAlterado?: boolean
    idFornecedor?: number | null
    idDepositoDrop?: number | null
    idERP_Grupo?: number | null
    gift?: boolean
  }[]
  ItemsCancelled: {
    id?: string
    order_id?: string
    product_kit_id?: string
    reference?: string
    original_name?: string
    database_name?: string
    tax_name?: string
    price?: number
    quantity?: number
    product_id?: string
    variant_id?: string
    variacao?: string
    produtoAlterado?: boolean
  }[]
  Payment?: {
    date?: string
    id?: string
    method?: string
    note?: string
    payment_place?: string
    value?: string
    installment?: number
  }[]
  pedidoAgendado?: boolean
  pedidoAgendadoData?: Date
  pedidoFinalizado?: Date
  erroEtiqueta?: string
  caminhoEtiqueta?: string
  dataEtiqueta?: Date
  etiqueta?: boolean
  statusNotaMarketplace?: boolean
  statusNota?: boolean
  erroNota?: string
  infoNota?: string
  notaAutomatica?: boolean
  tentativaNota?: number
  tentativaEtiqueta?: number
  Mensagens?: any[]
  transportadora?: {
    idERP_transportadora?: number
    name?: string
  }
  pesoBruto?: number
  pesoLiquido?: number
  qtdadeVolume?: number
  especieVolume?: string
  log?: {
    tipo?: string
    usuario?: string
    before?: Record<string, any>
  }[]
  list?: {
    idERP_File?: number
    usuario?: string
    createdAt?: Date
  }
}
