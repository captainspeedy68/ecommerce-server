import { Schema, model, connect } from 'mongoose';

export type TVariant = {
    type: string;
    value: string;
}

export type TInventory = {
    quantity: number;
    inStock: boolean;
}


// creating a product type 
type TProduct = {
    name: string;
    description: string;
    price: number;
    category: string;
    tags: string[];
    variants: TVariant[];
    inventory: TInventory;
  }

  export default TProduct;