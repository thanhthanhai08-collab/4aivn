
// src/components/models/o3-detailed-benchmark-charts.tsx
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"
import type { AIModel } from "@/lib/types"; 
import { cn } from "@/lib/utils"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { db } from "@/lib/firebase";
import { collectionGroup, query, where, orderBy, limit, getDocs, doc, getDoc } from "firebase/firestore";
import { Skeleton } from "../ui/skeleton";

// Define benchmark categories to display
const BENCHMARK_CATEGORIES = [
  { key: 'aime-2025', title: 'Toán học', subtitle: 'AIME 2025' },
  { key: 'livecodebench', title: 'Khả năng code', subtitle: 'LiveCodeBench' },
  { key: 'mmlu-pro', title: 'Kiến thức tổng hợp', subtitle: 'MMLU-Pro' },
  { key: 'ifbench', title: 'Khả năng tuân thủ prompt', subtitle: 'IFBench' },
  { key: 'gpqa-diamond', title: 'Lý luận nâng cao', subtitle: 'GPQA Diamond' },
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

const getModelDataFromBenchmarkDoc = async (docSnap: any, modelsMap: Map<string, AIModel>): Promise<(AIModel & { benchmarkScore: number }) | null> => {
    const modelId = docSnap.ref.parent.parent?.id;
    if (!modelId) return null;

    let modelDetails = modelsMap.get(modelId);
    if (!modelDetails) {
        const modelDocRef = doc(db, 'models', modelId);
        const modelDocSnap = await getDoc(modelDocRef);
        if (modelDocSnap.exists()) {
            modelDetails = { id: modelId, ...modelDocSnap.data() } as AIModel;
            modelsMap.set(modelId, modelDetails);
        } else {
            return null;
        }
    }
    
    return {
        ...modelDetails,
        benchmarkScore: docSnap.data().score,
    };
};

export function O3DetailedBenchmarkCharts({ currentModel }: { currentModel: AIModel }) {
    const [comparisonData, setComparisonData] = useState<CategoryComparisonData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAllComparisonData = async () => {
            setIsLoading(true);
            const allData: CategoryComparisonData[] = [];
            const modelsMap = new Map<string, AIModel>([[currentModel.id, currentModel]]);

            for (const category of BENCHMARK_CATEGORIES) {
                const currentModelScore = currentModel.benchmarks?.find(b => b.name === category.subtitle)?.score;

                if (currentModelScore === undefined) {
                    continue; 
                }

                try {
                    // Simplified Query: Fetch all models for a specific benchmark, ordered by score.
                    // This is less efficient in terms of data downloaded but simpler and requires a less complex index.
                    const q = query(
                        collectionGroup(db, 'benchmarks'),
                        where('name', '==', category.subtitle),
                        orderBy('score', 'desc')
                    );
                    
                    const querySnapshot = await getDocs(q);

                    const modelPromises = querySnapshot.docs.map(docSnap => getModelDataFromBenchmarkDoc(docSnap, modelsMap));
                    const allModelsForCategory = (await Promise.all(modelPromises)).filter(Boolean) as (AIModel & { benchmarkScore: number })[];

                    const currentIndex = allModelsForCategory.findIndex(m => m.id === currentModel.id);
                    
                    if (currentIndex === -1) {
                         // If current model not in benchmark, just show it alone
                        allData.push({ categoryKey: category.key, data: [{...currentModel, benchmarkScore: currentModelScore, isCurrent: true}] });
                        continue;
                    }

                    // Find up to 3 models with a higher score and up to 3 with a lower score.
                    const higherModels = allModelsForCategory.slice(Math.max(0, currentIndex - 3), currentIndex);
                    const lowerModels = allModelsForCategory.slice(currentIndex + 1, currentIndex + 4);

                    const combined = [
                        ...higherModels.reverse(), // reverse to show highest score first
                        { ...currentModel, benchmarkScore: currentModelScore, isCurrent: true },
                        ...lowerModels
                    ];
                    
                    allData.push({ categoryKey: category.key, data: combined });

                } catch (error) {
                    console.error(`Error fetching comparison data for ${category.title}:`, error);
                }
            }
            setComparisonData(allData);
            setIsLoading(false);
        };

        if (currentModel) {
            fetchAllComparisonData();
        }
    }, [currentModel]);
    
    const renderedCharts = BENCHMARK_CATEGORIES.map(category => {
        const chartData = comparisonData.find(d => d.categoryKey === category.key);
        if (!chartData || chartData.data.length === 0) return null;
        
        return (
            <BenchmarkChart 
                key={category.key}
                title={category.title} 
                subtitle={category.subtitle} 
                data={chartData.data} 
            />
        );
    }).filter(Boolean);


    if (isLoading) {
        return (
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {BENCHMARK_CATEGORIES.map(category => <ChartSkeleton key={category.key} />)}
            </div>
        )
    }

    if (renderedCharts.length === 0) {
        return (
            <div className="text-center py-4 space-y-2">
                <p className="font-semibold text-xl">Dữ liệu Benchmark Chi tiết</p>
                <p className="text-muted-foreground">Mô hình này chưa có điểm chuẩn so sánh cho các hạng mục đã chọn.</p>
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {renderedCharts}
        </div>
    )
}
