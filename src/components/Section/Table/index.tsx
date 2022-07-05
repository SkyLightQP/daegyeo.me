import React from 'react';
import { ButtonGroup, IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Section from '../../../database/entity/Section';

interface SectionTableProps {
  readonly data: Section[];
  readonly onDragEnd: (result: DropResult) => void;
  readonly onTableUpdateClick: (snapshot: Section) => void;
  readonly onTableDeleteClick: (snapshot: Section) => void;
}

const SectionTable: React.FC<SectionTableProps> = ({ data, onDragEnd, onTableUpdateClick, onTableDeleteClick }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <TableContainer background='white'>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>제목</Th>
              <Th>생성일</Th>
              <Th />
            </Tr>
          </Thead>
          <Droppable droppableId='droppable'>
            {(provided) => (
              <Tbody
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {data.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                    {(provided2) => (
                      <Tr
                        ref={provided2.innerRef}
                        {...provided2.draggableProps}
                        {...provided2.dragHandleProps}
                      >
                        <Td>{item.id}</Td>
                        <Td>{item.title}</Td>
                        <Td>{new Date(item.createdAt).toLocaleDateString()}</Td>
                        <Td isNumeric>
                          <ButtonGroup isAttached>
                            <IconButton
                              aria-label='Edit'
                              size='xs'
                              icon={<FontAwesomeIcon icon={faEdit} />}
                              onClick={() => onTableUpdateClick(item)}
                            />
                            <IconButton
                              aria-label='Delete'
                              size='xs'
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

export default SectionTable;
