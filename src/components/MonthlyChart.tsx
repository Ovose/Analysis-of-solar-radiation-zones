import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { monthlyData } from '@/lib/solar-data';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export function MonthlyChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Годовая динамика</CardTitle>
        <p className="text-sm text-muted-foreground">
          Среднемесячные показатели по стране
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="month"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              style={{ fontSize: '12px' }}
            />
            <YAxis
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Bar
              dataKey="radiation"
              name="Радиация (кВт·ч/м²)"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="sunshine"
              name="Солнечных часов"
              fill="hsl(var(--accent))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
