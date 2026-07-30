import BundlePanel from "@/sections/BundlePanel";
import ReviewPanel from "@/sections/ReviewPanel";

export default function Home() {
  return (
    <main className="flex flex-col xl:flex-row lg:gap-6 pt-[31px] lg:max-w-[1200px] xl:max-w-[1250px] mx-auto ">
      <BundlePanel />
      <ReviewPanel />
    </main>
  );
}
