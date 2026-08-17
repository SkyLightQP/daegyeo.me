'use client';

import { FC, FormEvent, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn, descriptionLinkClass, renderDescription } from '@/lib/utils';
import { Content } from '@/components/admin/content/ContentCard';
import { SectionType } from '@/components/admin/section/AddSectionDialog';

export type ContentFormValue = {
  title: string;
  subtitle: string;
  date_range: string;
  description: string;
};

type ContentFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'add' | 'edit';
  sectionType: SectionType;
  sectionName?: string;
  initial?: Content | null;
  onSubmit: (value: ContentFormValue) => void | Promise<void>;
  submitting?: boolean;
};

const ContentFormDialog: FC<ContentFormDialogProps> = ({
  open,
  onOpenChange,
  mode,
  sectionType,
  sectionName,
  initial,
  onSubmit,
  submitting = false,
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [description, setDescription] = useState('');
  const [descTab, setDescTab] = useState<'write' | 'preview'>('write');
  const [snap, setSnap] = useState<{ open: boolean; initial: Content | null | undefined; sectionType: SectionType }>({
    open,
    initial,
    sectionType,
  });

  if (open !== snap.open || initial !== snap.initial) {
    setSnap({ open, initial, sectionType: open ? sectionType : snap.sectionType });
    if (open) {
      setTitle(initial?.title ?? '');
      setSubtitle(initial?.subtitle ?? '');
      setDateRange(initial?.date_range ?? '');
      setDescription(initial?.description ?? '');
      setDescTab('write');
    }
  }

  const isStack = snap.sectionType === 'STACK';

  const canSubmit = isStack
    ? !!subtitle.trim() && !submitting
    : !!title.trim() && !!subtitle.trim() && !!dateRange.trim() && !submitting;

  const handleOpenChange = (next: boolean) => {
    if (submitting) return;
    onOpenChange(next);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit(
      isStack
        ? { title: '', subtitle: subtitle.trim(), date_range: '', description: '' }
        : {
            title: title.trim(),
            subtitle: subtitle.trim(),
            date_range: dateRange.trim(),
            description: description.trim(),
          }
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isStack
              ? mode === 'add'
                ? '스택 추가'
                : '스택 편집'
              : mode === 'add'
                ? '컨텐츠 추가'
                : '컨텐츠 편집'}
            {sectionName ? ` · ${sectionName}` : ''}
          </DialogTitle>
          <DialogDescription>
            {isStack
              ? '스택 항목을 쉼표로 구분해 입력하세요. HTML 태그는 지원하지 않습니다.'
              : mode === 'add'
                ? '섹션에 표시할 새 항목을 입력하세요.'
                : '컨텐츠 내용을 수정하세요.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isStack && (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="content-title" className="text-sm">
                제목
              </Label>
              <Input
                id="content-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="예: Company A"
                className="h-8 text-sm md:text-sm"
              />
            </div>
          )}

          {isStack ? (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="content-subtitle" className="text-sm">
                Stack
              </Label>
              <Input
                id="content-subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="TypeScript, React, PostgreSQL"
                className="h-8 text-sm md:text-sm"
              />
            </div>
          ) : (
            <div className="flex gap-3">
              <div className="flex flex-1 flex-col gap-1.5">
                <Label htmlFor="content-subtitle" className="text-sm">
                  부제목
                </Label>
                <Input
                  id="content-subtitle"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="예: Frontend Developer"
                  className="h-8 text-sm md:text-sm"
                />
              </div>
              <div className="flex w-40 flex-none flex-col gap-1.5">
                <Label htmlFor="content-date" className="text-sm">
                  기간
                </Label>
                <Input
                  id="content-date"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  placeholder="2022.03 – 2024.01"
                  className="h-8 text-sm md:text-sm"
                />
              </div>
            </div>
          )}

          {!isStack && (
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <Label className="text-sm">
                  설명 <span className="font-normal text-gray-400">(선택)</span>
                </Label>
                <div className="ml-auto flex gap-0.5 rounded-md bg-gray-100 p-0.5">
                  <button
                    type="button"
                    onClick={() => setDescTab('write')}
                    className={cn(
                      'cursor-pointer rounded px-2.5 py-1 text-[11px] font-semibold transition-colors',
                      descTab === 'write' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                    )}
                  >
                    작성
                  </button>
                  <button
                    type="button"
                    onClick={() => setDescTab('preview')}
                    className={cn(
                      'cursor-pointer rounded px-2.5 py-1 text-[11px] font-semibold transition-colors',
                      descTab === 'preview' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                    )}
                  >
                    미리보기
                  </button>
                </div>
              </div>

              {descTab === 'write' ? (
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="<p>HTML 태그를 사용할 수 있어요</p>"
                  rows={6}
                  spellCheck={false}
                  className="font-mono text-xs leading-relaxed"
                />
              ) : (
                <div
                  className={cn(
                    'min-h-[104px] rounded-md border border-input bg-gray-50 px-3 py-2.5 text-sm leading-relaxed text-gray-600 [&_li]:ml-4 [&_ul]:list-disc',
                    descriptionLinkClass
                  )}
                  dangerouslySetInnerHTML={{
                    __html: description.trim()
                      ? renderDescription(description)
                      : '<span class="text-gray-400">미리볼 내용이 없습니다.</span>',
                  }}
                />
              )}
              <p className="text-[11px] leading-snug text-gray-400">
                &lt;strong&gt; &lt;em&gt; &lt;ul&gt; &lt;li&gt; &lt;a&gt; &lt;br&gt; 등 기본 서식 태그를 지원합니다.
              </p>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              size="lg"
              variant="ghost"
              onClick={() => handleOpenChange(false)}
              disabled={submitting}
            >
              취소
            </Button>
            <Button type="submit" size="lg" disabled={!canSubmit}>
              {submitting ? (mode === 'add' ? '추가 중...' : '저장 중...') : mode === 'add' ? '추가' : '저장'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContentFormDialog;
