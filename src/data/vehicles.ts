export type Transmission = "Automático" | "Manual";
export type Fuel = "Elétrico" | "Híbrido" | "Gasolina" | "Diesel";
export type Availability = "stock" | "order";

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
  availability?: Availability;
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
    availability: "stock",
  },
  {
    id: "byd-ato3-design",
    model: "BYD Ato 3 Design",
    year: 2023,
    transmission: "Automático",
    fuel: "Elétrico",
    salePrice: 29000,
    mileage: 10000,
    imageUrl: "/images/byd-ato3.png",
    specs: [],
    seats: 5,
    categories: ["Comfort", "Eletric", "Green"],
    availability: "stock",
  },
  {
    id: "opel-mokka-e",
    model: "Opel Mokka-e",
    year: 2023,
    transmission: "Automático",
    fuel: "Elétrico",
    salePrice: 20000,
    mileage: 20000,
    imageUrl: "/images/opel-mokka-e.png",
    specs: [],
    seats: 5,
    categories: ["Comfort", "Eletric", "Green"],
    availability: "order",
  },
  {
    id: "mg-mg4",
    model: "MG MG4",
    year: 2023,
    transmission: "Automático",
    fuel: "Elétrico",
    salePrice: 22000,
    mileage: 10000,
    imageUrl: "/images/mg-mg4.png",
    specs: [],
    seats: 5,
    categories: ["Comfort", "Eletric", "Green"],
    availability: "order",
  },
];
