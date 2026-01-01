"use client";
import { useState, useEffect, useRef } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import type { ChartComponentProps } from '@/components/news/charts/chart';

export function ChartPie({ config }: ChartComponentProps) {
  const { data, colors, unit = '' } = config;
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);

  // Theo dõi sự kiện cuộn chuột
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Nếu muốn mỗi lần lướt qua đều chạy lại, đừng dùng observer.unobserve
          observer.unobserve(entry.target); 
        }
      },
      { threshold: 0.3 } // Kích hoạt khi thấy được 30% biểu đồ
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const modelKeys = Object.keys(data[0] || {}).filter(k => k !== 'name' && k !== 'color');

  return (
    <div ref={containerRef} className="flex flex-wrap justify-center gap-x-10 gap-y-4">
      {data.map((item: any, index: number) => {
        const pieData = modelKeys.map(model => ({
          name: model,
          value: Number(item[model]) || 0
        }));

        return (
          <div key={index} className="flex flex-col items-center">
            {/* Giảm khoảng cách text */}
            <h4 className="text-sm font-bold mb-0 text-slate-700 uppercase tracking-wide">
              {item.name}
            </h4>
            
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                  // Hiệu ứng chỉ chạy khi isInView = true
                  isAnimationActive={isInView} 
                  animationDuration={1500}
                  animationBegin={index * 100} // Các hình tròn hiện ra so le nhau cho đẹp
                >
                  {pieData.map((_, i) => (
                    <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
                  ))}
                </Pie>
                
                <Tooltip formatter={(value: any) => `${value} ${unit}`} />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Chú thích sát dưới biểu đồ */}
            <div className="flex gap-3 mt-[-15px]"> 
              {pieData.map((d, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors[i % colors.length] }} />
                  <span className="text-xs font-semibold text-slate-500">{d.name}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
