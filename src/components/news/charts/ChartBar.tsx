// src/components/news/charts/ChartBar.tsx
"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import type { ChartComponentProps } from '@/types/chart';

export function ChartBar({ config }: ChartComponentProps) {
  const { data, dataKeys, indexKey, layout, showGrid, showLegend, showTooltip } = config;

  const isVerticalLayout = layout === 'vertical';

  const renderLabelList = (key: string) => (
    <LabelList 
      dataKey={key} 
      position={isVerticalLayout ? 'right' : 'top'} 
      offset={8}
      className="fill-foreground"
      fontSize={12}
    />
  );
  
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart 
        data={data} 
        layout={layout}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        {showGrid && <CartesianGrid strokeDasharray="3 3" />}

        {isVerticalLayout ? (
          <>
            <XAxis type="number" />
            <YAxis type="category" dataKey={indexKey} width={80} tick={{ fontSize: 12 }} />
          </>
        ) : (
          <>
            <XAxis dataKey={indexKey} tick={{ fontSize: 12 }} />
            <YAxis />
          </>
        )}
        
        {showTooltip && <Tooltip 
          cursor={{ fill: 'hsl(var(--accent))' }}
          contentStyle={{
            backgroundColor: 'hsl(var(--background))',
            borderColor: 'hsl(var(--border))'
          }}
        />}

        {showLegend && <Legend />}
        
        {dataKeys.map((key) => (
          <Bar key={key.name} dataKey={key.name} fill={key.color} name={key.label || key.name} radius={[4, 4, 0, 0]}>
            {renderLabelList(key.name)}
          </Bar>
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
