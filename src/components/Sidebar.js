import React from 'react';
import CreateEventButton from './CreateEventButton';
import Lables from './Lables';
import SmallCalendar from './SmallCalendar';
const Sidebar = () => {
  return (
    <aside className="border p-5 w-64">
      <CreateEventButton />
      <SmallCalendar />
      <Lables />
    </aside>
  );
};

export default Sidebar;
