import { IconType } from "react-icons";

export interface Variant {
  variantId: string;  
  label: string;        
  swatch?: string;      
}

export type ProductCategory = "cameras" | "sensors" | "accessories" | "plan";

export interface Product {
  id: string;                   
  category: ProductCategory;
  name: string;
  description: string;
  learnMoreUrl?: string;
  image: string;
  badge?: string | null;         
  compareAtPrice?: number | null; 
  price: number;
  editable: boolean;             
  requiredItem: boolean;         
  variants: Variant[];           
  isRecurring?: boolean;        
  billingPeriod?: "mo" | "yr";
}

export interface Step {
  id: string;              
  stepNumber: number;      
  title: string;           
  icon: "BiCameraHome" | "FiShield" | "FaWifi" | "FaTableCells";            
  products: Product[];
}

export type VariantQuantities = Record<string, number>;

// Full cart state: productId -> { variantId: qty }
export type Selections = Record<string, VariantQuantities>;

// UI-only: which chip is currently highlighted per product.
// productId -> variantId
export type ActiveVariants = Record<string, string>;

export interface ProductCatalogResponse {
  steps: Step[];
  seedSelections: Selections;
  seedActiveVariants: ActiveVariants;
}

export interface SavedSystem {
  selections: Selections;
  activeVariants: ActiveVariants;
}


export interface ReviewLineItem {
  productId: string;
  variantId: string;
  name: string;
  variantLabel?: string;  
  image: string;
  category: ProductCategory;
  quantity: number;
  price: number;
  compareAtPrice?: number | null;
  editable: boolean;
}

export interface CartTotals {
  subtotal: number;          
  compareAtSubtotal: number; 
  savings: number;          
}

export type CheckoutStatus = "idle" | "processing" | "confirmed";

export interface CheckoutState {
  status: CheckoutStatus;
  orderId: string | null;
  confirmedAt: string | null;
  summarySnapshot: ReviewLineItem[] | null;
}


interface ProductCart {
  productId: string;
  variantId: string;
  name: string;
  variantLabel: string | null;
  image: string | null;
  category: string;
  quantity: number;
  price: number;
  compareAtPrice: number | null;
  editable: boolean;
  requiredItem: boolean;
  isRecurring?: boolean;
  billingPeriod?: string;
}

interface Totals {
  subtotal: number;
  compareAtSubtotal: number;
  savings: number;
  shipping: number;
  financingPerMonth: number;
}

interface CartData {
  cameras: ProductCart[];
  plan: ProductCart[];
  sensors: ProductCart[];
  protection: ProductCart[];
  totals: Totals;
}
