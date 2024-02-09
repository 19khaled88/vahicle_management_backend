// import { IUserResponse } from "../users/interface";

export const vehicleProfile_fields_constant =  [
  "searchTerm",
    'registrationNo',
    'tax',
    'seatCapacity',
    'isAc',
    'brand',
    'model',
    'fuelType',
    "color",
    "price",
    "tax",
    'vehicleType' ,
    'createdAt',
    'updatedAt',
  ];
  
  
    
  export interface ÏVehicles {
    id: string;
    registrationNo: string;
    purchaseDate: Date;
    registrationDate?: Date | null;
    color: string;
    mileage: number;
    price: number;
    tax: number;
    seatCapacity: number;
    vehicleType: VehicleType;
    brand: string;
    model: string;
    fuelType: FuelType;
    trip?: Trip | null; // Make the relationship optional
    createdAt: Date;
    updatedAt: Date;
  }
  
  interface Trip {
    // Define properties for Trip if necessary
    // ... other properties for Trip
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Enum for VehicleType
  enum VehicleType {
    AC = 'AC',
    NonAC = 'NonAC',
    SlippingBus = 'SlippingBus',
  }
  
  // Enum for FuelType
  enum FuelType {
    Petrol = 'Petrol',
    Diesel = 'Diesel',
    Electric = 'Electric',
    Hybrid = 'Hybrid',
  }