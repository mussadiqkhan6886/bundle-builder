import BundlePanel from "@/sections/BundlePanel";
import ReviewPanel from "@/sections/ReviewPanel";

export default function Home() {
  return (
    <main className="flex flex-col lg:flex-row lg:gap-4 pt-[31px]">
      <BundlePanel />
      <ReviewPanel />
    </main>
  );
}
