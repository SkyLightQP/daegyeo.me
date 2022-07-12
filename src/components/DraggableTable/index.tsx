import React, { Fragment } from 'react';
import { ButtonGroup, IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

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
}

const DraggableTable = <T extends { id: number }>({
  data,
  columns,
  onDragEnd,
  onTableUpdateClick,
  onTableDeleteClick
}: DraggableTableProps<T>) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <TableContainer background="white">
        <Table variant="simple">
          <Thead>
            <Tr>
              {columns.map(({ key, label }) => (
                <Th key={`label-${key}`}>{label}</Th>
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
                      >
                        {columns.map(({ key, isDate, render }) => {
                          if (isDate)
                            return (
                              <Td key={`column-${key}-${item.id}`}>
                                {new Date(String(item[key])).toLocaleDateString()}
                              </Td>
                            );
                          if (render) {
                            return <Fragment key={`column-${key}-${item.id}`}>{render(item)}</Fragment>;
                          }
                          return <Td key={`column-${key}-${item.id}`}>{String(item[key])}</Td>;
                        })}
                        <Td isNumeric>
                          <ButtonGroup isAttached>
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
