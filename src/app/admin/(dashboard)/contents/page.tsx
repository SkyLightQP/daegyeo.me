'use client';

import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import { toast } from 'sonner';
import { Skeleton } from '../../../../components/ui/skeleton';
import { Content } from '../../../../components/admin/content/ContentCard';
import SectionContentGroup from '../../../../components/admin/content/SectionContentGroup';
import ContentFormDialog, { ContentFormValue } from '../../../../components/admin/content/ContentFormDialog';
import DeleteContentDialog from '../../../../components/admin/content/DeleteContentDialog';
import LivePreview from '../../../../components/admin/content/LivePreview';
import { SectionType } from '../../../../components/admin/section/AddSectionDialog';

type Section = { id: number; name: string; type: SectionType; priority: number };

type FormTarget = { mode: 'add'; sectionId: number } | { mode: 'edit'; content: Content };

const jsonHeaders = { 'Content-Type': 'application/json' };

const toBody = (content: Content) => ({
  title: content.title,
  subtitle: content.subtitle,
  description: content.description,
  date_range: content.date_range,
  section_id: content.section_id,
  priority: content.priority,
  is_hidden: content.is_hidden,
});

const errorMessage = (e: unknown) => (e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.');

const Page: FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [formTarget, setFormTarget] = useState<FormTarget | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Content | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [secRes, conRes] = await Promise.all([fetch('/api/sections'), fetch('/api/contents')]);
      if (!secRes.ok || !conRes.ok) throw new Error('데이터를 불러오지 못했습니다.');
      const [{ data: secData }, { data: conData }] = await Promise.all([secRes.json(), conRes.json()]);
      const editableSections: Section[] = (secData ?? [])
        .filter((s: Section) => s.type === 'CONTENT' || s.type === 'STACK' || s.type === 'ARTICLE')
        .sort((a: Section, b: Section) => a.priority - b.priority);
      setSections(editableSections);
      setContents(conData ?? []);
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const groups = useMemo(
    () =>
      sections.map((section) => ({
        section,
        items: contents
          .filter((content) => content.section_id === section.id)
          .sort((a, b) => a.priority - b.priority),
      })),
    [sections, contents]
  );

  const sectionName = (sectionId: number) => sections.find((s) => s.id === sectionId)?.name;

  const sectionTypeOf = (sectionId: number): SectionType =>
    sections.find((s) => s.id === sectionId)?.type ?? 'CONTENT';

  const handleAddSubmit = async (value: ContentFormValue) => {
    if (formTarget?.mode !== 'add') return;
    const sectionId = formTarget.sectionId;
    setSubmitting(true);
    setError(null);
    try {
      const priority =
        contents.filter((c) => c.section_id === sectionId).reduce((max, c) => Math.max(max, c.priority), 0) + 1;
      const res = await fetch('/api/contents', {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify({ ...value, section_id: sectionId, priority, is_hidden: false }),
      });
      if (!res.ok) throw new Error('컨텐츠를 추가하지 못했습니다.');
      const { data } = await res.json();
      setContents((prev) => [...prev, data]);
      setFormTarget(null);
      toast.success('컨텐츠를 추가했습니다.');
    } catch (e) {
      setError(errorMessage(e));
      toast.error('컨텐츠 추가에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditSubmit = async (value: ContentFormValue) => {
    if (formTarget?.mode !== 'edit') return;
    const target = formTarget.content;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/contents/${target.id}`, {
        method: 'PUT',
        headers: jsonHeaders,
        body: JSON.stringify({
          ...value,
          section_id: target.section_id,
          priority: target.priority,
          is_hidden: target.is_hidden,
        }),
      });
      if (!res.ok) throw new Error('컨텐츠를 수정하지 못했습니다.');
      const { data } = await res.json();
      setContents((prev) => prev.map((c) => (c.id === target.id ? { ...c, ...data } : c)));
      setFormTarget(null);
      toast.success('컨텐츠를 수정했습니다.');
    } catch (e) {
      setError(errorMessage(e));
      toast.error('컨텐츠 수정에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleHidden = async (content: Content) => {
    const next = !content.is_hidden;
    setError(null);
    setContents((prev) => prev.map((c) => (c.id === content.id ? { ...c, is_hidden: next } : c)));
    try {
      const res = await fetch(`/api/contents/${content.id}`, {
        method: 'PUT',
        headers: jsonHeaders,
        body: JSON.stringify({ ...toBody(content), is_hidden: next }),
      });
      if (!res.ok) throw new Error('공개 상태를 변경하지 못했습니다.');
    } catch (e) {
      setContents((prev) => prev.map((c) => (c.id === content.id ? { ...c, is_hidden: content.is_hidden } : c)));
      setError(errorMessage(e));
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch(`/api/contents/${deleteTarget.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('컨텐츠를 삭제하지 못했습니다.');
      setContents((prev) => prev.filter((c) => c.id !== deleteTarget.id));
      setDeleteTarget(null);
      toast.success('컨텐츠를 삭제했습니다.');
    } catch (e) {
      setError(errorMessage(e));
      toast.error('컨텐츠 삭제에 실패했습니다.');
    } finally {
      setDeleting(false);
    }
  };

  const persistOrder = async (reordered: Content[], previous: Content[]) => {
    setError(null);
    try {
      const res = await fetch('/api/contents/order', {
        method: 'PATCH',
        headers: jsonHeaders,
        body: JSON.stringify(reordered.map((c) => ({ id: c.id, priority: c.priority }))),
      });
      if (!res.ok) throw new Error('순서를 변경하지 못했습니다.');
    } catch (e) {
      setContents(previous);
      setError(errorMessage(e));
    }
  };

  const handleReorder = (sectionId: number, activeId: number, overId: number) => {
    setContents((prev) => {
      const inSection = prev.filter((c) => c.section_id === sectionId).sort((a, b) => a.priority - b.priority);
      const oldIndex = inSection.findIndex((c) => c.id === activeId);
      const newIndex = inSection.findIndex((c) => c.id === overId);
      if (oldIndex === -1 || newIndex === -1) return prev;

      const reordered = arrayMove(inSection, oldIndex, newIndex).map((c, index) => ({ ...c, priority: index + 1 }));
      const others = prev.filter((c) => c.section_id !== sectionId);
      persistOrder(reordered, prev);
      return [...others, ...reordered];
    });
  };

  return (
    <div className="-mx-6 -my-8 flex h-screen overflow-hidden">
      <div className="flex w-[42%] min-w-130 flex-none flex-col border-r border-gray-200 bg-white">
        <div className="flex-none border-b border-gray-100 px-6 py-5">
          <h2 className="text-lg font-bold text-gray-900">컨텐츠 관리</h2>
          <p className="mt-0.5 text-sm text-gray-500">각 섹션에 표시될 항목을 관리합니다.</p>
        </div>

        <div className="flex-1 overflow-auto px-6 py-5">
          {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-20 w-full rounded-xl" />
              <Skeleton className="h-20 w-full rounded-xl" />
            </div>
          ) : sections.length === 0 ? (
            <p className="text-sm text-gray-500">관리할 섹션이 없습니다. 먼저 섹션을 추가하세요.</p>
          ) : (
            groups.map(({ section, items }) => (
              <SectionContentGroup
                key={section.id}
                sectionId={section.id}
                name={section.name}
                type={section.type}
                contents={items}
                onReorder={handleReorder}
                onAdd={(sectionId) => setFormTarget({ mode: 'add', sectionId })}
                onToggleHidden={handleToggleHidden}
                onEdit={(content) => setFormTarget({ mode: 'edit', content })}
                onDelete={(content) => setDeleteTarget(content)}
              />
            ))
          )}
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <LivePreview sections={sections} contents={contents} />
      </div>

      <ContentFormDialog
        open={formTarget !== null}
        onOpenChange={(next) => !next && setFormTarget(null)}
        mode={formTarget?.mode ?? 'add'}
        sectionType={
          formTarget?.mode === 'edit'
            ? sectionTypeOf(formTarget.content.section_id)
            : formTarget?.mode === 'add'
              ? sectionTypeOf(formTarget.sectionId)
              : 'CONTENT'
        }
        sectionName={
          formTarget?.mode === 'edit'
            ? sectionName(formTarget.content.section_id)
            : formTarget?.mode === 'add'
              ? sectionName(formTarget.sectionId)
              : undefined
        }
        initial={formTarget?.mode === 'edit' ? formTarget.content : null}
        onSubmit={formTarget?.mode === 'edit' ? handleEditSubmit : handleAddSubmit}
        submitting={submitting}
      />

      <DeleteContentDialog
        open={deleteTarget !== null}
        onOpenChange={(next) => !next && setDeleteTarget(null)}
        contentTitle={deleteTarget ? deleteTarget.title || deleteTarget.subtitle : undefined}
        onConfirm={handleDelete}
        submitting={deleting}
      />
    </div>
  );
};

export default Page;
