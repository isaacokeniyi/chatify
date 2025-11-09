const ContextMenu = ({ close, deleteMsg }) => {
  return (
    <div className="h-screen w-screen absolute top-0 left-0 justify-center items-center flex bg-gray-800/80 z-50">
      <div className="bg-white p-4 rounded flex flex-col gap-1">
        <button
          onClick={() => deleteMsg()}
          className="px-4 py-2 text-red-500 font-bold duration-500 hover:bg-red-500 hover:text-white rounded-md"
        >
          Delete
        </button>
        <button
          onClick={() => close()}
          className="px-4 py-2 font-bold duration-500 hover:bg-black hover:text-white rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ContextMenu;
