export const MAX_TITLE_CHARACTERS = 60;

type LocalizedTitle = {
  vi?: string;
  en?: string;
};

export function countUnicodeCharacters(value: string): number {
  return Array.from(value.trim()).length;
}

export function validateTitleLengths(
  title: LocalizedTitle,
  maxCharacters = MAX_TITLE_CHARACTERS,
) {
  const lengths = {
    vi: countUnicodeCharacters(title.vi || ''),
    en: countUnicodeCharacters(title.en || ''),
  };
  const errors: string[] = [];

  if (!title.vi?.trim()) errors.push('title.vi không được để trống');
  if (!title.en?.trim()) errors.push('title.en không được để trống');
  if (lengths.vi > maxCharacters) {
    errors.push(`title.vi có ${lengths.vi} ký tự, vượt giới hạn ${maxCharacters}`);
  }
  if (lengths.en > maxCharacters) {
    errors.push(`title.en có ${lengths.en} ký tự, vượt giới hạn ${maxCharacters}`);
  }

  if (errors.length > 0) {
    throw new Error(`Kiểm tra tiêu đề thất bại:\n- ${errors.join('\n- ')}`);
  }

  return lengths;
}
