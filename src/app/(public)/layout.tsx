import PublicHeader from "@/components/layout/PublicHeader";
import Footer from "@/components/layout/Footer";
import SmoothCursor from "@/components/animations/SmoothCursor";
import PageTransition from "@/components/animations/PageTransition";
import ScrollTriggerRefresh from "@/components/animations/ScrollTriggerRefresh";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollTriggerRefresh />
      <PageTransition />
      <SmoothCursor />
      <PublicHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
