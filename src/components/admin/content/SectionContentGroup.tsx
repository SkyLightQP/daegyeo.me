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

type SectionContentGroupProps = {
  sectionId: number;
  name: string;
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
          컨텐츠
        </span>
        <span className="text-[11px] font-semibold text-gray-400">{contents.length}</span>
        <div className="h-px flex-1 bg-gray-100" />
        <button
          type="button"
          onClick={() => onAdd(sectionId)}
          className="flex size-6 cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-900"
          aria-label="컨텐츠 추가"
          title="컨텐츠 추가"
        >
          <Plus size={14} />
        </button>
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
