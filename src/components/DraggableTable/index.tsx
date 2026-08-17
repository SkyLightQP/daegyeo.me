'use client';

import { Fragment } from 'react';
import { ButtonGroup, IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { RiDeleteBin2Line, RiEditLine, RiImageCircleFill, RiLink } from '@remixicon/react';
import { SortableContext, sortableKeyboardCoordinates, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';

interface Column<T> {
  readonly label: string;
  readonly key: keyof T;
  readonly isDate?: boolean;
  readonly render?: (item: T) => JSX.Element;
}

interface DraggableTableProps<T> {
  readonly data: T[];
  readonly columns: Column<T>[];
  readonly onDragEnd: (event: DragEndEvent) => void;
  readonly onTableUpdateClick: (snapshot: T) => void;
  readonly onTableDeleteClick: (snapshot: T) => void;
  readonly useLinkControl?: boolean;
  readonly useImageControl?: boolean;
  readonly onTableLinkClick?: (snapshot: T) => void;
  readonly onTableImageClick?: (snapshot: T) => void;
}

const DraggableRow = <T extends { id: number; isHidden?: boolean }>({
  item,
  columns,
  onTableUpdateClick,
  onTableDeleteClick,
  useLinkControl,
  useImageControl,
  onTableLinkClick,
  onTableImageClick
}: Omit<Omit<DraggableTableProps<T>, 'onDragEnd'>, 'data'> & { item: T }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: item.isHidden ? 0.4 : 1
  };

  return (
    <Tr ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {columns.map(({ key, isDate, render }) => {
        if (isDate)
          return <Td key={`column-${String(key)}-${item.id}`}>{new Date(String(item[key])).toLocaleDateString()}</Td>;
        if (render) {
          return <Fragment key={`column-${String(key)}-${item.id}`}>{render(item)}</Fragment>;
        }
        return <Td key={`column-${String(key)}-${item.id}`}>{String(item[key])}</Td>;
      })}
      <Td isNumeric>
        <ButtonGroup isAttached>
          {useImageControl && (
            <IconButton
              aria-label="이미지 추가"
              size="xs"
              icon={<RiImageCircleFill size={16} />}
              onClick={() => onTableImageClick?.(item)}
            />
          )}
          {useLinkControl && (
            <IconButton
              aria-label="링크 추가"
              size="xs"
              icon={<RiLink size={16} />}
              onClick={() => onTableLinkClick?.(item)}
            />
          )}
          <IconButton
            aria-label="내용 수정"
            size="xs"
            icon={<RiEditLine size={16} />}
            onClick={() => onTableUpdateClick(item)}
          />
          <IconButton
            aria-label="내용 삭제"
            size="xs"
            icon={<RiDeleteBin2Line size={16} />}
            onClick={() => onTableDeleteClick(item)}
          />
        </ButtonGroup>
      </Td>
    </Tr>
  );
};

const DraggableTable = <T extends { id: number; isHidden?: boolean }>({
  data,
  columns,
  onDragEnd,
  onTableUpdateClick,
  onTableDeleteClick,
  useLinkControl,
  useImageControl,
  onTableLinkClick,
  onTableImageClick
}: DraggableTableProps<T>) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  return (
    <DndContext onDragEnd={onDragEnd} sensors={sensors} collisionDetection={closestCenter}>
      <TableContainer background="white">
        <Table variant="simple">
          <Thead>
            <Tr>
              {columns.map(({ key, label }) => (
                <Th key={`label-${String(key)}`}>{label}</Th>
              ))}
              <Th />
            </Tr>
          </Thead>
          <SortableContext items={data.map((i) => i.id.toString())}>
            <Tbody>
              {data.map((item) => (
                <DraggableRow
                  key={item.id}
                  item={item}
                  columns={columns}
                  onTableUpdateClick={onTableUpdateClick}
                  onTableDeleteClick={onTableDeleteClick}
                  useLinkControl={useLinkControl}
                  useImageControl={useImageControl}
                  onTableLinkClick={onTableLinkClick}
                  onTableImageClick={onTableImageClick}
                />
              ))}
            </Tbody>
          </SortableContext>
        </Table>
      </TableContainer>
    </DndContext>
  );
};

export default DraggableTable;
