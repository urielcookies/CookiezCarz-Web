interface CarInformation {
  Id: number;
  Brand: string;
  CleanTitle: boolean;
  Cost: number;
  Model: string;
  Notes: string;
  UserAccountId: number;
  Year: number;
}

interface CarExpense {
  Id: number;
  CarInformationId: number;
  Cost: number;
  CreatedTime: Date;
  Expense: string;
  UserAccountId: number;
}

interface CarStatus {
  Id: number;
  CarInformationId: number;
  CreatedTime: Date;
  PriceSold: number;
  Sold: boolean;
  UserAccountId: number;
}

export type { CarInformation, CarExpense, CarStatus };
