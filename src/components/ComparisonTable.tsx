import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { belarusRegions, getSolarZone } from '@/lib/solar-data';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown } from 'lucide-react';
import { useState } from 'react';

export function ComparisonTable() {
  const [sortField, setSortField] = useState<'radiation' | 'sunshine'>('radiation');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedRegions = [...belarusRegions].sort((a, b) => {
    const aValue = sortField === 'radiation' ? a.solarRadiation : a.averageAnnualSunshine;
    const bValue = sortField === 'radiation' ? b.solarRadiation : b.averageAnnualSunshine;
    return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
  });

  const handleSort = (field: 'radiation' | 'sunshine') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Сравнение регионов</CardTitle>
        <p className="text-sm text-muted-foreground">
          Нажмите на заголовок для сортировки
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Регион</TableHead>
                <TableHead>
                  <button
                    onClick={() => handleSort('radiation')}
                    className="flex items-center gap-1 hover:text-foreground transition-colors"
                  >
                    Радиация
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead>
                  <button
                    onClick={() => handleSort('sunshine')}
                    className="flex items-center gap-1 hover:text-foreground transition-colors"
                  >
                    Солн. часы
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead>Зона</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedRegions.map((region, index) => {
                const zone = getSolarZone(region.solarRadiation);
                const zoneColors = {
                  'very-high': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
                  'high': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
                  'medium': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
                  'low': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
                };
                
                return (
                  <TableRow key={region.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {index + 1}
                        </span>
                        {region.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-sm">
                        {region.solarRadiation} кВт·ч/м²
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-sm">
                        {region.averageAnnualSunshine} ч
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={zoneColors[zone]}>
                        {zone === 'very-high' ? '★★★★' : zone === 'high' ? '★★★' : zone === 'medium' ? '★★' : '★'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
