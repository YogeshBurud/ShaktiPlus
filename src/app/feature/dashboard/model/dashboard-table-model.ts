export interface CarModel {
  id: number;
  name: string;
}

export interface DashboardTableData {
  partNumber: string;
  partName: string;
  carsModel: CarModel[];
  totalQuantity: number;
  availableQuantity: number;
  sellOutQuantity: number;
  price: number;
}