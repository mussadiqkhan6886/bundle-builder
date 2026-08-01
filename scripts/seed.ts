import connectDB from "@/lib/config/db";
import { StepModel } from "@/lib/models/Products";
import { SeedConfigModel } from "@/lib/models/Seeds";
import data from "@/public/data.json"
import dotenv from "dotenv"

dotenv.config()

async function seed() {
  await connectDB();

  console.log('Clearing existing data...');
  await StepModel.deleteMany({});
  await SeedConfigModel.deleteMany({});

  console.log('Inserting steps...');
  await StepModel.insertMany(data.steps);

  console.log('Inserting seed config...');
  await SeedConfigModel.create({
    seedSelections: data.seedSelections,
    seedActiveVariants: data.seedActiveVariants,
  });

  console.log('Seed complete.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});