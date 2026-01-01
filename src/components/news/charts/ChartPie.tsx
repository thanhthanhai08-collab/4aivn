"use client";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ChartComponentProps } from '@/types/chart';

export function ChartPie({ config }: ChartComponentProps) {
  const { data, colors, unit = '' } = config;

  // Lấy danh sách các mô hình cần so sánh (GPT-4, o1)
  const modelKeys = Object.keys(data[0] || {}).filter(k => k !== 'name' && k !== 'color');

  return (
    <div className="flex flex-wrap justify-center gap-8">
      {/* Duyệt qua từng bộ dữ liệu (Phân tích, Tư duy...) để tạo biểu đồ riêng */}
      {data.map((item: any, index: number) => {
        // Chuyển đổi dữ liệu của từng mục thành định dạng PieChart
        const pieData = modelKeys.map(model => ({
          name: model,
          value: Number(item[model]) || 0
        }));

        return (
          <div key={index} className="flex flex-col items-center">
            <h4 className="text-sm font-semibold mb-2 text-slate-600">{item.name}</h4>
            <ResponsiveContainer width={200} height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                  isAnimationActive={true}
                  animationDuration={1200}
                >
                  {pieData.map((_, i) => (
                    <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => `${value} ${unit}`} />
                {/* Chỉ hiện Legend ở biểu đồ đầu tiên hoặc dùng chung để tránh rối */}
                {index === 0 && <Legend verticalAlign="bottom" />}
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
      })}
    </div>
  );
}
