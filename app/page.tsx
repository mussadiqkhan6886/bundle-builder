import { CartProvider } from "@/contextAPI/contextCart";
import BundlePanel from "@/sections/BundlePanel";
import ReviewPanel from "@/sections/ReviewPanel";

const getBundleData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data.json`)
    const data = await res.json()
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
