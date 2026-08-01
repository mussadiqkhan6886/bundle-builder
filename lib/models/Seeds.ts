import mongoose, { Schema } from "mongoose";
import { Model } from "mongoose";
import {Selections, ActiveVariants} from "@/type"

export interface ISeedConfig extends Document {
  seedSelections: Selections;
  seedActiveVariants: ActiveVariants;
}

const SeedConfigSchema = new Schema<ISeedConfig>(
  {
    seedSelections: { type: Schema.Types.Mixed, required: true },
    seedActiveVariants: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

export const SeedConfigModel: Model<ISeedConfig> =
  mongoose.models.SeedConfig || mongoose.model<ISeedConfig>('SeedConfig', SeedConfigSchema);