import { useEffect, useState } from "react";
import { dataStore } from "@store/dataStore";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const Table = () => {
  const { data, isLoading, error, fetchData } = dataStore();
  const visibleCount = 6;
  const currentMonthIndex = new Date().getMonth();
  const [scrollIndex, setScrollIndex] = useState(currentMonthIndex);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const visibleMonths = monthNames.slice(scrollIndex, scrollIndex + visibleCount);

  const getMonthStyle = (monthIdx: number) => {
    return monthIdx < currentMonthIndex
      ? "text-gray-400"
      : "text-gray-900 font-semibold";
  };

  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-red-500 py-4 text-center">{error}</div>;
  if (!data) return <div className="text-center py-4">No data</div>;

  return (
    <div className="overflow-x-auto p-4">
      <div className="flex justify-end gap-2 mb-2">
        <button
          onClick={() => setScrollIndex((prev) => Math.max(prev - 1, 0))}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          disabled={scrollIndex === 0}
        >
          <ChevronLeftIcon className="w-5 h-5 text-gray-500" />
        </button>
        <button
          onClick={() =>
            setScrollIndex((prev) =>
              Math.min(prev + 1, monthNames.length - visibleCount)
            )
          }
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          disabled={scrollIndex + visibleCount >= monthNames.length}
        >
          <ChevronRightIcon className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <table className="text-center border border-[#D5DDE3] border-collapse w-full">
        <thead>
          <tr className="bg-[#F7FAFC]">
            <th className="border border-[#D5DDE3] px-3 py-2" rowSpan={2}></th>
            <th className="border border-[#D5DDE3] px-3 py-2" rowSpan={2}></th>
            {visibleMonths.map((month, idx) => (
              <th
                key={idx}
                className={`border border-b-0 border-[#D5DDE3] px-3 py-2 ${getMonthStyle(scrollIndex + idx)}`}
                colSpan={4}
              >
                {month}
              </th>
            ))}
          </tr>
          <tr className="bg-gray-50 text-xs">
            {visibleMonths.map((_, idx) => (
              <th
                key={idx}
                colSpan={4}
                className={`border border-t-0 border-[#D5DDE3] px-0 py-0 ${getMonthStyle(scrollIndex + idx)}`}
              >
                <div className="grid grid-cols-2 text-[11px]">
                  <div className="py-2 font-medium">Plan:</div>
                  <div className="py-2 font-medium">Fact:</div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="font-semibold">
            <td className="border border-[#D5DDE3] px-3 py-2 text-left text-[#7C8CB5]">
              Manager
            </td>
            <td className="border border-[#D5DDE3] px-0 py-0">
              <div className="grid grid-rows-2 items-center justify-center text-center h-[64px]">
                <div className="text-[13px] font-semibold text-[#7486B1]">
                  Total income:
                </div>
                <div className="text-[13px] text-[#7486B1]">
                  Total active partners:
                </div>
              </div>
            </td>
            {visibleMonths.map((_, idx) => {
              const month = data.data.total[scrollIndex + idx];
              return month ? (
                <td key={idx} colSpan={4} className="border border-[#D5DDE3] px-0 py-0">
                  <div
                    className={`grid grid-cols-2 grid-rows-2 text-[12px] ${getMonthStyle(scrollIndex + idx)}`}
                  >
                    <div className="py-2 px-3 border border-transparent">
                      ${month.plan.income}
                    </div>
                    <div className="py-2 px-3 border border-transparent">
                      ${month.fact.income}
                    </div>
                    <div className="py-2 px-3 border border-transparent text-gray-500">
                      {month.plan.activePartners}
                    </div>
                    <div className="py-2 px-3 border border-transparent text-gray-500">
                      {month.fact.activePartners}
                    </div>
                  </div>
                </td>
              ) : (
                <td
                  key={idx}
                  colSpan={4}
                  className="border border-[#D5DDE3] px-3 py-2 text-gray-400 text-[13px]"
                >
                  No data
                </td>
              );
            })}
          </tr>

          {data.data.table.map((manager) => (
            <tr key={manager.id}>
              <td className="border border-[#D5DDE3] px-3 py-2 text-left font-bold">
                {manager.adminName}
              </td>
              <td className="border border-[#D5DDE3] px-0 py-0">
                <div className="grid grid-rows-2 items-center justify-center text-center h-[64px]">
                  <div className="text-[13px] font-semibold text-gray-400">
                    Income:
                  </div>
                  <div className="text-[13px] text-gray-400">
                    Active partners:
                  </div>
                </div>
              </td>
              {visibleMonths.map((_, idx) => {
                const month = manager.months[scrollIndex + idx];
                return month ? (
                  <td key={idx} colSpan={4} className="border border-[#D5DDE3] px-0 py-0">
                    <div
                      className={`grid grid-cols-2 grid-rows-2 text-[14px] ${getMonthStyle(scrollIndex + idx)}`}
                    >
                      <div className="py-2 px-3 border border-transparent">
                        ${month.plan.income}
                      </div>
                      <div className="py-2 px-3 border border-transparent">
                        ${month.fact.income}
                      </div>
                      <div className="py-2 px-3 border border-transparent text-gray-500">
                        {month.plan.activePartners}
                      </div>
                      <div className="py-2 px-3 border border-transparent text-gray-500">
                        {month.fact.activePartners}
                      </div>
                    </div>
                  </td>
                ) : (
                  <td
                    key={idx}
                    colSpan={4}
                    className="border border-[#D5DDE3] px-3 py-2 text-gray-400"
                  >
                    No data
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
