// src/components/models/o3-detailed-benchmark-charts.tsx
"use client"

import * as React from "react"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"
import type { AIModel, BenchmarkData } from "@/lib/types";
import { cn } from "@/lib/utils"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { db } from "@/lib/firebase";
import { collectionGroup, query, where, orderBy, limit, getDocs, doc, getDoc } from "firebase/firestore";
import { Skeleton } from "../ui/skeleton";

// Define benchmark categories to display
const BENCHMARK_CATEGORIES = [
  { key: 'aime', title: 'Toán học', subtitle: 'AIME 2025' },
  { key: 'livecode', title: 'Khả năng code', subtitle: 'LiveCodeBench' },
  { key: 'mmlu', title: 'Kiến thức tổng hợp', subtitle: 'MMLU-Pro' },
  { key: 'ifbench', title: 'Khả năng tuân thủ prompt', subtitle: 'IFBench' },
  { key: 'gpqa', title: 'Lý luận nâng cao', subtitle: 'GPQA' },
  { key: 'aa-lcr', title: 'Lý luận ngữ cảnh dài', subtitle: 'AA-LCR' },
];

interface BenchmarkChartProps {
    title: string;
    subtitle: string;
    data: (AIModel & { benchmarkScore: number, isCurrent?: boolean })[];
}

const BenchmarkChart = ({ title, subtitle, data }: BenchmarkChartProps) => {
    // Sort data by score in descending order for correct visualization
    const sortedData = [...data].sort((a, b) => b.benchmarkScore - a.benchmarkScore);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="space-y-4">
                    {sortedData.map((model) => {
                        return (
                            <div key={model.id} className="space-y-1">
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center space-x-2">
                                        <Image src={model.logoUrl} alt={`${model.name} logo`} width={16} height={16} className="rounded-full" />
                                        <span className={cn("truncate", model.isCurrent && "font-bold text-primary")}>{model.name}</span>
                                    </div>
                                    <span className={cn("font-medium", model.isCurrent && "text-primary")}>{model.benchmarkScore.toFixed(1)}%</span>
                                </div>
                                <div className="relative h-3 w-full overflow-hidden rounded-full bg-muted">
                                    <Progress value={model.benchmarkScore} className={cn("absolute h-full w-full", model.isCurrent ? "[&>div]:bg-primary" : "[&>div]:bg-muted-foreground/50")} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}

const ChartSkeleton = () => (
    <Card>
        <CardHeader>
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-1/3 mt-1" />
        </CardHeader>
        <CardContent className="space-y-4">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-1">
                    <div className="flex justify-between">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-4 w-1/6" />
                    </div>
                    <Skeleton className="h-3 w-full" />
                </div>
            ))}
        </CardContent>
    </Card>
);

interface CategoryComparisonData {
  categoryKey: string;
  data: (AIModel & { benchmarkScore: number; isCurrent?: boolean })[];
}

export function O3DetailedBenchmarkCharts({ currentModel }: { currentModel: AIModel }) {
    const [comparisonData, setComparisonData] = useState<CategoryComparisonData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
        const fetchAllComparisonData = async () => {
            setIsLoading(true);
            const allData: CategoryComparisonData[] = [];

            // Fetch details for all models once to avoid repeated calls inside the loop
            const modelsSnapshot = await getDocs(query(collectionGroup(db, 'models')));
            const allModelsMap = new Map<string, AIModel>();
            modelsSnapshot.forEach(docSnap => {
                allModelsMap.set(docSnap.id, { id: docSnap.id, ...docSnap.data() } as AIModel);
            });

            for (const category of BENCHMARK_CATEGORIES) {
                const currentModelScore = currentModel.benchmarks?.find(b => b.name === category.key)?.score;

                if (currentModelScore === undefined) {
                    continue; // Skip if current model doesn't have this benchmark
                }

                // Query for models with higher scores
                const higherQuery = query(
                    collectionGroup(db, 'benchmarks'),
                    where('name', '==', category.key),
                    where('score', '>', currentModelScore),
                    orderBy('score', 'asc'),
                    limit(3)
                );
                // Query for models with lower scores
                const lowerQuery = query(
                    collectionGroup(db, 'benchmarks'),
                    where('name', '==', category.key),
                    where('score', '<', currentModelScore),
                    orderBy('score', 'desc'),
                    limit(3)
                );

                const [higherSnapshot, lowerSnapshot] = await Promise.all([
                    getDocs(higherQuery),
                    getDocs(lowerQuery)
                ]);

                const getModelDataFromBenchmarkDoc = (docSnap: any): (AIModel & { benchmarkScore: number }) | null => {
                    const modelId = docSnap.ref.parent.parent?.id;
                    if (!modelId) return null;
                    
                    const modelDetails = allModelsMap.get(modelId);
                    if (!modelDetails) return null;

                    return {
                        ...modelDetails,
                        benchmarkScore: docSnap.data().score,
                    };
                };

                const higherModels = higherSnapshot.docs.map(getModelDataFromBenchmarkDoc).filter(Boolean) as (AIModel & { benchmarkScore: number })[];
                const lowerModels = lowerSnapshot.docs.map(getModelDataFromBenchmarkDoc).filter(Boolean) as (AIModel & { benchmarkScore: number })[];
                
                const combined = [
                    ...higherModels,
                    { ...currentModel, benchmarkScore: currentModelScore, isCurrent: true },
                    ...lowerModels
                ];

                if(combined.length > 1) {
                    allData.push({ categoryKey: category.key, data: combined });
                }
            }
            setComparisonData(allData);
            setIsLoading(false);
        };

        if (currentModel) {
            fetchAllComparisonData();
        }
    }, [currentModel]);
    
    if (isLoading) {
        return (
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {BENCHMARK_CATEGORIES.map(category => <ChartSkeleton key={category.key} />)}
            </div>
        )
    }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BENCHMARK_CATEGORIES.map(category => {
                const chartData = comparisonData.find(d => d.categoryKey === category.key);
                if (!chartData || chartData.data.length < 2) return null; // Don't render if no comparison data
                
                return (
                    <BenchmarkChart 
                        key={category.key}
                        title={category.title} 
                        subtitle={category.subtitle} 
                        data={chartData.data} 
                    />
                );
            })}
        </div>
    )
}
