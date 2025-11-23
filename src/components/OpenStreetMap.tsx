import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { belarusRegions, getSolarZone, getZoneColor } from '@/lib/solar-data';
import { Region } from '@/types/solar';
import { toast } from 'sonner';

// Fix Leaflet default icon paths
if (typeof window !== 'undefined' && L.Icon.Default.prototype) {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  });
}

interface OpenStreetMapProps {
  onRegionSelect: (region: Region) => void;
  selectedRegion: Region | null;
}

export function OpenStreetMap({ onRegionSelect, selectedRegion }: OpenStreetMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.CircleMarker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    if (mapInstanceRef.current) return;

    console.log('Initializing OpenStreetMap...');
    setIsLoading(true);
    setError(null);

    try {

      // Initialize map centered on Belarus
      const map = L.map(mapRef.current, {
        center: [53.7098, 27.9534],
        zoom: 7,
        zoomControl: true,
        attributionControl: true,
      });
      mapInstanceRef.current = map;

      // Add OpenStreetMap tiles
      const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
        minZoom: 6,
      });

      tileLayer.on('load', () => {
        console.log('Map tiles loaded successfully');
        setIsLoading(false);
      });

      tileLayer.on('tileerror', (error) => {
        console.error('Tile loading error:', error);
        setError('Ошибка загрузки карты. Проверьте подключение к интернету.');
        toast.error('Ошибка загрузки карты');
      });

      tileLayer.addTo(map);

      // Force map to recalculate size after initialization
      setTimeout(() => {
        map.invalidateSize();
      }, 100);

      // Add region markers
      belarusRegions.forEach((region) => {
        const zone = getSolarZone(region.solarRadiation);
        const color = getZoneColor(zone);

        const marker = L.circleMarker([region.centerLat, region.centerLon], {
          radius: 15,
          fillColor: color,
          color: '#ffffff',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8,
        }).addTo(map);

        marker.bindPopup(`
          <div class="p-2">
            <h3 class="font-semibold text-sm mb-1">${region.name}</h3>
            <p class="text-xs text-gray-600 mb-1">
              Солнечная радиация: <strong>${region.solarRadiation}</strong> кВт·ч/м²/год
            </p>
            <p class="text-xs text-gray-600 mb-1">
              Солнечных часов: <strong>${region.averageAnnualSunshine}</strong> ч/год
            </p>
            <p class="text-xs text-gray-600">
              Площадь: <strong>${region.area.toLocaleString()}</strong> км²
            </p>
          </div>
        `);

        marker.on('click', () => {
          onRegionSelect(region);
        });

        markersRef.current.push(marker);
      });

      console.log('Map initialized with', belarusRegions.length, 'regions');
      setIsLoading(false);
    } catch (err) {
      console.error('Error initializing map:', err);
      setError('Не удалось инициализировать карту');
      toast.error('Ошибка инициализации карты');
      setIsLoading(false);
    }

    return () => {
      console.log('Cleaning up map...');
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (err) {
          console.error('Error removing map:', err);
        }
        mapInstanceRef.current = null;
      }
      markersRef.current = [];
    };
  }, [onRegionSelect]);

  // Update marker styles when selection changes
  useEffect(() => {
    markersRef.current.forEach((marker, index) => {
      const region = belarusRegions[index];
      const isSelected = selectedRegion?.id === region.id;
      
      marker.setStyle({
        weight: isSelected ? 3 : 2,
        opacity: isSelected ? 1 : 0.8,
        fillOpacity: isSelected ? 1 : 0.8,
      });

      if (isSelected) {
        marker.setRadius(20);
      } else {
        marker.setRadius(15);
      }
    });
  }, [selectedRegion]);

  return (
    <div className="relative w-full h-full min-h-[500px] rounded-lg overflow-hidden border border-border shadow-sm">
      {isLoading && (
        <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-sm text-muted-foreground">Загрузка карты...</p>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3 p-6 text-center">
            <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
            <p className="text-sm text-destructive font-medium">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="text-xs text-primary hover:underline"
            >
              Перезагрузить страницу
            </button>
          </div>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}
