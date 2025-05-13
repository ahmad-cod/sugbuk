const WORDS_PER_MINUTE = 200; // Average reading speed

export function getReadTime(content: string[]) {
  const words = content.reduce((acc, paragraph) => acc + paragraph.split(' ').length, 0);
  const minutes = Math.ceil(words / WORDS_PER_MINUTE);

  return `${minutes} min read`;
}