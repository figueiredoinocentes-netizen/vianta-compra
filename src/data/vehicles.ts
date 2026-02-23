export type Availability = "available" | "soon";
export type Transmission = "Automático" | "Manual";
export type Fuel = "Elétrico" | "Híbrido" | "Gasolina" | "Diesel";

export interface Vehicle {
  id: string;
  model: string;
  year: number;
  transmission: Transmission;
  fuel: Fuel;
  fuelLabel?: string;
  weeklyPrice: number;
  previousPrice?: number;
  deposit: number;
  depositInstallments: string;
  availability: Availability;
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
    weeklyPrice: 360,
    previousPrice: 380,
    deposit: 600,
    depositInstallments: "300€ + 100€ + 100€ + 100€",
    availability: "available",
    imageUrl: "/images/tesla-model-3.jpg",
    specs: [],
    seats: 5,
    categories: ["Comfort", "Eletric", "Green", "BlackTVDE", "Tours"],
  },
  {
    id: "tesla-model-3-dualmotor",
    model: "Tesla Model 3 Dualmotor",
    year: 2020,
    transmission: "Automático",
    fuel: "Elétrico",
    weeklyPrice: 350,
    deposit: 600,
    depositInstallments: "300€ + 100€ + 100€ + 100€",
    availability: "available",
    imageUrl: "/images/tesla-model-3-dualmotor.jpg",
    specs: [],
    seats: 5,
    categories: ["Comfort", "Eletric", "Green", "BlackTVDE", "Tours"],
  },
  {
    id: "seat-leon",
    model: "Seat Leon",
    year: 2020,
    transmission: "Manual",
    fuel: "Diesel",
    fuelLabel: "Gasóleo/Diesel",
    weeklyPrice: 250,
    deposit: 300,
    depositInstallments: "150€ + 75€ + 75€",
    availability: "available",
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
    weeklyPrice: 235,
    deposit: 300,
    depositInstallments: "150€ + 75€ + 75€",
    availability: "available",
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
    weeklyPrice: 235,
    deposit: 300,
    depositInstallments: "150€ + 75€ + 75€",
    availability: "available",
    imageUrl: "/images/fiat-tipo-sw.jpg",
    specs: [],
    seats: 5,
  },
];
