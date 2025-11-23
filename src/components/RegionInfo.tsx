import { Region } from '@/types/solar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getSolarZone, getZoneLabel } from '@/lib/solar-data';
import { Sun, Clock, TrendingUp, MapPin } from 'lucide-react';

interface RegionInfoProps {
  region: Region;
}

export function RegionInfo({ region }: RegionInfoProps) {
  const zone = getSolarZone(region.solarRadiation);
  const zoneLabel = getZoneLabel(zone);

  const stats = [
    {
      icon: Sun,
      label: 'Солнечная радиация',
      value: `${region.solarRadiation} кВт·ч/м²/год`,
      color: 'text-orange-500',
    },
    {
      icon: Clock,
      label: 'Солнечных часов',
      value: `${region.averageAnnualSunshine} ч/год`,
      color: 'text-yellow-500',
    },
    {
      icon: TrendingUp,
      label: 'Оптимальный угол',
      value: `${region.optimalPanelAngle}°`,
      color: 'text-blue-500',
    },
    {
      icon: MapPin,
      label: 'Площадь',
      value: `${region.area.toLocaleString()} км²`,
      color: 'text-green-500',
    },
  ];

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">{region.name}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {region.centerLat.toFixed(2)}°N, {region.centerLon.toFixed(2)}°E
            </p>
          </div>
          <Badge variant="secondary" className="text-xs">
            {zoneLabel}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors"
          >
            <div className={`${stat.color} bg-background p-2 rounded-md`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-sm font-semibold mt-0.5">{stat.value}</p>
            </div>
          </div>
        ))}
        
        <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <p className="text-xs text-muted-foreground mb-2">
            Потенциал солнечной энергии
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">
              {(region.solarRadiation * 0.15).toFixed(0)}
            </span>
            <span className="text-sm text-muted-foreground">
              кВт·ч/м²/год (КПД 15%)
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
