import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BelarusMap } from '@/components/BelarusMap';
import { OpenStreetMap } from '@/components/OpenStreetMap';
import { Region } from '@/types/solar';
import { Map, Globe } from 'lucide-react';

interface MapTabsProps {
  onRegionSelect: (region: Region) => void;
  selectedRegion: Region | null;
}

export function MapTabs({ onRegionSelect, selectedRegion }: MapTabsProps) {
  const [activeTab, setActiveTab] = useState('openstreetmap');

  return (
    <Card className="p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Карта районирования</h3>
          <TabsList className="grid w-auto grid-cols-2">
            <TabsTrigger value="openstreetmap" className="gap-2">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">OpenStreetMap</span>
            </TabsTrigger>
            <TabsTrigger value="schematic" className="gap-2">
              <Map className="h-4 w-4" />
              <span className="hidden sm:inline">Схематичная</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="openstreetmap" className="mt-0">
          <OpenStreetMap 
            onRegionSelect={onRegionSelect}
            selectedRegion={selectedRegion}
          />
        </TabsContent>
        
        <TabsContent value="schematic" className="mt-0">
          <BelarusMap 
            onRegionSelect={onRegionSelect}
            selectedRegion={selectedRegion}
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
