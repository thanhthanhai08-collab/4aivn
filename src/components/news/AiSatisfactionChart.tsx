// src/components/news/AiSatisfactionChart.tsx
"use client"

import Image from "next/image"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: 'ChatGPT', score: 51, logo: '/image/Logo Open AI cho bảng xếp hạng.png' },
  { name: 'AI Hay', score: 47, logo: 'https://placehold.co/24x24/1E90FF/FFFFFF/PNG?text=H' },
  { name: 'Gemini', score: 36, logo: '/image/Logo Gemini cho bảng xếp hạng.png' },
  { name: 'Meta AI', score: 27, logo: 'https://placehold.co/24x24/8A2BE2/FFFFFF/PNG?text=O' },
  { name: 'Copilot', score: 26, logo: 'https://placehold.co/24x24/FF4500/FFFFFF/PNG?text=C' },
  { name: 'Deepseek', score: 26, logo: '/image/Logo Deepseek cho bảng xếp hạng.png' }
];

// Custom Legend
const renderLegend = () => {
    return (
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 mb-6">
            {data.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Image src={entry.logo} alt={`${entry.name} logo`} width={18} height={18} className="rounded-full" />
                    <span>{entry.name}</span>
                </div>
            ))}
        </div>
    );
};

export function AiSatisfactionChart() {
  return (
    <Card className="my-8">
      <CardHeader className="items-center">
        <CardTitle>Điểm hài lòng của khách hàng</CardTitle>
        <CardDescription>(Cơ sở: Khách hàng hiện tại của từng nền tảng)</CardDescription>
      </CardHeader>
      <CardContent>
        {renderLegend()}
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 20, bottom: 20 }}
            barSize={16} // Make bars thicker
            barCategoryGap="55%"
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={false} />
            <XAxis type="number" hide domain={[0, 100]} />
            <YAxis type="category" dataKey="name" hide />
            <Tooltip cursor={{fill: 'transparent'}} content={() => null} />
            <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 4, 4]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
