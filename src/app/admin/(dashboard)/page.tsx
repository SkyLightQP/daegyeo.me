'use client';

import { CSSProperties, FC, useCallback, useEffect, useState } from 'react';
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
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { GripVertical, Pencil, Plus, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import AddSectionDialog, { AddSectionValue, sectionTypeOptions } from '@/components/admin/AddSectionDialog';
import EditSectionDialog from '@/components/admin/EditSectionDialog';
import DeleteSectionDialog from '@/components/admin/DeleteSectionDialog';

type Section = {
  id: number;
  name: string;
  type: string;
  priority: number;
};

const typeLabel = (type: string) => sectionTypeOptions.find((option) => option.value === type)?.label ?? type;

type SortableRowProps = {
  section: Section;
  index: number;
  onEdit: (section: Section) => void;
  onDelete: (section: Section) => void;
};

const SortableRow: FC<SortableRowProps> = ({ section, index, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: section.id });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
  };

  return (
    <TableRow ref={setNodeRef} style={style} className="h-12 text-center">
      <TableCell>
        <button
          type="button"
          className="mx-auto flex cursor-grab touch-none text-gray-300 hover:text-gray-500 active:cursor-grabbing"
          aria-label="드래그하여 순서 변경"
          {...attributes}
          {...listeners}
        >
          <GripVertical size={16} />
        </button>
      </TableCell>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <Badge variant="secondary">{typeLabel(section.type)}</Badge>
      </TableCell>
      <TableCell className="text-left font-medium">{section.name}</TableCell>
      <TableCell>
        <div className="flex justify-center gap-1">
          <Button
            size="icon-sm"
            variant="ghost"
            aria-label="편집"
            className="text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            onClick={() => onEdit(section)}
          >
            <Pencil />
          </Button>
          <Button
            size="icon-sm"
            variant="ghost"
            aria-label="삭제"
            className="text-gray-500 hover:bg-red-50 hover:text-red-600"
            onClick={() => onDelete(section)}
          >
            <Trash2 />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

const Page: FC = () => {
  const [open, setOpen] = useState(false);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editTarget, setEditTarget] = useState<Section | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Section | null>(null);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const fetchSections = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/sections');
      if (!res.ok) throw new Error('섹션을 불러오지 못했습니다.');
      const { data } = await res.json();
      setSections(data ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  const handleAddSection = async ({ type, title }: AddSectionValue) => {
    setSubmitting(true);
    setError(null);
    try {
      const priority = sections.reduce((max, s) => Math.max(max, s.priority), 0) + 1;
      const res = await fetch('/api/sections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: title, type, priority }),
      });
      if (!res.ok) throw new Error('섹션을 추가하지 못했습니다.');
      const { data } = await res.json();
      setSections((prev) => [...prev, data]);
      setOpen(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const persistOrder = async (ordered: Section[], previous: Section[]) => {
    setError(null);
    try {
      const res = await fetch('/api/sections/order', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ordered.map((s) => ({ id: s.id, priority: s.priority }))),
      });
      if (!res.ok) throw new Error('순서를 변경하지 못했습니다.');
    } catch (e) {
      setError(e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.');
      setSections(previous);
    }
  };

  const handleEditSection = async (name: string) => {
    if (!editTarget) return;
    setEditing(true);
    setError(null);
    try {
      const res = await fetch(`/api/sections/${editTarget.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, type: editTarget.type, priority: editTarget.priority }),
      });
      if (!res.ok) throw new Error('섹션을 수정하지 못했습니다.');
      const { data } = await res.json();
      setSections((prev) => prev.map((s) => (s.id === editTarget.id ? { ...s, ...data } : s)));
      setEditTarget(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setEditing(false);
    }
  };

  const handleDeleteSection = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch(`/api/sections/${deleteTarget.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('섹션을 삭제하지 못했습니다.');
      setSections((prev) => prev.filter((s) => s.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setDeleting(false);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setSections((prev) => {
      const oldIndex = prev.findIndex((s) => s.id === active.id);
      const newIndex = prev.findIndex((s) => s.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return prev;

      const reordered = arrayMove(prev, oldIndex, newIndex).map((s, index) => ({ ...s, priority: index + 1 }));
      persistOrder(reordered, prev);
      return reordered;
    });
  };

  return (
    <>
      <div className="mb-8">
        <h2 className="font-semibold text-xl">섹션 관리</h2>
        <p className="text-sm">페이지에 들어가는 섹션과 섹션 타입을 설정합니다.</p>

        <div className="mt-4 flex">
          <Button size="lg" onClick={() => setOpen(true)}>
            <Plus data-icon="inline-start" />
            <span className="mt-0.5">섹션 추가</span>
          </Button>
        </div>
      </div>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      <Table className="w-full table-fixed">
        <TableHeader>
          <TableRow className="text-center">
            <TableHead className="w-[50px]" />
            <TableHead className="w-[50px] text-center">#</TableHead>
            <TableHead className="w-[200px] text-center">타입</TableHead>
            <TableHead className="text-left">제목</TableHead>
            <TableHead className="w-[120px] text-center">관리</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow className="h-12">
              <TableCell colSpan={5} className="text-center text-sm text-gray-500">
                불러오는 중...
              </TableCell>
            </TableRow>
          ) : sections.length === 0 ? (
            <TableRow className="h-12">
              <TableCell colSpan={5} className="text-center text-sm text-gray-500">
                등록된 섹션이 없습니다.
              </TableCell>
            </TableRow>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              modifiers={[restrictToVerticalAxis, restrictToParentElement]}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
                {sections.map((section, index) => (
                  <SortableRow
                    key={section.id}
                    section={section}
                    index={index}
                    onEdit={setEditTarget}
                    onDelete={setDeleteTarget}
                  />
                ))}
              </SortableContext>
            </DndContext>
          )}
        </TableBody>
      </Table>

      <AddSectionDialog open={open} onOpenChange={setOpen} onSubmit={handleAddSection} submitting={submitting} />

      <EditSectionDialog
        open={editTarget !== null}
        onOpenChange={(next) => !next && setEditTarget(null)}
        section={editTarget}
        onSubmit={handleEditSection}
        submitting={editing}
      />

      <DeleteSectionDialog
        open={deleteTarget !== null}
        onOpenChange={(next) => !next && setDeleteTarget(null)}
        sectionName={deleteTarget?.name}
        onConfirm={handleDeleteSection}
        submitting={deleting}
      />
    </>
  );
};

export default Page;
