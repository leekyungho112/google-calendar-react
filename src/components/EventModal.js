import React, { useContext, useState } from 'react';
import GlobalContext from '../context/GlobalContext';

const labelsClasses = [
  'red',
  'yellow',
  'gray',
  'green',
  'blue',
  'indigo',
  'pink',
  'purple',
];

const EventModal = () => {
  const {
    setShowEventModal,
    daySelected,
    dispatchCalEvent,
    selectedEvent,
  } = useContext(GlobalContext);
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '');
  const [desc, setDesc] = useState(selectedEvent ? selectedEvent.desc : '');
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((label) => label === selectedEvent.label)
      : labelsClasses[0]
  );

  const handleOnChange = (e) => {
    const {
      target: { value },
    } = e;
    setTitle(value);
  };

  const handleOnChangeDesc = (e) => {
    const {
      target: { value },
    } = e;
    setDesc(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const calendarEvent = {
      title,
      desc,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: 'update', payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: 'push', payload: calendarEvent });
    }
    setShowEventModal(false);
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <div>
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({ type: 'delete', payload: selectedEvent });
                  setShowEventModal(false);
                }}
                className="material-icons-outlined text-red-400"
              >
                delete
              </span>
            )}
            <button onClick={() => setShowEventModal(false)}>
              <span className="material-icons-outlined text-gray-400">
                close
              </span>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="제목을 적어주세요..."
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500 "
              value={title}
              onChange={handleOnChange}
            />
            <span className="material-icons-outlined text-gray-400">
              schedule
            </span>
            <p>{daySelected.format('dddd, MMMM DD일')}</p>
            <span className="material-icons-outlined text-gray-400">
              segment
            </span>
            <input
              type="text"
              name="desc"
              placeholder="일정을 추가해보세요..."
              required
              className="pt-3 border-0 text-gray-600  pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500 "
              value={desc}
              onChange={handleOnChangeDesc}
            />
            <span className="material-icons-outlined text-gray-400">
              bookmark_border
            </span>
            <div className="flex gap-x-2">
              {labelsClasses.map((label, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(label)}
                  className={`bg-${label}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === label && (
                    <span className="material-icons-outlined text-white text-sm">
                      check
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end w-100 border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 transition duration-500 ease-in-out px-6 py-2 rounded text-white"
          >
            만들기
          </button>
        </footer>
      </form>
    </div>
  );
};

export default EventModal;
