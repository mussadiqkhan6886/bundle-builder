import { Product, Variant } from '@/type';
import mongoose, { Schema, Document, Model } from 'mongoose';

const VariantSchema = new Schema<Variant>(
  {
    variantId: { type: String, required: true },
    label: { type: String, required: true },
    variantImage: { type: String, required: true },
  },
  { _id: false }
);

const ProductSchema = new Schema<Product>(
  {
    id: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['cameras', 'sensors', 'accessories', 'plan'],
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    learnMoreUrl: { type: String },
    image: { type: String, required: true },
    badge: { type: String, default: null },
    highlightLastWord: { type: Boolean, default: false },
    compareAtPrice: { type: Number, default: null },
    price: { type: Number, required: true },
    editable: { type: Boolean, required: true, default: true },
    requiredItem: { type: Boolean, required: true, default: false },
    billingPeriod: { type: String },
    variants: { type: [VariantSchema], default: [] },
  },
  { _id: false }
);

export interface IStep extends Document {
  id: string; 
  stepNumber: number;
  title: string;
  next: string | null;
  icon: "BiCameraHome" | "FiShield" | "FaWifi" | "FaTableCells";
  products: Product[];
}

const StepSchema = new Schema<IStep>(
  {
    id: { type: String, required: true, unique: true },
    stepNumber: { type: Number, required: true },
    title: { type: String, required: true },
    next: { type: String, default: null },
    icon: { type: String, required: true },
    products: { type: [ProductSchema], default: [] },
  },
  { timestamps: true }
);

export const StepModel: Model<IStep> =
  mongoose.models.Step || mongoose.model<IStep>('Step', StepSchema);