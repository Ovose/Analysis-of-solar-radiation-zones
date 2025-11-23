export type Region = {
  id: string;
  name: string;
  centerLat: number;
  centerLon: number;
  area: number;
  solarRadiation: number; // kWh/m²/year
  averageAnnualSunshine: number; // hours
  optimalPanelAngle: number; // degrees
  path?: string; // SVG path for region shape
};

export type SolarZone = 'low' | 'medium' | 'high' | 'very-high';

export type MonthlyData = {
  month: string;
  radiation: number;
  sunshine: number;
};

export type ComparisonData = {
  regionId: string;
  regionName: string;
  radiation: number;
  sunshine: number;
  efficiency: number;
};
