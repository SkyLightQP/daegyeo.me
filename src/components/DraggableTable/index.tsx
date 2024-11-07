'use client';

import { Fragment } from 'react';
import { ButtonGroup, IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { RiDeleteBin2Line, RiEditLine, RiImageCircleFill, RiLink } from '@remixicon/react';

interface Column<T> {
  readonly label: string;
  readonly key: keyof T;
  readonly isDate?: boolean;
  readonly render?: (item: T) => JSX.Element;
}

interface DraggableTableProps<T> {
  readonly data: T[];
  readonly columns: Column<T>[];
  readonly onDragEnd: (result: DropResult) => void;
  readonly onTableUpdateClick: (snapshot: T) => void;
  readonly onTableDeleteClick: (snapshot: T) => void;
  readonly useLinkControl?: boolean;
  readonly useImageControl?: boolean;
  readonly onTableLinkClick?: (snapshot: T) => void;
  readonly onTableImageClick?: (snapshot: T) => void;
}

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
  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
          <Droppable droppableId="droppable">
            {(provided) => (
              <Tbody {...provided.droppableProps} ref={provided.innerRef}>
                {data.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                    {(innerProvided) => (
                      <Tr
                        ref={innerProvided.innerRef}
                        {...innerProvided.draggableProps}
                        {...innerProvided.dragHandleProps}
                        opacity={item.isHidden ? 0.4 : 1}
                      >
                        {columns.map(({ key, isDate, render }) => {
                          if (isDate)
                            return (
                              <Td key={`column-${String(key)}-${item.id}`}>
                                {new Date(String(item[key])).toLocaleDateString()}
                              </Td>
                            );
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
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Tbody>
            )}
          </Droppable>
        </Table>
      </TableContainer>
    </DragDropContext>
  );
};

export default DraggableTable;
