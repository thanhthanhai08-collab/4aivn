// src/components/tools/tool-card.tsx
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Star, ThumbsUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Tool } from "@/lib/types";

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Image 
              src={tool.logoUrl} 
              alt={`Logo ${tool.name}`} 
              width={48} 
              height={48} 
              className="rounded-md object-contain"
              data-ai-hint="logo company" 
            />
            <div>
              <CardTitle className="text-xl font-headline group-hover:text-primary">
                <Link href={`/tools/${tool.id}`} className="hover:underline">
                  {tool.name}
                </Link>
              </CardTitle>
              <Badge variant="outline" className="mt-1">{tool.context}</Badge>
            </div>
          </div>
          {tool.ranking && (
            <div className="flex items-center text-sm text-primary bg-accent px-2 py-1 rounded-full">
              <ThumbsUp className="h-4 w-4 mr-1" />
              #{tool.ranking}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardDescription className="text-sm line-clamp-3">{tool.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center border-t">
        <div className="flex items-center text-sm text-amber-500">
          {tool.userRating && (
            <>
              <Star className="h-4 w-4 mr-1 fill-amber-400 text-amber-500" />
              {tool.userRating.toFixed(1)}
            </>
          )}
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/tools/${tool.id}`}>
            Xem chi tiết
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
