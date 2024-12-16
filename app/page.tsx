import CategorySelector from "@/components/home/category-selector";
import MostRead from "@/components/home/most-read";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <CategorySelector />
      <MostRead />
    </main>
  );
}
