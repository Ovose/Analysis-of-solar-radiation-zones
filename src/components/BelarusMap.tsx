import { useState } from 'react';
import { belarusRegions, getSolarZone, getZoneColor } from '@/lib/solar-data';
import { Region } from '@/types/solar';
import { Card } from '@/components/ui/card';

interface BelarusMapProps {
  onRegionSelect: (region: Region) => void;
  selectedRegion: Region | null;
}

export function BelarusMap({ onRegionSelect, selectedRegion }: BelarusMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  // Simplified SVG representation of Belarus regions
  const regionPaths: Record<string, string> = {
    vitebsk: 'M 300,50 L 450,50 L 480,120 L 460,180 L 400,190 L 320,150 Z',
    grodno: 'M 50,150 L 180,140 L 220,180 L 200,250 L 120,260 L 60,220 Z',
    minsk: 'M 220,180 L 320,150 L 380,200 L 360,280 L 280,290 L 200,250 Z',
    brest: 'M 60,280 L 180,270 L 200,330 L 160,400 L 70,390 L 40,340 Z',
    mogilev: 'M 380,200 L 480,180 L 500,240 L 480,300 L 400,310 L 360,280 Z',
    gomel: 'M 280,290 L 400,310 L 420,380 L 380,450 L 260,440 L 200,380 Z',
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Карта районирования</h3>
      <div className="relative">
        <svg
          viewBox="0 0 520 480"
          className="w-full h-auto"
          style={{ minHeight: '400px' }}
        >
          <defs>
            <filter id="shadow">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2" />
            </filter>
          </defs>
          
          {belarusRegions.map((region) => {
            const zone = getSolarZone(region.solarRadiation);
            const isSelected = selectedRegion?.id === region.id;
            const isHovered = hoveredRegion === region.id;
            
            return (
              <g key={region.id}>
                <path
                  d={regionPaths[region.id]}
                  fill={getZoneColor(zone)}
                  stroke="hsl(var(--border))"
                  strokeWidth={isSelected ? 3 : 1.5}
                  opacity={isSelected || isHovered ? 0.95 : 0.75}
                  className="cursor-pointer transition-all duration-200"
                  style={{
                    filter: isSelected || isHovered ? 'url(#shadow)' : 'none',
                  }}
                  onMouseEnter={() => setHoveredRegion(region.id)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => onRegionSelect(region)}
                />
                <text
                  x={region.centerLon * 8}
                  y={region.centerLat * 7.5}
                  textAnchor="middle"
                  className="text-xs font-medium pointer-events-none select-none"
                  fill={isSelected || isHovered ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))'}
                  style={{ fontSize: isSelected ? '12px' : '10px' }}
                >
                  {region.name.split(' ')[0]}
                </text>
              </g>
            );
          })}
        </svg>
        
        {hoveredRegion && (
          <div className="absolute top-4 right-4 bg-popover border border-border rounded-lg p-3 shadow-lg animate-fade-in">
            <p className="text-sm font-medium">
              {belarusRegions.find(r => r.id === hoveredRegion)?.name}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {belarusRegions.find(r => r.id === hoveredRegion)?.solarRadiation} кВт·ч/м²/год
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
