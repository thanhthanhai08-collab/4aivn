// src/lib/chartAdapter.ts
import type { ChartConfig } from "@/components/news/charts/chart";

/**
 * Chuyển đổi và chuẩn hóa dữ liệu cấu hình thô từ Firestore.
 * Bổ sung các giá trị mặc định để đảm bảo biểu đồ không bị lỗi.
 * @param rawConfig - Cấu hình thô từ Firestore cho một biểu đồ.
 * @returns Cấu hình đã được chuẩn hóa và an toàn để sử dụng.
 */
export function adaptChartConfig(rawConfig: any): ChartConfig {
  const defaults = {
    // Sửa lại để đọc đúng 'type' và 'title' từ Firestore
    type: rawConfig.type || 'bar', 
    title: rawConfig.title || '',
    unit: rawConfig.unit || '',
    indexKey: 'name', // Giữ nguyên 'name' để khớp với cấu trúc dữ liệu
    data: Array.isArray(rawConfig.data) ? rawConfig.data : [],
    colors: rawConfig.colors || ["#5b7ce0", "#90cd97", "#f4a261", "#e76f51", "#2a9d8f"],
    layout: rawConfig.layout || 'horizontal',
    showGrid: rawConfig.showGrid !== false,
    showLegend: rawConfig.showLegend !== false,
    showTooltip: rawConfig.showTooltip !== false,
    source: rawConfig.source || '',
  };

  const config: ChartConfig = { ...defaults, ...rawConfig };

  // Tự động tạo dataKeys nếu chưa có, dựa trên các key trong object dữ liệu đầu tiên
  if (!config.dataKeys && config.data.length > 0) {
    const keys = Object.keys(config.data[0]).filter(k => k !== config.indexKey && k !== 'color');
    config.dataKeys = keys.map((key, i) => ({
      name: key,
      label: key, // Label mặc định là tên key
      color: config.colors[i % config.colors.length]
    }));
  } else if (!config.dataKeys) {
    config.dataKeys = [];
  }

  return config;
}
