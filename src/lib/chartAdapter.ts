// src/lib/chartAdapter.ts
import type { ChartConfig } from "@/types/chart";

/**
 * Chuyển đổi và chuẩn hóa dữ liệu cấu hình thô từ Firestore.
 * Bổ sung các giá trị mặc định để đảm bảo biểu đồ không bị lỗi.
 * @param rawConfig - Cấu hình thô từ Firestore.
 * @returns Cấu hình đã được chuẩn hóa và an toàn để sử dụng.
 */
export function adaptChartConfig(rawConfig: any): ChartConfig {
  return {
    // Khớp với 'type' và 'title' trong Map chartConfig của bạn trên Firestore
    type: rawConfig.type || 'bar', 
    title: rawConfig.title || '',
    data: Array.isArray(rawConfig.data) ? rawConfig.data : [],
    colors: Array.isArray(rawConfig.colors) ? rawConfig.colors : ["#5b7ce0", "#90cd97"],
    
    // Các giá trị mặc định cho UI
    layout: rawConfig.layout || 'horizontal',
    indexKey: 'name', // Khớp với trường 'name' bạn đã nhập
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    source: rawConfig.source || '',
  };
}
