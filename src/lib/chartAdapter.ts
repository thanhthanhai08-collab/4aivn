// src/lib/chartAdapter.ts
import type { ChartConfig, ChartDataItem, ChartDataKey } from "@/types/chart";

/**
 * Chuyển đổi và chuẩn hóa dữ liệu cấu hình thô từ Firestore.
 * Bổ sung các giá trị mặc định để đảm bảo biểu đồ không bị lỗi.
 * @param rawConfig - Cấu hình thô từ Firestore.
 * @returns Cấu hình đã được chuẩn hóa và an toàn để sử dụng.
 */
export function adaptChartConfig(rawConfig: any): ChartConfig {
  // Cung cấp các giá trị mặc định "an toàn"
  const defaults: Partial<ChartConfig> = {
    type: 'bar',
    layout: 'horizontal',
    showLegend: true,
    showTooltip: true,
    showGrid: true,
    title: '',
    description: '',
    source: '',
    data: [],
    dataKeys: [],
    indexKey: 'name',
  };

  const config: ChartConfig = {
    ...defaults,
    ...rawConfig,
  };

  // Đảm bảo data và dataKeys luôn là mảng
  config.data = Array.isArray(rawConfig.data) ? rawConfig.data : [];
  config.dataKeys = Array.isArray(rawConfig.dataKeys) ? rawConfig.dataKeys : [];

  return config;
}
