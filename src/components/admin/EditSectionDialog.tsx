'use client';

import { FC, FormEvent, useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { sectionTypeOptions } from './AddSectionDialog';

export type EditSectionTarget = {
  id: number;
  name: string;
  type: string;
};

type EditSectionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  section: EditSectionTarget | null;
  onSubmit: (name: string) => void | Promise<void>;
  submitting?: boolean;
};

const typeLabel = (type: string) => sectionTypeOptions.find((option) => option.value === type)?.label ?? type;

const EditSectionDialog: FC<EditSectionDialogProps> = ({ open, onOpenChange, section, onSubmit, submitting = false }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (open && section) setName(section.name);
  }, [open, section]);

  const handleOpenChange = (next: boolean) => {
    if (submitting) return;
    onOpenChange(next);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || submitting) return;
    onSubmit(name.trim());
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>섹션 편집</DialogTitle>
          <DialogDescription>섹션 제목을 변경하세요. 타입은 변경할 수 없습니다.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="edit-section-type" className="text-sm">타입</Label>
            <Input
              id="edit-section-type"
              value={section ? typeLabel(section.type) : ''}
              disabled
              className="h-8 text-sm md:text-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="edit-section-title" className="text-sm">제목</Label>
            <Input
              id="edit-section-title"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <Button type="submit" size="lg" disabled={!name.trim() || submitting}>
              {submitting ? '저장 중...' : '저장'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditSectionDialog;
