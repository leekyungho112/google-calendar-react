import { useContext, useEffect, useState } from 'react';

import CalendarHeader from './components/CalendarHeader';
import EventModal from './components/EventModal';
import Month from './components/Month';
import Sidebar from './components/Sidebar';
import GlobalContext from './context/GlobalContext';
import { getMonth } from './util';

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);
  return (
    <>
      {showEventModal && <EventModal />}

      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currentMonth} />
        </div>
      </div>
    </>
  );
}

export default App;
