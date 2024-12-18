import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../features/tasks/taskSlice";

const FilterBar = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.tasks.filter);

  return (
    <div className="flex justify-center gap-2 mb-6 sm:flex-nowrap">
      {["all", "completed", "pending", "overdue"].map((filter) => (
        <button
          key={filter}
          onClick={() => dispatch(setFilter(filter))}
          className={`py-2 px-4 rounded transition ${
            currentFilter === filter
              ? "bg-blue-700 text-white border-2 border-blue-700"
              : "bg-white text-blue-500 border-2 border-blue-700"
          }`}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
