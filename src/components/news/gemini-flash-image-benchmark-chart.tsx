// src/components/news/gemini-flash-image-benchmark-chart.tsx
"use client"

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: 'Gemini 2.0\nFlash Image', throughput: 173000, elo: 988, color: '#FFFFFF' },
  { name: 'FLUX.1\nKontext [max]', throughput: 75000, elo: 1075, color: '#8884d8' },
  { name: 'ChatGPT 4o /\nGPT Image 1 (High)', throughput: 28000, elo: 1129, color: '#82ca9d' },
  { name: 'Imagen 4\nUltra 06-06', throughput: 119000, elo: 1135, color: '#ffc658' },
  { name: 'Gemini 2.5\nFlash Image', throughput: 123000, elo: 1147, color: '#4185F4' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    return (
      <div className="bg-background/80 backdrop-blur-sm border border-border p-3 rounded-lg shadow-lg text-sm">
        <table className="w-full text-left">
            <thead>
                <tr className="border-b border-border/50">
                    <th className="pr-4 pb-1 font-semibold">Model</th>
                    <th className="px-4 pb-1 font-semibold text-center">Tốc độ</th>
                    <th className="pl-4 pb-1 font-semibold text-center">Điểm Elo LMArena</th>
                </tr>
            </thead>
            <tbody>
                <tr className="font-medium">
                    <td className="pr-4 pt-1">{dataPoint.name.replace('\n', ' ')}</td>
                    <td className="px-4 pt-1 text-center">{(dataPoint.throughput / 1000)}k</td>
                    <td className="pl-4 pt-1 text-center">{dataPoint.elo}</td>
                </tr>
            </tbody>
        </table>
      </div>
    );
  }
  return null;
};

const RenderCustomizedLabel = (props: any) => {
  const { x, y, value, index } = props;
  const dataPoint = data[index];
  const nameLines = dataPoint.name.split('\n');
  
  let yOffset: number;
  let dy: string | number;

  if (dataPoint.name.includes('Imagen 4')) {
    // Move this specific label below the dot
    yOffset = 10;
    dy = '1.2em';
  } else {
    // Keep other labels above the dot
    yOffset = nameLines.length > 1 ? -15 : -10;
    dy = -4;
  }

  return (
    <text x={x} y={y + yOffset} dy={dy} fill="#e0e0e0" fontSize={12} textAnchor="middle">
      {nameLines.map((line, i) => (
        <tspan key={i} x={x} dy={i > 0 ? "1.2em" : 0}>{line}</tspan>
      ))}
    </text>
  );
};


export function GeminiFlashImageBenchmarkChart() {
  return (
    <Card className="my-8 bg-[#1a1a1a] text-white border-gray-700">
      <CardHeader className="text-center">
        <CardTitle>Text to image: Bảng xếp hạng tổng thể trên LMArena</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 40,
              left: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis 
              type="number" 
              dataKey="throughput" 
              name="Tốc độ" 
              domain={[0, 180000]}
              tickFormatter={(tick) => `${tick / 1000}k`}
              stroke="#a0a0a0"
            >
                <Label value="Tốc độ (pixels per second)" offset={-25} position="insideBottom" fill="#a0a0a0" />
            </XAxis>
            <YAxis 
                type="number" 
                dataKey="elo" 
                name="Điểm Elo LMArena" 
                domain={[950, 1200]}
                stroke="#a0a0a0"
                width={80}
            >
                <Label value="Điểm Elo LMArena" angle={-90} position="insideLeft" offset={5} style={{ textAnchor: 'middle', fill: '#a0a0a0' }} />
            </YAxis>
            <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
            <Scatter data={data} fill="#8884d8" shape="circle" label={<RenderCustomizedLabel />}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        <p className="text-xs text-muted-foreground mt-4 text-center">Nguồn: Google DeepMind</p>
      </CardContent>
    </Card>
  )
}
