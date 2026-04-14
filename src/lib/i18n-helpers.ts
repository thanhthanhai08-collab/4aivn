/**
 * Kiểu dữ liệu cho trường song ngữ.
 * Bài cũ: string (chỉ tiếng Việt)
 * Bài mới: Map { vi: string, en: string }
 */
export type LocalizedField = string | { vi: string; en: string };

/**
 * Trích xuất giá trị đã localize từ Map hoặc string thuần.
 * - Nếu field là Map → trả về value theo locale
 * - Nếu field là string thuần (bài cũ) → trả về string đó
 * - Fallback: locale → vi → en → ''
 */
export function getLocalized(
  field: LocalizedField | undefined | null,
  locale: string
): string {
  if (!field) return '';
  if (typeof field === 'string') return field;
  const loc = locale as 'vi' | 'en';
  return field[loc] || field['vi'] || field['en'] || '';
}

/**
 * Lấy slug phù hợp với locale.
 * Bài cũ (slug là string) → trả về slug đó (document ID)
 * Bài mới (slug là Map) → trả về slug theo locale
 */
export function getLocalizedSlug(
  slug: LocalizedField | undefined | null,
  locale: string
): string {
  if (!slug) return '';
  if (typeof slug === 'string') return slug;
  const loc = locale as 'vi' | 'en';
  return slug[loc] || slug['vi'] || '';
}

/**
 * Kiểm tra xem field có phải là Map song ngữ không
 */
export function isLocalizedMap(field: LocalizedField | undefined | null): field is { vi: string; en: string } {
  return typeof field === 'object' && field !== null && 'vi' in field;
}
