import { CartProvider } from "@/contextAPI/contextCart";
import connectDB from "@/lib/config/db";
import { StepModel } from "@/lib/models/Products";
import { SeedConfigModel } from "@/lib/models/Seeds";
import BundlePanel from "@/sections/BundlePanel";
import ReviewPanel from "@/sections/ReviewPanel";

const getBundleData = async () => {
    await connectDB()
    const steps = await StepModel.find().lean()
    const seeds = await SeedConfigModel.findOne().lean()
    const data = {
      steps: JSON.parse(JSON.stringify(steps)),
      seedSelections: JSON.parse(JSON.stringify(seeds?.seedSelections ?? {})),
      seedActiveVariants: JSON.parse(JSON.stringify(seeds?.seedActiveVariants ?? {}))
    }
    return data
}

export default async function Home() {
  const data = await getBundleData()
  return (
    <CartProvider
      steps={data.steps}
      seedSelections={data.seedSelections}
      seedActiveVariants={data.seedActiveVariants}

    >
         <main className="flex flex-col xl:flex-row lg:gap-6 pt-[31px] lg:max-w-[1200px] xl:max-w-[1250px] mx-auto ">
          <BundlePanel />
          <ReviewPanel />
        </main>
    </CartProvider>
  );
}
