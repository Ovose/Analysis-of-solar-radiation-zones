import { Region, MonthlyData, SolarZone } from '@/types/solar';

export const belarusRegions: Region[] = [
  {
    id: 'minsk',
    name: 'Минская область',
    centerLat: 53.9,
    centerLon: 27.56,
    area: 39900,
    solarRadiation: 1050,
    averageAnnualSunshine: 1780,
    optimalPanelAngle: 35,
  },
  {
    id: 'brest',
    name: 'Брестская область',
    centerLat: 52.1,
    centerLon: 25.3,
    area: 32800,
    solarRadiation: 1120,
    averageAnnualSunshine: 1850,
    optimalPanelAngle: 34,
  },
  {
    id: 'gomel',
    name: 'Гомельская область',
    centerLat: 52.4,
    centerLon: 29.0,
    area: 40400,
    solarRadiation: 1080,
    averageAnnualSunshine: 1820,
    optimalPanelAngle: 35,
  },
  {
    id: 'grodno',
    name: 'Гродненская область',
    centerLat: 53.7,
    centerLon: 24.7,
    area: 25100,
    solarRadiation: 1090,
    averageAnnualSunshine: 1790,
    optimalPanelAngle: 35,
  },
  {
    id: 'vitebsk',
    name: 'Витебская область',
    centerLat: 55.2,
    centerLon: 28.5,
    area: 40100,
    solarRadiation: 980,
    averageAnnualSunshine: 1680,
    optimalPanelAngle: 36,
  },
  {
    id: 'mogilev',
    name: 'Могилёвская область',
    centerLat: 53.9,
    centerLon: 30.3,
    area: 29100,
    solarRadiation: 1040,
    averageAnnualSunshine: 1750,
    optimalPanelAngle: 35,
  },
];

export const monthlyData: MonthlyData[] = [
  { month: 'Янв', radiation: 25, sunshine: 45 },
  { month: 'Фев', radiation: 45, sunshine: 75 },
  { month: 'Мар', radiation: 85, sunshine: 125 },
  { month: 'Апр', radiation: 125, sunshine: 175 },
  { month: 'Май', radiation: 165, sunshine: 235 },
  { month: 'Июн', radiation: 175, sunshine: 250 },
  { month: 'Июл', radiation: 170, sunshine: 245 },
  { month: 'Авг', radiation: 145, sunshine: 215 },
  { month: 'Сен', radiation: 95, sunshine: 145 },
  { month: 'Окт', radiation: 55, sunshine: 95 },
  { month: 'Ноя', radiation: 30, sunshine: 50 },
  { month: 'Дек', radiation: 20, sunshine: 35 },
];

export function getSolarZone(radiation: number): SolarZone {
  if (radiation >= 1100) return 'very-high';
  if (radiation >= 1050) return 'high';
  if (radiation >= 1000) return 'medium';
  return 'low';
}

export function getZoneColor(zone: SolarZone): string {
  const colors = {
    'very-high': 'hsl(var(--solar-very-high))',
    'high': 'hsl(var(--solar-high))',
    'medium': 'hsl(var(--solar-medium))',
    'low': 'hsl(var(--solar-low))',
  };
  return colors[zone];
}

export function getZoneLabel(zone: SolarZone): string {
  const labels = {
    'very-high': 'Очень высокий уровень',
    'high': 'Высокий уровень',
    'medium': 'Средний уровень',
    'low': 'Низкий уровень',
  };
  return labels[zone];
}
