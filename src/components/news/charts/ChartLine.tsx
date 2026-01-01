// src/components/news/charts/ChartLine.tsx
"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ChartComponentProps } from '@/components/news/charts/chart';

export function ChartLine({ config }: ChartComponentProps) {
  const { data, dataKeys, indexKey, showGrid, showLegend, showTooltip } = config;

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart 
        data={data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        {showGrid && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis dataKey={indexKey} tick={{ fontSize: 12 }} />
        <YAxis />
        {showTooltip && <Tooltip 
          contentStyle={{
            backgroundColor: 'hsl(var(--background))',
            borderColor: 'hsl(var(--border))'
          }}
        />}
        {showLegend && <Legend />}
        
        {dataKeys.map((key) => (
          <Line 
            key={key.name} 
            type="monotone" 
            dataKey={key.name} 
            stroke={key.color} 
            name={key.label || key.name} 
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
