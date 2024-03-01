import React, { Fragment } from 'react';
import { ButtonGroup, IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faLink, faTrash } from '@fortawesome/free-solid-svg-icons';

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
  /* eslint-disable react/require-default-props */
  readonly useLinkControl?: boolean;
  readonly onTableLinkClick?: (snapshot: T) => void;
}

const DraggableTable = <T extends { id: number; isHidden?: boolean }>({
  data,
  columns,
  onDragEnd,
  onTableUpdateClick,
  onTableDeleteClick,
  useLinkControl,
  onTableLinkClick
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
                            {useLinkControl && (
                              <IconButton
                                aria-label="Edit"
                                size="xs"
                                icon={<FontAwesomeIcon icon={faLink} />}
                                onClick={() => onTableLinkClick && onTableLinkClick(item)}
                              />
                            )}
                            <IconButton
                              aria-label="Edit"
                              size="xs"
                              icon={<FontAwesomeIcon icon={faEdit} />}
                              onClick={() => onTableUpdateClick(item)}
                            />
                            <IconButton
                              aria-label="Delete"
                              size="xs"
                              icon={<FontAwesomeIcon icon={faTrash} />}
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
