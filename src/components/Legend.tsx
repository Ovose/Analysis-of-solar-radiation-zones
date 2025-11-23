import { Card } from '@/components/ui/card';
import { getSolarZone, getZoneColor, getZoneLabel } from '@/lib/solar-data';

export function Legend() {
  const zones: Array<{ value: number }> = [
    { value: 1150 },
    { value: 1080 },
    { value: 1020 },
    { value: 950 },
  ];

  return (
    <Card className="p-4">
      <h4 className="text-sm font-semibold mb-3">Легенда</h4>
      <div className="space-y-2">
        {zones.map((zone, index) => {
          const solarZone = getSolarZone(zone.value);
          const color = getZoneColor(solarZone);
          const label = getZoneLabel(solarZone);
          
          return (
            <div key={index} className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded border border-border"
                style={{ backgroundColor: color }}
              />
              <div className="flex-1">
                <p className="text-xs font-medium">{label}</p>
                <p className="text-xs text-muted-foreground">
                  {solarZone === 'very-high' ? '≥1100' : 
                   solarZone === 'high' ? '1050-1099' :
                   solarZone === 'medium' ? '1000-1049' : '<1000'} кВт·ч/м²
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
