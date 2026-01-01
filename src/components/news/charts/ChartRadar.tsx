// src/components/news/charts/ChartRadar.tsx
"use client";

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import type { ChartComponentProps } from '@/components/news/charts/chart';

export function ChartRadar({ config }: ChartComponentProps) {
  const { data, dataKeys, indexKey, showLegend, showTooltip } = config;
  
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey={indexKey} />
        <PolarRadiusAxis angle={30} domain={[0, 'dataMax']} />
        
        {showTooltip && <Tooltip 
           contentStyle={{
            backgroundColor: 'hsl(var(--background))',
            borderColor: 'hsl(var(--border))'
          }}
        />}

        {showLegend && <Legend />}

        {dataKeys.map((key) => (
          <Radar 
            key={key.name}
            name={key.label || key.name} 
            dataKey={key.name} 
            stroke={key.color} 
            fill={key.color} 
            fillOpacity={0.6} 
          />
        ))}
      </RadarChart>
    </ResponsiveContainer>
  );
}
