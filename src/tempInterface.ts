export interface Temp {
  Metric: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  Imperial: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
}

export type TempObj = "Metric" | "Imperial";
