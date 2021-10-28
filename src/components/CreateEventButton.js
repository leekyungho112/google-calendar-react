import React, { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

const CreateEventButton = () => {
  const { setShowEventModal } = useContext(GlobalContext);
  return (
    <button
      onClick={() => setShowEventModal(true)}
      className="border p-2 rounded-full flex items-center shadow-md hover:shadow-xl"
    >
      <span className="material-icons cursor-pointer text-gray-600 mx-2">
        add
      </span>
      <span className="pl-3 pr-7">작성하기</span>
    </button>
  );
};

export default CreateEventButton;
