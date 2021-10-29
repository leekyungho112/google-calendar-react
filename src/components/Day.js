import React, { useContext, useEffect, useState } from 'react';
import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import GlobalContext from '../context/GlobalContext';

dayjs.locale('ko');
const Day = ({ day, rowIdx }) => {
  const [dayEvents, setDayEvents] = useState([]);

  const {
    setDaySelected,
    setShowEventModal,
    filterEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = filterEvents.filter(
      (e) => dayjs(e.day).format('DD-MM-YY') === day.format('DD-MM-YY')
    );
    setDayEvents(events);
  }, [filterEvents, day]);

  const getCurrentDayClass = () => {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
      ? 'bg-blue-600 text-white rounded-full w-7'
      : '';
  };

  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && <p className="text-sm mt-1 ">{day.format('ddd')}</p>}

        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
          {day.format('DD')}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div
            className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
            key={idx}
            onClick={() => setSelectedEvent(evt)}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Day;
