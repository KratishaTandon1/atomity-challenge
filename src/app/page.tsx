import { DrillDownDashboard } from "../components/features/DrillDownSection"
import { ThemeToggle } from "../components/ThemeToggle"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-background">
      <div className="py-16 md:py-24 flex flex-col items-center justify-center w-full px-6 text-center">
        <ThemeToggle />
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-foreground">
          Atomity Cloud Insight
        </h1>
        <p className="text-muted text-base md:text-lg max-w-2xl">
          Explore interactive cost aggregation across your clusters. Click on any bar or table row to drill down.
        </p>
      </div>

      <DrillDownDashboard />
      
      <div className="py-12"></div>
    </main>
  );
}