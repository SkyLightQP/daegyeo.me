'use client';

import { FC } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { Button } from '../../ui/button';

type DeleteContentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contentTitle?: string;
  onConfirm: () => void | Promise<void>;
  submitting?: boolean;
};

const DeleteContentDialog: FC<DeleteContentDialogProps> = ({
  open,
  onOpenChange,
  contentTitle,
  onConfirm,
  submitting = false,
}) => {
  const handleOpenChange = (next: boolean) => {
    if (submitting) return;
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>컨텐츠 삭제</DialogTitle>
          <DialogDescription>
            {contentTitle ? `'${contentTitle}' 항목을 삭제하시겠습니까?` : '이 항목을 삭제하시겠습니까?'} 이 작업은 되돌릴
            수 없습니다.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="button" size="lg" variant="ghost" onClick={() => handleOpenChange(false)} disabled={submitting}>
            취소
          </Button>
          <Button type="button" size="lg" variant="destructive" onClick={() => onConfirm()} disabled={submitting}>
            {submitting ? '삭제 중...' : '삭제'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteContentDialog;
