export type OrderReportFilters = {
  startPeriod?: string;
  endPeriod?: string;
  status_hub?: string;
  integration?: string;
  total?: string;
  [key: string]: string | undefined;
};

export type OrderReportData = {
  total: number;
  date: Date;
  status_hub: string;
  shipment_value: number;
  integracao_name: string;
  product: string;
};

export type OrderReportStatistics = {
  totalDocuments: number;
  totalShipmentValue: number;
  totalOrderValue: number;
  totalProfit: number;
};


export type FilterConfig = {
  tag: string;
  type: 'string' | 'number' | 'date';
};

export type ExcelColumnDefinition = {
  header: string;
  key: string;
  width: number;
  style?: {
    alignment?: {
      horizontal?: string;
      vertical?: string;
    };
  };
  fill?: {
    type: string;
    pattern: string;
    fgColor: {
      argb: string;
    };
  };
};

export type ExcelFooter = {
  [key: string]: {
    value: number | string;
    style?: any;
  }
}