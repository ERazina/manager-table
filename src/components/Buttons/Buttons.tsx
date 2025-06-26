export const Buttons = () => {
  const onPrev = () => {
    console.log("prev");
  };

  const onNext = () => {
    console.log("next");
  };

  return (
    <>
      <nav
        className="isolate inline-flex -space-x-px rounded-md shadow-xs text-red"
        aria-label="Pagination"
      >
        <button
          onClick={onPrev}
          className="relative inline-flex items-center justify-center w-10 h-10 rounded-l-md text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
          <span className="sr-only hidden">Previous</span>
          <svg
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M11.78 5.22a.75.75 0 01 0 1.06L8.06 10l3.72 3.72a.75.75 0 11 -1.06 1.06l-4.25 -4.25a.75.75 0 010 -1.06l4.25 -4.25a.75.75 0 011.06 0Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          onClick={onNext}
          className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
          <svg
            className="size-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
          >
            <path
              fill-rule="evenodd"
              d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </nav>
    </>
  );
};
