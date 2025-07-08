import { Schema, Document, Model } from 'mongoose'
import  orderConnection from '../db';

const orderSchema = new Schema<IOrder>(
  {
    idERP_Order: { type: Number },
    integracao: {
      id: String,
      name: String,
      tipo: String,
      codigoErp: { type: String, default: '' },
      nomeNotaFiscal: String,
      configEtiqueta: {}
    },
    observation: String,
    company: String,
    status_hub: { type: String, required: true },
    status: String,
    point_sale: String,
    shipment: String,
    shipment_value: Number,
    gerando_arquivo: { type: Boolean, default: false },
    orderid: { type: String, required: true },
    shipmentControl: {
      orderNumber: String,
      idTrack: String,
      operadorLogistico: {
        idERP_Logistica: Number,
        tipo: String,
        descricao: String
      }
    },
    shipmentStatus: String,
    carrinho: [],
    pack_id: String,
    partial_total: Number,
    taxes: Number,
    fullfillment: Boolean,
    flex: { type: Boolean, default: false },
    discount: Number,
    date: Date,
    dayToShip: { type: Date, default: null },
    have_message: Boolean,
    customer_id: String,
    point_sale_id: String,
    installment: Number,
    total: Number,
    numeroPedidoLoja: String,
    numeroBling: String,
    erroPedidoDrop: String,
    NotaFiscal: {
      tipo: String,
      xml_path: String,
      danfe_path: String,
      numero: String,
      serie: String,
      dados: {}
    },
    marketplace: {
      id: String,
      tipo: String,
      nome: String
    },
    Customer: {
      id: String,
      name: String,
      rg: String,
      cpf: String,
      cnpj: String,
      phone: String,
      cellphone: String,
      birth_date: Date,
      gender: String,
      email: String,
      type: { type: String },
      company_name: String,
      state_inscription: String,
      CustomerAddresses: [
        {
          id: String,
          customer_id: String,
          address: String,
          number: String,
          complement: String,
          neighborhood: String,
          city: String,
          state: String,
          zip_code: String,
          country: String,
          type: { type: String },
          description: String,
          recipient: String
        }
      ]
    },
    ProductsSold: [
      {
        id: String,
        order_id: String,
        product_kit_id: String,
        reference: String,
        original_name: String,
        database_name: String,
        tax_name: String,
        price: Number,
        quantity: Number,
        product_id: String,
        variant_id: String,
        variacao: String,
        format: String,
        composicaoKit: [],
        produtoAlterado: { type: Boolean, default: false },
        idFornecedor: { type: Number, default: null },
        idDepositoDrop: { type: Number, default: null },
        idERP_Grupo: { type: Number, default: null },
        gift: { type: Boolean, default: false }
      }
    ],
    ItemsCancelled: [
      {
        id: String,
        order_id: String,
        product_kit_id: String,
        reference: String,
        original_name: String,
        database_name: String,
        tax_name: String,
        price: Number,
        quantity: Number,
        product_id: String,
        variant_id: String,
        variacao: String,
        produtoAlterado: { type: Boolean, default: false }
      }
    ],
    Payment: [
      {
        date: String,
        id: String,
        method: String,
        note: String,
        payment_place: String,
        value: String,
        installment: Number
      }
    ],
    pedidoAgendado: { type: Boolean, default: false },
    pedidoAgendadoData: Date,
    pedidoFinalizado: Date,
    erroEtiqueta: { type: String, default: '' },
    caminhoEtiqueta: { type: String, default: '' },
    dataEtiqueta: Date,
    etiqueta: { type: Boolean, default: false },
    statusNotaMarketplace: { type: Boolean, default: false },
    statusNota: { type: Boolean, default: false },
    erroNota: { type: String, default: '' },
    infoNota: { type: String, default: '' },
    notaAutomatica: { type: Boolean, default: false },
    tentativaNota: { type: Number, default: 0 },
    tentativaEtiqueta: { type: Number, default: 0 },
    Mensagens: [],
    transportadora: {
      idERP_transportadora: Number,
      name: String
    },
    pesoBruto: Number,
    pesoLiquido: Number,
    qtdadeVolume: Number,
    especieVolume: { type: String, default: 'PC' },
    log: [
      {
        tipo: String,
        usuario: String,
        before: {}
      }
    ],
    list: {
      idERP_File: Number,
      usuario: String,
      createdAt: Date
    }
  },
  { timestamps: true, minimize: false }
)

const Order: Model<IOrder> = orderConnection.model<IOrder>('Order', orderSchema)

export default Order