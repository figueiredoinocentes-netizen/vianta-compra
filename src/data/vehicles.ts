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
}

export const vehicles: Vehicle[] = [
  {
    id: "tesla-model-3",
    model: "Tesla Model 3",
    year: 2022,
    transmission: "Automático",
    fuel: "Elétrico",
    salePrice: 28900,
    mileage: 65000,
    imageUrl: "/images/tesla-model-3.jpg",
    specs: [],
    seats: 5,
    categories: ["Comfort", "Eletric", "Green"],
  },
  {
    id: "tesla-model-3-dualmotor",
    model: "Tesla Model 3 Dualmotor",
    year: 2020,
    transmission: "Automático",
    fuel: "Elétrico",
    salePrice: 26500,
    mileage: 95000,
    imageUrl: "/images/tesla-model-3-dualmotor.jpg",
    specs: [],
    seats: 5,
    categories: ["Comfort", "Eletric", "Green"],
  },
  {
    id: "seat-leon",
    model: "Seat Leon",
    year: 2020,
    transmission: "Manual",
    fuel: "Diesel",
    fuelLabel: "Gasóleo/Diesel",
    salePrice: 15900,
    mileage: 120000,
    imageUrl: "/images/seat-leon.jpg",
    specs: [],
    seats: 5,
  },
  {
    id: "fiat-tipo-sw-2021",
    model: "Fiat Tipo SW",
    year: 2021,
    transmission: "Manual",
    fuel: "Diesel",
    fuelLabel: "Gasóleo/Diesel",
    salePrice: 14500,
    mileage: 85000,
    imageUrl: "/images/fiat-tipo-sw.jpg",
    specs: [],
    seats: 5,
  },
  {
    id: "fiat-tipo-sw-2020",
    model: "Fiat Tipo SW",
    year: 2020,
    transmission: "Manual",
    fuel: "Diesel",
    fuelLabel: "Gasóleo/Diesel",
    salePrice: 13500,
    mileage: 110000,
    imageUrl: "/images/fiat-tipo-sw.jpg",
    specs: [],
    seats: 5,
  },
];
