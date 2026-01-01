// src/types/chart.ts

// Định nghĩa cấu trúc cho mỗi dòng dữ liệu trong biểu đồ
export interface ChartDataItem {
  [key: string]: string | number;
}

// Định nghĩa cấu trúc cho mỗi "key" dữ liệu sẽ được vẽ (ví dụ: mỗi cột, mỗi đường)
export interface ChartDataKey {
  name: string;      // Tên của key (phải khớp với key trong ChartDataItem)
  color: string;     // Mã màu (ví dụ: hsl(var(--chart-1)))
  label?: string;    // Nhãn hiển thị trong chú thích (legend) và tooltip
  unit?: string;     // Đơn vị (ví dụ: '%', 'USD')
}

// Cấu hình chung cho một biểu đồ
export interface ChartConfig {
  type: 'bar' | 'line' | 'radar'; // Loại biểu đồ
  data: ChartDataItem[];          // Mảng dữ liệu để vẽ
  dataKeys: ChartDataKey[];       // Mảng các key dữ liệu sẽ được vẽ
  indexKey: string;               // Key chính trên trục X (ví dụ: 'name' hoặc 'date')
  
  title?: string;                 // Tiêu đề của biểu đồ
  description?: string;           // Mô tả ngắn gọn bên dưới tiêu đề
  layout?: 'horizontal' | 'vertical'; // Bố cục cho biểu đồ cột ('vertical' là cột đứng, 'horizontal' là cột ngang)
  showLegend?: boolean;           // Có hiển thị chú thích (legend) hay không
  showTooltip?: boolean;          // Có hiển thị tooltip khi di chuột qua hay không
  showGrid?: boolean;             // Có hiển thị lưới nền hay không
  source?: string;                // Nguồn dữ liệu
}

// Props cho các component biểu đồ con
export interface ChartComponentProps {
  config: ChartConfig;
}
