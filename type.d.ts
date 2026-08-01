import { IconType } from "react-icons";

export interface Variant {
  variantId: string;  
  label: string;        
  variantImage: string;    
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
  highlightLastWord?: boolean;      
  variants: Variant[];           
  billingPeriod?: "mo" | "yr";
}

export interface Step {
  id: string;              
  stepNumber: number;      
  title: string;           
  next: string | null
  icon: "BiCameraHome" | "FiShield" | "FaWifi" | "FaTableCells";            
  products: Product[];
}

export type VariantQuantities = Record<string, number>;

export type Selections = Record<string, VariantQuantities>;

export type ActiveVariants = Record<string, string>;


interface ProductCart {
  productId: string;
  variantId: string;
  name: string;
  variantLabel: string | null;
  image: string;
  category: string;
  quantity: number;
  price: number;
  compareAtPrice: number | null;
  editable: boolean;
  requiredItem: boolean;
  billingPeriod?: string;
  highlightLastWord?: string
}

interface LineItem {
  productId: string
  variantId: string
  name: string
  variantLabel: string | null
  highlightLastWord?: boolean
  image: string
  category: string
  quantity: number
  price: number
  compareAtPrice: number | null
  editable: boolean
  requiredItem: boolean
  billingPeriod?: string
}

interface CartContextValue {
  steps: Step[]
  
  // core quantity actions
  increment: (productId: string, variantId: string) => void
  decrement: (productId: string, variantId: string) => void
  setQuantity: (productId: string, variantId: string, newQty: number) => void

  // active variant (which chip is highlighted per product)
  activeVariants: ActiveVariants
  setActiveVariant: (productId: string, variantId: string) => void

  // reads
  getQuantity: (productId: string, variantId: string) => number
  getActiveVariantId: (productId: string) => string
  getSelectedCount: (stepId: string) => number

  // review panel
  getLineItems: () => LineItem[]
  getGroupedLineItems: () => Record<string, LineItem[]>
  getTotals: () => Totals

  // persistence
  saveSystem: () => void

  isProductSelected: (productId: string) => boolean
}