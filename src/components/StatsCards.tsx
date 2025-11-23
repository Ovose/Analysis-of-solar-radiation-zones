import { Card, CardContent } from '@/components/ui/card';
import { belarusRegions } from '@/lib/solar-data';
import { Sun, MapPin, TrendingUp, Zap } from 'lucide-react';

export function StatsCards() {
  const avgRadiation = Math.round(
    belarusRegions.reduce((acc, r) => acc + r.solarRadiation, 0) / belarusRegions.length
  );
  
  const avgSunshine = Math.round(
    belarusRegions.reduce((acc, r) => acc + r.averageAnnualSunshine, 0) / belarusRegions.length
  );
  
  const totalArea = belarusRegions.reduce((acc, r) => acc + r.area, 0);
  
  const maxRadiation = Math.max(...belarusRegions.map(r => r.solarRadiation));

  const stats = [
    {
      icon: Sun,
      label: 'Средняя радиация',
      value: `${avgRadiation}`,
      unit: 'кВт·ч/м²/год',
      color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
    },
    {
      icon: MapPin,
      label: 'Площадь страны',
      value: `${(totalArea / 1000).toFixed(1)}`,
      unit: 'тыс. км²',
      color: 'bg-green-500/10 text-green-600 dark:text-green-400',
    },
    {
      icon: TrendingUp,
      label: 'Солнечных часов',
      value: `${avgSunshine}`,
      unit: 'ч/год',
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    },
    {
      icon: Zap,
      label: 'Максимум',
      value: `${maxRadiation}`,
      unit: 'кВт·ч/м²/год',
      color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">{stat.value}</span>
                  <span className="text-xs text-muted-foreground">{stat.unit}</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
