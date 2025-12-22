// src/components/tools/tool-card-small.tsx
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Tool } from "@/lib/types";

interface ToolCardSmallProps {
  tool: Tool;
}

export function ToolCardSmall({ tool }: ToolCardSmallProps) {
  const averageRating = tool.ratingCount && tool.ratingCount > 0 
    ? (tool.totalStars || 0) / tool.ratingCount 
    : 0;

  return (
    <Card className="shadow-none border-0 hover:bg-accent transition-colors">
      <Link href={`/cong-cu/${tool.id}`} className="flex items-center space-x-4 p-3">
        <Image 
          src={tool.logoUrl} 
          alt={`Logo ${tool.name}`} 
          width={40} 
          height={40} 
          className="rounded-md object-contain"
           
        />
        <div className="flex-grow">
          <p className="font-semibold">{tool.name}</p>
          <div className="flex items-center text-xs text-muted-foreground mt-1">
             {averageRating > 0 && (
                <>
                    <Star className="h-3 w-3 mr-1 fill-amber-400 text-amber-500" />
                    <span>{averageRating.toFixed(1)}</span>
                    <span className="mx-1">•</span>
                </>
             )}
             <span>{tool.context}</span>
          </div>
        </div>
        <Badge variant="outline">Free</Badge>
      </Link>
    </Card>
  );
}
