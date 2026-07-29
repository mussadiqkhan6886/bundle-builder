import BundlePanel from "@/sections/BundlePanel";
import ReviewPanel from "@/sections/ReviewPanel";

export default function Home() {
  return (
    <main className="flex flex-col 2xl:flex-row lg:gap-6 pt-[31px]">
      <BundlePanel />
      <ReviewPanel />
    </main>
  );
}
