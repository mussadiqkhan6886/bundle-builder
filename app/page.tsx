import BundlePanel from "@/sections/BundlePanel";
import ReviewPanel from "@/sections/ReviewPanel";

export default function Home() {
  return (
    <main className="flex flex-col gap-2 lg:flex-row lg:gap-4">
      <BundlePanel />
      <ReviewPanel />
    </main>
  );
}
