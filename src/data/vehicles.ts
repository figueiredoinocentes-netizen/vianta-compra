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
    imageUrl: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&q=80",
    specs: ["5 lugares", "Autonomia ~450km", "Supercharger incluído"],
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
    specs: ["5 lugares", "Caixa manual", "Eficiência diesel"],
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
    imageUrl: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&q=80",
    specs: ["5 lugares", "Familiar SW", "Espaçoso e prático"],
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
    imageUrl: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80",
    specs: ["5 lugares", "Familiar SW", "Espaçoso e prático"],
  },
];
