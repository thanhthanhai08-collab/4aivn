// src/components/news/charts/ChartBar.tsx
"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import type { ChartComponentProps } from '@/types/chart';

export function ChartBar({ config }: ChartComponentProps) {
  // Lấy các giá trị từ config
  const { data, colors, indexKey = 'name', layout, showGrid, showLegend, showTooltip } = config;

  // TỰ ĐỘNG TẠO DATAKEYS: 
  // Lấy tất cả các key trong object đầu tiên (trừ key 'name' và 'color')
  const autoKeys = Object.keys(data[0] || {}).filter(
    (key) => key !== indexKey && key !== 'color'
  );

  const isVerticalLayout = layout === 'vertical';

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart 
        data={data} 
        layout={layout}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        {showGrid && <CartesianGrid strokeDasharray="3 3" />}
        
        {/* Cấu hình trục dựa trên Layout */}
        {isVerticalLayout ? (
          <>
            <XAxis type="number" />
            <YAxis type="category" dataKey={indexKey} width={80} tick={{ fontSize: 12 }} />
          </>
        ) : (
          <>
            <XAxis dataKey={indexKey} tick={{ fontSize: 12 }}/>
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

        {/* Vẽ các cột dựa trên autoKeys đã quét được */}
        {autoKeys.map((key, index) => (
          <Bar 
            key={key} 
            dataKey={key} 
            fill={colors?.[index] || "#8884d8"} // Lấy màu từ mảng colors
            name={key} 
            radius={[4, 4, 0, 0]}
          >
            <LabelList dataKey={key} position="top" fontSize={12} className="fill-foreground" />
          </Bar>
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}