'use client';

import { FC, FormEvent, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';

export type SectionType = 'CONTENT' | 'STACK' | 'ARTICLE';

export const sectionTypeOptions: { value: SectionType; label: string }[] = [
  { value: 'CONTENT', label: 'Content' },
  { value: 'STACK', label: 'Stack' },
  { value: 'ARTICLE', label: 'Article' },
];

export type AddSectionValue = {
  type: SectionType;
  title: string;
};

type AddSectionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (value: AddSectionValue) => void | Promise<void>;
  submitting?: boolean;
};

const AddSectionDialog: FC<AddSectionDialogProps> = ({ open, onOpenChange, onSubmit, submitting = false }) => {
  const [type, setType] = useState<SectionType | ''>('');
  const [title, setTitle] = useState('');

  const reset = () => {
    setType('');
    setTitle('');
  };

  const handleOpenChange = (next: boolean) => {
    if (submitting) return;
    if (!next) reset();
    onOpenChange(next);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!type || !title.trim() || submitting) return;
    onSubmit({ type, title: title.trim() });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>섹션 추가</DialogTitle>
          <DialogDescription>섹션 타입을 선택하고 제목을 입력하세요.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="section-type" className="text-sm">타입</Label>
            <Select value={type} onValueChange={(value) => setType(value as SectionType)}>
              <SelectTrigger id="section-type" className="h-8 text-sm [&_svg:not([class*='size-'])]:size-4">
                <SelectValue placeholder="타입을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {sectionTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-sm">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="section-title" className="text-sm">제목</Label>
            <Input
              id="section-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="섹션 제목을 입력하세요"
              className="h-8 text-sm md:text-sm"
            />
          </div>

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
            <Button type="submit" size="lg" disabled={!type || !title.trim() || submitting}>
              {submitting ? '추가 중...' : '추가'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSectionDialog;
