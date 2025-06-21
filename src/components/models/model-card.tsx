// src/components/models/model-card.tsx
import Image from "next/image";
import Link from "next/link";
import { Star, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { AIModel } from "@/lib/types";

interface ModelCardProps {
  model: AIModel;
}

export function ModelCard({ model }: ModelCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Image 
              src={model.logoUrl} 
              alt={`Logo ${model.name}`} 
              width={48} 
              height={48} 
              className="rounded-md object-contain"
              data-ai-hint="logo company" 
            />
            <div>
              <CardTitle className="text-xl font-headline group-hover:text-primary">
                <Link href={`/models/${model.id}`} className="hover:underline">
                  {model.name}
                </Link>
              </CardTitle>
              <Badge variant="outline" className="mt-1">{model.type}</Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardDescription className="text-sm line-clamp-3">{model.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center border-t">
        <div className="flex-grow">
          {model.myRating !== undefined ? (
            <div>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 transition-colors ${
                      star <= (model.myRating || 0)
                        ? "fill-amber-400 text-amber-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Đánh giá của bạn: {model.myRating} sao
              </p>
            </div>
          ) : model.userRating ? (
            <div className="flex items-center text-sm text-amber-500">
              <Star className="h-4 w-4 mr-1 fill-amber-400 text-amber-500" />
              {model.userRating.toFixed(1)}
            </div>
          ) : (
            <div className="h-5" /> // Placeholder to keep height consistent
          )}
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/models/${model.id}`}>
            Xem chi tiết
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
