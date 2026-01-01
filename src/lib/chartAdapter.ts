// src/lib/chartAdapter.ts
import type { ChartConfig } from "@/components/news/charts/chart";

/**
 * Chuyển đổi và chuẩn hóa dữ liệu cấu hình thô từ Firestore.
 * Bổ sung các giá trị mặc định để đảm bảo biểu đồ không bị lỗi.
 * @param rawConfig - Cấu hình thô từ Firestore.
 * @returns Cấu hình đã được chuẩn hóa và an toàn để sử dụng.
 */
export function adaptChartConfig(rawConfig: any): ChartConfig {
  const defaults = {
    type: rawConfig.type || 'bar',
    title: rawConfig.title || '',
    unit: rawConfig.unit || '', // Trường mới để nhận đơn vị như "%" hoặc "Điểm"
    indexKey: 'name', // Cố định phím 'name' để khớp Firestore
    data: Array.isArray(rawConfig.data) ? rawConfig.data : [],
    colors: rawConfig.colors || ["#5b7ce0", "#90cd97"],
    layout: 'horizontal',
  };

  const config = { ...defaults, ...rawConfig };

  // Tự động tạo dataKeys từ các phím mô hình (GPT-4, o1)
  if (config.data.length > 0) {
    const keys = Object.keys(config.data[0]).filter(k => k !== 'name' && k !== 'color');
    config.dataKeys = keys.map((key, i) => ({
      name: key,
      label: key,
      color: config.colors[i] || "#8884d8"
    }));
  }

  return config;
}
