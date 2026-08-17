import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import sanitizeHtml from 'sanitize-html';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** description HTML 안의 <a>를 하이퍼링크로 보이게 하는 공통 스타일 */
export const descriptionLinkClass =
  '[&_a]:text-blue-400 [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-blue-500';

const ATTR_PATTERN = (name: string) => new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i');

const REQUIRED_REL = ['noopener', 'noreferrer'];

const withSafeLinks = (html: string) =>
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

const BLOCK_TAGS = 'p|div|ul|ol|li|h[1-6]|blockquote|pre|hr|br|table|thead|tbody|tr|td|th|section|article';

const CLOSES_BLOCK = new RegExp(`</?(?:${BLOCK_TAGS})\\b[^>]*>\\s*$`, 'i');
const OPENS_BLOCK = new RegExp(`^\\s*</?(?:${BLOCK_TAGS})\\b`, 'i');

/** textarea에서 친 줄바꿈은 HTML에서 공백으로 접히므로 <br />로 바꿔준다.
 *  단 블록 태그 사이의 줄바꿈은 HTML 들여쓰기일 뿐이라 그대로 둔다. */
const withLineBreaks = (html: string) =>
  html.replace(/\r?\n/g, (match, index: number, source: string) => {
    const before = source.slice(0, index);
    const after = source.slice(index + match.length);
    return CLOSES_BLOCK.test(before) || OPENS_BLOCK.test(after) ? match : `<br />${match}`;
  });

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: ['p', 'div', 'br', 'strong', 'em', 'b', 'i', 'u', 'ul', 'ol', 'li', 'a', 'blockquote', 'span'],
  allowedAttributes: { a: ['href', 'title'] },
  allowedSchemesByTag: { a: ['http', 'https', 'mailto'] },
};

/** CMS description은 관리자가 직접 입력한 HTML이므로 허용 태그/속성/URL scheme 밖은 모두 제거한다 */
const sanitizeDescription = (html: string) => sanitizeHtml(html, SANITIZE_OPTIONS);

/** description 문자열을 화면에 뿌릴 HTML로 변환한다 */
export const renderDescription = (html: string) => withLineBreaks(withSafeLinks(sanitizeDescription(html)));

export const formatPeriod = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return '';
  return /^\(.*\)$/.test(trimmed) ? trimmed : `(${trimmed})`;
};
