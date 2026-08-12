'use client';

import { CSSProperties, FC } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Eye, EyeOff, GripVertical, Pencil, Trash2 } from 'lucide-react';
import { cn, descriptionLinkClass, formatPeriod, withSafeLinks } from '../../../lib/utils';
import { Button } from '../../ui/button';
import type { ContentData } from '../../../types/content';

export type Content = ContentData;

type ContentCardProps = {
  content: Content;
  onToggleHidden: (content: Content) => void;
  onEdit: (content: Content) => void;
  onDelete: (content: Content) => void;
};

const ContentCard: FC<ContentCardProps> = ({ content, onToggleHidden, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: content.id });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-start gap-2.5 rounded-xl border border-gray-200 bg-white p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-colors',
        content.is_hidden ? 'opacity-60' : 'hover:border-gray-300'
      )}
    >
      {/* 핸들·액션 모두 title 줄(20px)에 맞춰 정렬 */}
      <button
        type="button"
        className="flex h-5 w-4 flex-none cursor-grab touch-none items-center justify-center text-gray-300 hover:text-gray-500 active:cursor-grabbing"
        aria-label="드래그하여 순서 변경"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={16} />
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <p className="truncate text-sm font-bold text-gray-900">{content.title || content.subtitle}</p>
          {content.date_range && (
            <p className="flex-none text-xs font-medium text-gray-400">{formatPeriod(content.date_range)}</p>
          )}
        </div>

        {content.title && content.subtitle && (
          <p className="mt-0.5 text-xs font-medium text-gray-600">{content.subtitle}</p>
        )}

        {content.description && (
          <div
            className={cn(
              'mt-1.5 line-clamp-2 text-xs leading-relaxed text-gray-500 [&_li]:ml-4 [&_ul]:list-disc',
              descriptionLinkClass
            )}
            dangerouslySetInnerHTML={{ __html: withSafeLinks(content.description) }}
          />
        )}
      </div>

      <div className="-my-0.5 -mr-1.5 flex flex-none items-center gap-0.5">
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          onClick={() => onToggleHidden(content)}
          aria-label={content.is_hidden ? '공개로 전환' : '비공개로 전환'}
        >
          {content.is_hidden ? <EyeOff /> : <Eye />}
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          onClick={() => onEdit(content)}
          aria-label="편집"
        >
          <Pencil />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-red-400 hover:bg-red-50 hover:text-red-600"
          onClick={() => onDelete(content)}
          aria-label="삭제"
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  );
};

export default ContentCard;
