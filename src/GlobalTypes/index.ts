export interface TypeSpending {
  id?: number;
  type?: 'CREDIT' | 'BILLET' | 'MONEY';
  operation?: 'NEGATIVE' | 'POSITIVE';
  description?: string;
  full_description?: string;
  value?: number;
  created?: Date;
}

export interface TypeBalance {
  id: number;
  type: string;
  value: number;
  description: string;
  created: Date;
}

export interface TypeAccount {
  id: number;
  name: string;
  bank: string;
  value: number;
  type: string;
  description: string;
  created: Date;
}

export interface TypeConfig {
  id?: number;
  currAccount: string;
}
