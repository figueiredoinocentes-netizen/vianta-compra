export type Availability = "available" | "soon";
export type Transmission = "Automático" | "Manual";
export type Fuel = "Elétrico" | "Híbrido" | "Gasolina" | "Diesel";

export interface Vehicle {
  id: string;
  model: string;
  year: number;
  transmission: Transmission;
  fuel: Fuel;
  weeklyPrice: number;
  deposit: number;
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
    weeklyPrice: 219,
    deposit: 1500,
    availability: "available",
    imageUrl: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&q=80",
    specs: ["5 lugares", "Autonomia ~450km", "Supercharger incluído"],
  },
  {
    id: "toyota-prius",
    model: "Toyota Prius",
    year: 2023,
    transmission: "Automático",
    fuel: "Híbrido",
    weeklyPrice: 189,
    deposit: 1200,
    availability: "available",
    imageUrl: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80",
    specs: ["5 lugares", "Consumo reduzido", "Conforto premium"],
  },
  {
    id: "mercedes-eqa",
    model: "Mercedes EQA",
    year: 2023,
    transmission: "Automático",
    fuel: "Elétrico",
    weeklyPrice: 249,
    deposit: 2000,
    availability: "soon",
    imageUrl: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80",
    specs: ["5 lugares", "Autonomia ~400km", "Acabamento premium"],
  },
];
