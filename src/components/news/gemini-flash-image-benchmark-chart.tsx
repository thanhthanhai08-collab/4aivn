// src/components/news/gemini-flash-image-benchmark-chart.tsx
"use client"

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: 'Gemini 2.0 Flash Image', throughput: 168000, elo: 995, color: '#FFFFFF' },
  { name: 'FLUX.1 Kontext [max]', throughput: 70000, elo: 1070, color: '#8884d8' },
  { name: 'ChatGPT 4o / GPT Image 1 (High)', throughput: 28000, elo: 1125, color: '#82ca9d' },
  { name: 'Imagen 4 Ultra 06-06', throughput: 125000, elo: 1140, color: '#ffc658' },
  { name: 'Gemini 2.5 Flash Image', throughput: 128000, elo: 1150, color: '#4185F4' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    return (
      <div className="bg-background border border-border p-3 rounded-lg shadow-lg">
        <p className="font-bold text-base mb-2">{dataPoint.name}</p>
        <p style={{ color: dataPoint.color }}>
          Điểm Elo LMArena: {dataPoint.elo.toLocaleString()}
        </p>
        <p style={{ color: dataPoint.color }}>
          Tốc độ: {(dataPoint.throughput / 1000).toLocaleString()}k pixels/sec
        </p>
      </div>
    );
  }
  return null;
};

const RenderCustomizedLabel = (props: any) => {
  const { x, y, value, index } = props;
  const dataPoint = data[index];
  const nameLines = dataPoint.name.split(' ');
  const yOffset = nameLines.length > 2 ? -15 : -10;

  return (
    <text x={x} y={y + yOffset} dy={-4} fill="#e0e0e0" fontSize={12} textAnchor="middle">
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
        <CardTitle>Bảng xếp hạng tổng thể trên LMArena</CardTitle>
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
              unit="k"
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
                <Label value="Điểm Elo LMArena" angle={-90} position="insideLeft" offset={-10} style={{ textAnchor: 'middle', fill: '#a0a0a0' }} />
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
