import React, { ReactNode } from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const GlobalDndContext = (props: { children: ReactNode }) => {
  return (
    <DndProvider backend={HTML5Backend} key={1}>
      {props.children}
    </DndProvider>
  );
};

export default GlobalDndContext;
