import { useEffect, useState } from "react";
import { dataStore } from "@store/dataStore";
import "./styles.scss";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
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

  if (isLoading) return <div className="text-center py-4">Загрузка...</div>;
  if (error) return <div className="text-red-500 py-4 text-center">{error}</div>;
  if (!data) return <div className="text-center py-4">Нет данных</div>;

  return (
    <div className="overflow-x-auto p-4">
      <div className="flex justify-end gap-2 mb-2">
        <button
          onClick={() => setScrollIndex((prev) => Math.max(prev - 1, 0))}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          disabled={scrollIndex === 0}
        >
          ←
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
          →
        </button>
      </div>

      <table className="min-w-full border border-collapse text-center">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-3 py-2" rowSpan={2}></th>
            <th className="border px-3 py-2" rowSpan={2}>
              <div className="flex flex-col">
                <span className="font-medium">Total income</span>
                <span className="text-gray-500">Total active partners</span>
              </div>
            </th>
            {visibleMonths.map((month, idx) => (
              <th
                key={idx}
                className={`border border-b-0 px-3 py-2 ${getMonthStyle(scrollIndex + idx)}`}
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
                className={`border border-t-0 px-0 py-0 ${getMonthStyle(scrollIndex + idx)}`}
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
          <tr className="bg-gray-100 font-semibold">
            <td className="border px-3 py-2 text-left">Manager</td>
            <td className="border px-3 py-2">
              <div className="flex flex-col">
                <span>Total income</span>
                <span className="text-gray-500">Total active partners</span>
              </div>
            </td>
            {visibleMonths.map((_, idx) => {
              const month = data.data.total[scrollIndex + idx];
              return month ? (
                <td key={idx} colSpan={4} className="border px-0 py-0">
                  <div className={`grid grid-cols-2 grid-rows-2 text-[13px] ${getMonthStyle(scrollIndex + idx)}`}>
                    <div className="py-2 px-3 border border-transparent">${month.plan.income}</div>
                    <div className="py-2 px-3 border border-transparent">${month.fact.income}</div>
                    <div className="py-2 px-3 border border-transparent text-gray-500">{month.plan.activePartners}</div>
                    <div className="py-2 px-3 border border-transparent text-gray-500">{month.fact.activePartners}</div>
                  </div>
                </td>
              ) : (
                <td key={idx} colSpan={4} className="border px-3 py-2 text-gray-400">нет данных</td>
              );
            })}
          </tr>

          {data.data.table.map((manager) => (
            <tr key={manager.id}>
              <td className="border px-3 py-2 text-left">{manager.adminName}</td>
              <td className="border px-3 py-2">
                <div className="flex flex-col">
                  <span className="font-medium">Income</span>
                  <span className="text-gray-500">Active partners</span>
                </div>
              </td>
              {visibleMonths.map((_, idx) => {
                const month = manager.months[scrollIndex + idx];
                return month ? (
                  <td key={idx} colSpan={4} className="border px-0 py-0">
                    <div className={`grid grid-cols-2 grid-rows-2 text-[14px] ${getMonthStyle(scrollIndex + idx)}`}>
                      <div className="py-2 px-3 border border-transparent">${month.plan.income}</div>
                      <div className="py-2 px-3 border border-transparent">${month.fact.income}</div>
                      <div className="py-2 px-3 border border-transparent text-gray-500">{month.plan.activePartners}</div>
                      <div className="py-2 px-3 border border-transparent text-gray-500">{month.fact.activePartners}</div>
                    </div>
                  </td>
                ) : (
                  <td key={idx} colSpan={4} className="border px-3 py-2 text-gray-400">No data</td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
