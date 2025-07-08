import { Schema, Document, Model } from 'mongoose'
import  productConnection from '../db';

interface ISKU {
  sku: string
  ean?: string
  marketplace?: string
}

interface IComposicao {
  idERP_Product: number
  name: string
  quantity: number
  reference: string
  ean: string
}

interface IComposicaoKit {
  name: string
  productId: string
  quantity: number
  porcentagemValor: number
  price: number
  reference: string
  ean: string
  stock: number
}

interface ICorrelacao {
  anuncio: string
  anuncioVariacao: string
  integracao: number
  produto_id: string
  variacao_id: string
  attEstoque: boolean
}

interface IAtributo {
  key: string
  value: string
}

interface IProduto {
  idERP_Product: number
  skus: ISKU[]
  idERP_Grupo?: number
  composicao: IComposicao[]
  format: 'SIMPLES' | 'COM VARIACAO' | 'KIT' | 'COMPOSICAO'
  composicaoKit: IComposicaoKit[]
  volumes?: {
    quantidade?: number
    descricao?: { nome: string }[]
  }
  idProdutoPai?: string | null
  atributos?: IAtributo[]
  condition?: 'NOVO' | 'USADO'
  production?: 'P - Produção própria' | 'T - Produção de terceiros'
  free_shipping?: boolean
  tributacao?: {
    origem?: string
    ncm?: string
    cest?: string
    tipo_item?: string
    porcentagem_tributos?: number
    icms?: {
      icms_base_retencao?: string
      icms_retencao?: string
      icms_substituto?: string
    }
    tipi?: string
    pis?: string
    cofins?: string
  }
  company?: string
  ean?: string
  reference: string
  status?: boolean
  name: string
  tax_name?: string
  ncm?: string
  description?: string
  price: number
  cost_price?: number
  promotional_price?: number
  brand?: string
  model?: string
  weight?: number
  peso_bruto?: number
  length?: number
  width?: number
  height?: number
  vitrine?: number
  stock?: number
  estoque?: {
    min: number
    max: number
  }
  localization?: string
  category?: string
  category_id?: number
  availability_days?: number
  ipi_value?: number
  correlacoes: ICorrelacao[]
  b2w?: {
    atributos: {
      id: string
      value_id: string
      value_name: string
    }[]
  }
  mercadolivre?: {
    categoria: {
      id: string
      name: string
    }
    atributos: {
      atributo_id: string
      atributo_name: string
      value_id: string
      value_name: string
      tipo: string
    }[]
  }
  shopee?: {
    categoria: {
      id: string
      name: string
    }
    atributos: {
      atributo_id: string
      atributo_name: string
      label: {
        value_id: string
        original_value_name: string
        display_value_name: string
      }
      labelText: string
      tipo: string
    }[]
  }
  magalu?: {
    categoria: {
      id: string
      name: string
      parentId: string
    }
  }
  madeira?: {
    categoria: {
      id: string
      name: string
    }
  }
  yampi?: {
    marca: number
    categoria: {
      id: number
      name: string
    }
  }
  aliexpress?: {
    categoria: {
      id: string
      name: string
    }
  }
  netshoes?: {
    marca: string
    department: string
    productType: string
    gender: string
  }
  dafiti?: {
    marca: string
    categoria: {
      id: string
      name: string
    }
    atributos: {
      atributo_id: string
      value_id: string
      value_name: string
    }[]
  }
  viavarejo?: {
    categoria: {
      id: number
      name: string
    }
    atributos: {
      udaId: string
      udaName: string
      udaValue: string
    }[]
  }
  tray?: {
    categoria: {
      id: number
      name: string
    }
  }
  frete_olist?: boolean
  package_measures?: {
    height_unit: string
    height_value: string
    length_unit: string
    length_value: string
    weight_unit: string
    weight_value: string
    width_unit: string
    width_value: string
    capacity: number
  }
  pictures?: {
    ordem: string
    url: string
    url_shopee: string
    id_shopee: string
  }[]
  video_url?: string
  warranty?: string
  log?: any[]
}

const produtoSchema = new Schema<IProduto>(
  {
    idERP_Product: Number,
    skus: [
      {
        sku: { type: String, required: true },
        ean: String,
        marketplace: String
      }
    ],
    idERP_Grupo: Number,
    composicao: [
      {
        idERP_Product: Number,
        name: String,
        quantity: Number,
        reference: String,
        ean: String
      }
    ],
    format: {
      type: String,
      enum: ['SIMPLES', 'COM VARIACAO', 'KIT', 'COMPOSICAO'],
      default: 'SIMPLES'
    },
    composicaoKit: [
      {
        name: String,
        productId: String,
        quantity: Number,
        porcentagemValor: Number,
        price: Number,
        reference: String,
        ean: String,
        stock: { type: Number, default: 0 }
      }
    ],
    volumes: {
      quantidade: Number,
      descricao: [{ nome: String }]
    },
    idProdutoPai: { type: String, default: null },
    atributos: [{ key: String, value: String }],
    condition: {
      type: String,
      enum: ['NOVO', 'USADO'],
      default: 'NOVO'
    },
    production: {
      type: String,
      enum: ['P - Produção própria', 'T - Produção de terceiros']
    },
    free_shipping: Boolean,
    tributacao: {
      origem: {
        type: String,
        enum: [
          '0 - Nacional',
          '1 - Estrangeira Importação direta',
          '2 - Estrangeira Adquirida no mercado interno',
          '3 - Nacional Conteúdo Importação Superior a 40% e inferior ou igual a 70%',
          '4 - Nacional Prod. Conf. Proc. Legislação',
          '5 - Nacional Conteúdo Importação Inferior a 40%',
          '6 - Estrangeira Importação direta, sem Similar nacional, na lista CAMEX e gás natural',
          '7 - Estrangeira Adquirida Mercado Interno sem Similar nacional, na lista CAMEX e gás natural',
          '8 - Nacional Conteúdo Importação superior a 70%'
        ]
      },
      ncm: String,
      cest: String,
      tipo_item: String,
      porcentagem_tributos: Number,
      icms: {
        icms_base_retencao: String,
        icms_retencao: String,
        icms_substituto: String
      },
      tipi: String,
      pis: String,
      cofins: String
    },
    company: String,
    ean: String,
    reference: { type: String, required: true },
    status: { type: Boolean, default: true },
    name: { type: String, required: true },
    tax_name: { type: String, default: '' },
    ncm: String,
    description: String,
    price: { type: Number, required: true },
    cost_price: Number,
    promotional_price: Number,
    brand: String,
    model: String,
    weight: Number,
    peso_bruto: Number,
    length: Number,
    width: Number,
    height: Number,
    vitrine: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    estoque: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 0 }
    },
    localization: String,
    category: String,
    category_id: Number,
    availability_days: Number,
    ipi_value: Number,
    correlacoes: [
      {
        anuncio: String,
        anuncioVariacao: String,
        integracao: Number,
        produto_id: String,
        variacao_id: String,
        attEstoque: { type: Boolean, default: false }
      }
    ],
    b2w: {
      atributos: [{ id: String, value_id: String, value_name: String }]
    },
    mercadolivre: {
      categoria: { id: String, name: String },
      atributos: [
        {
          atributo_id: String,
          atributo_name: String,
          value_id: String,
          value_name: String,
          tipo: String
        }
      ]
    },
    shopee: {
      categoria: { id: String, name: String },
      atributos: [
        {
          atributo_id: String,
          atributo_name: String,
          label: {
            value_id: String,
            original_value_name: String,
            display_value_name: String
          },
          labelText: String,
          tipo: String
        }
      ]
    },
    magalu: {
      categoria: {
        id: String,
        name: String,
        parentId: String
      }
    },
    madeira: {
      categoria: { id: String, name: String }
    },
    yampi: {
      marca: Number,
      categoria: {
        id: Number,
        name: String
      }
    },
    aliexpress: {
      categoria: { id: String, name: String }
    },
    netshoes: {
      marca: String,
      department: String,
      productType: String,
      gender: String
    },
    dafiti: {
      marca: String,
      categoria: { id: String, name: String },
      atributos: [
        { atributo_id: String, value_id: String, value_name: String }
      ]
    },
    viavarejo: {
      categoria: { id: Number, name: String },
      atributos: [
        { udaId: String, udaName: String, udaValue: String }
      ]
    },
    tray: {
      categoria: { id: Number, name: String }
    },
    frete_olist: Boolean,
    package_measures: {
      height_unit: String,
      height_value: String,
      length_unit: String,
      length_value: String,
      weight_unit: String,
      weight_value: String,
      width_unit: String,
      width_value: String,
      capacity: { type: Number, default: 1 }
    },
    pictures: [
      {
        ordem: String,
        url: String,
        url_shopee: String,
        id_shopee: String
      }
    ],
    video_url: String,
    warranty: String,
    log: []
  },
  { timestamps: true, minimize: false }
)


const Produto: Model<IProduto> = productConnection.model<IProduto>('Produto', produtoSchema)

export default Produto
