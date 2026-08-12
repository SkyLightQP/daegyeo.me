import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** description HTML 안의 <a>를 하이퍼링크로 보이게 하는 공통 스타일 */
export const descriptionLinkClass =
  '[&_a]:text-blue-400 [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-blue-500';

const ATTR_PATTERN = (name: string) => new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i');

const REQUIRED_REL = ['noopener', 'noreferrer'];

export const withSafeLinks = (html: string) =>
  html.replace(/<a\b([^>]*)>/gi, (tag, attrs: string) => {
    const href = attrs.match(ATTR_PATTERN('href'));
    const url = href ? (href[1] ?? href[2] ?? href[3] ?? '') : '';
    // 페이지 내부 앵커는 새 탭으로 열 이유가 없다
    if (!url || url.startsWith('#')) return tag;

    let next = attrs;

    const relAttr = next.match(ATTR_PATTERN('rel'));
    const rel = relAttr ? (relAttr[1] ?? relAttr[2] ?? relAttr[3] ?? '') : '';
    const tokens = rel.split(/\s+/).filter(Boolean);
    REQUIRED_REL.forEach((token) => {
      if (!tokens.includes(token)) tokens.push(token);
    });
    const relText = ` rel="${tokens.join(' ')}"`;
    next = relAttr ? next.replace(relAttr[0], relText) : `${next}${relText}`;

    if (!ATTR_PATTERN('target').test(next)) next = `${next} target="_blank"`;

    return `<a${next}>`;
  });

export const formatPeriod = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return '';
  return /^\(.*\)$/.test(trimmed) ? trimmed : `(${trimmed})`;
};
