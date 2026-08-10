'use client';

import { FC } from 'react';
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import ContentCard, { Content } from './ContentCard';
import { SectionType } from '../section/AddSectionDialog';

const typeLabel: Record<SectionType, string> = {
  CONTENT: '컨텐츠',
  STACK: '스택',
  ARTICLE: '아티클',
};

type SectionContentGroupProps = {
  sectionId: number;
  name: string;
  type: SectionType;
  contents: Content[];
  onReorder: (sectionId: number, activeId: number, overId: number) => void;
  onAdd: (sectionId: number) => void;
  onToggleHidden: (content: Content) => void;
  onEdit: (content: Content) => void;
  onDelete: (content: Content) => void;
};

const SectionContentGroup: FC<SectionContentGroupProps> = ({
  sectionId,
  name,
  type,
  contents,
  onReorder,
  onAdd,
  onToggleHidden,
  onEdit,
  onDelete,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const isStack = type === 'STACK';
  const addDisabled = isStack && contents.length > 0;
  const addLabel = `${typeLabel[type]} 추가`;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    onReorder(sectionId, Number(active.id), Number(over.id));
  };

  return (
    <section className="mb-7">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-xs font-bold tracking-wide text-gray-600">{name}</span>
        <span className="rounded-full border border-gray-200 bg-gray-100 px-2 py-px text-[10px] font-semibold text-gray-500">
          {typeLabel[type]}
        </span>
        <span className="text-[11px] font-semibold text-gray-400">{contents.length}</span>
        <div className="h-px flex-1 bg-gray-100" />
        <span className="flex" title={addDisabled ? '스택 섹션에는 컨텐츠를 1개만 둘 수 있습니다.' : addLabel}>
          <button
            type="button"
            onClick={() => onAdd(sectionId)}
            disabled={addDisabled}
            className="flex size-6 cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label={addDisabled ? '스택 섹션에는 컨텐츠를 1개만 둘 수 있습니다.' : addLabel}
          >
            <Plus size={14} />
          </button>
        </span>
      </div>

      {contents.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={contents.map((c) => c.id)} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-2.5">
              {contents.map((content) => (
                <ContentCard
                  key={content.id}
                  content={content}
                  onToggleHidden={onToggleHidden}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </section>
  );
};

export default SectionContentGroup;
