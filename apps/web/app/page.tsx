import Navbar from "@/modules/landing/components/layout/Navbar";
import LandingPage from "@/modules/landing/page";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");
  return (
    <main>
      <Navbar />
      <LandingPage />
    </main>
  );
}