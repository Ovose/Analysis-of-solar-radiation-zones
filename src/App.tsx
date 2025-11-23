import { useState } from 'react';
import { Header } from '@/components/Header';
import { MapTabs } from '@/components/MapTabs';
import { RegionInfo } from '@/components/RegionInfo';
import { MonthlyChart } from '@/components/MonthlyChart';
import { ComparisonTable } from '@/components/ComparisonTable';
import { Legend } from '@/components/Legend';
import { StatsCards } from '@/components/StatsCards';
import { belarusRegions } from '@/lib/solar-data';
import { Region } from '@/types/solar';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(belarusRegions[0]);

  return (
    <div className="min-h-screen gradient-mesh">
      <Header />
      
      <main className="container px-4 py-8 space-y-8">
        <div className="animate-fade-in">
          <h2 className="text-3xl font-bold mb-2">
            Районирование территории по солнечной радиации
          </h2>
          <p className="text-muted-foreground max-w-3xl">
            Интерактивный анализ геоданных о потенциале солнечной энергии в регионах Республики Беларусь. 
            Данные основаны на многолетних метеорологических наблюдениях.
          </p>
        </div>

        <StatsCards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <MapTabs
              onRegionSelect={setSelectedRegion}
              selectedRegion={selectedRegion}
            />
            <MonthlyChart />
          </div>
          
          <div className="space-y-6">
            {selectedRegion && <RegionInfo region={selectedRegion} />}
            <Legend />
          </div>
        </div>

        <ComparisonTable />
      </main>

      <footer className="border-t border-border/40 bg-background/95 backdrop-blur mt-16">
        <div className="container px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 Геоинформационная система солнечной радиации Беларуси
          </p>
        </div>
      </footer>

      <Toaster />
    </div>
  );
}

export default App;
