// src/components/news/AiActivitiesChart.tsx
"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: "Trò chuyện với AI", value: 40, category: "Giải trí và giao lưu", color: "hsl(var(--chart-5))" },
  { name: "Cập nhật thông tin/tin tức", value: 37, category: "Thói quen hàng ngày", color: "hsl(var(--chart-4))" },
  { name: "Học mới kỹ năng/kiến thức", value: 34, category: "Công việc và giáo dục", color: "hsl(var(--chart-2))" },
  { name: "Luyện tập giao tiếp với AI", value: 33, category: "Giải trí và giao lưu", color: "hsl(var(--chart-5))" },
  { name: "Dịch", value: 33, category: "Công việc và giáo dục", color: "hsl(var(--chart-2))" },
  { name: "Sáng tạo hình ảnh/video", value: 31, category: "Sáng tạo", color: "hsl(var(--chart-1))" },
  { name: "Phát triển nội dung", value: 29, category: "Sáng tạo", color: "hsl(var(--chart-1))" },
  { name: "Tra cứu thuốc và sản phẩm chăm sóc sức khỏe", value: 29, category: "Sức khỏe và thể chất", color: "hsl(var(--chart-3))" },
  { name: "Nhận thông tin cập nhật về xu hướng/mạng xã hội/sự kiện", value: 28, category: "Giải trí và giao lưu", color: "hsl(var(--chart-5))" },
  { name: "Tra cứu các vấn đề sức khỏe", value: 27, category: "Sức khỏe và thể chất", color: "hsl(var(--chart-3))" },
];

const legendData = [
    { name: "Giải trí và giao lưu", color: "hsl(var(--chart-5))" },
    { name: "Công việc và giáo dục", color: "hsl(var(--chart-2))" },
    { name: "Thói quen hàng ngày", color: "hsl(var(--chart-4))" },
    { name: "Sáng tạo", color: "hsl(var(--chart-1))" },
    { name: "Sức khỏe và thể chất", color: "hsl(var(--chart-3))" },
]

const CustomLabel = ({ viewBox, value, name }: any) => {
    const { cx, cy } = viewBox;
    const lines = name.split('\n');
    const lineHeight = 16;
    const totalHeight = lines.length * lineHeight;
    const startY = cy - totalHeight / 2 + lineHeight / 2;

    return (
        <g>
            <text x={cx} y={cy - totalHeight / 2 - 5} textAnchor="middle" dominantBaseline="central" className="fill-foreground font-bold text-2xl">
                {`${value}%`}
            </text>
            {lines.map((line:string, index:number) => (
                <text key={index} x={cx} y={startY + index * lineHeight + 5} textAnchor="middle" dominantBaseline="central" className="fill-muted-foreground text-xs">
                    {line}
                </text>
            ))}
        </g>
    );
};

export function AiActivitiesChart() {
  return (
    <Card className="my-8">
      <CardHeader>
        <CardTitle className="text-center">10 hoạt động có tỷ lệ áp dụng AI cao nhất</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {data.map((entry, index) => (
                <div key={index} className="flex flex-col items-center">
                    <ResponsiveContainer width="100%" height={150}>
                        <PieChart>
                            <Pie
                                data={[{value: entry.value}, {value: 100 - entry.value}]}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={60}
                                startAngle={90}
                                endAngle={450}
                                paddingAngle={0}
                                stroke="none"
                            >
                                <Cell fill={entry.color} />
                                <Cell fill="hsl(var(--muted))" />
                                <Label 
                                  content={<CustomLabel value={entry.value} name={entry.name.replace(/\//g, '/\n').replace(/ và /g, ' và\n').replace(/ với /g, ' với\n')} />} 
                                  position="center" 
                                />
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            ))}
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6 text-sm text-muted-foreground">
            {legendData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                </div>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}
