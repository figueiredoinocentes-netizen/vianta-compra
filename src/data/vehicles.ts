export type Transmission = "Automático" | "Manual";
export type Fuel = "Elétrico" | "Híbrido" | "Gasolina" | "Diesel";

export interface Vehicle {
  id: string;
  model: string;
  year: number;
  transmission: Transmission;
  fuel: Fuel;
  fuelLabel?: string;
  salePrice: number;
  mileage: number;
  imageUrl: string;
  specs: string[];
  seats: number;
  categories?: string[];
  availableFrom?: string;
}

export const vehicles: Vehicle[] = [
  {
    id: "peugeot-e2008",
    model: "Peugeot e2008",
    year: 2024,
    transmission: "Automático",
    fuel: "Elétrico",
    salePrice: 28500,
    mileage: 10000,
    imageUrl: "/images/peugeot-e2008.png",
    specs: [],
    seats: 5,
    categories: ["Comfort", "Eletric", "Green"],
  },
  {
    id: "byd-ato3-design",
    model: "BYD Ato 3 Design",
    year: 2023,
    transmission: "Automático",
    fuel: "Elétrico",
    salePrice: 29000,
    mileage: 10000,
    imageUrl: "/placeholder.svg",
    specs: [],
    seats: 5,
    categories: ["Comfort", "Eletric", "Green"],
    availableFrom: "25/03/2026",
  },
];
