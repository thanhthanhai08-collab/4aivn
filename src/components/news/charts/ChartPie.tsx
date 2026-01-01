"use client";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ChartComponentProps } from '@/types/chart';

export function ChartPie({ config }: ChartComponentProps) {
  const { data, colors, unit = '' } = config;

  // 1. Chuyển đổi dữ liệu: Tính tổng điểm cho từng mô hình
  // Từ: [{name: "Phân tích", "GPT-4": 75, "o1": 90}, ...]
  // Sang: [{name: "GPT-4", value: 225}, {name: "o1", value: 273}]
  const modelKeys = Object.keys(data[0] || {}).filter(k => k !== 'name' && k !== 'color');
  
  const chartData = modelKeys.map(model => ({
    name: model,
    value: data.reduce((sum: number, item: any) => sum + (Number(item[model]) || 0), 0)
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60} // Tạo hình khuyên (Donut) cho hiện đại
          outerRadius={100}
          paddingAngle={5}
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: any) => `${value} ${unit}`} />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  );
}
