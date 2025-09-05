import { useState } from 'react';
import { HabitTracking, StatusTracking, type HabitTrackingProps, type StatusTrackingProps } from 'uikitly-react';

type HabitTrackingData = HabitTrackingProps["data"];
type StatusTrackingData = StatusTrackingProps["data"];

function App() {
  const [habitTracking, setHabitTracking] = useState<HabitTrackingData>([{"date":"2025-01-01","value":5},{"date":"2025-01-02","value":10},{"date":"2025-08-30","value":8}]);
  const [statusTracking, setStatusTracking] = useState<StatusTrackingData>([{date: "2025-09-01", mainTitle: "Métrica", content: "Sin inconveniente.", level: null }, { date: "2025-08-31", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-08-30", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-08-29", mainTitle: "Métrica", content: "Sin inconveniente.", level: "low" }, { date: "2025-08-28", mainTitle: "Métrica", content: "Sin inconveniente.", level: "high" }, { date: "2025-08-27", mainTitle: "Métrica", content: "Sin inconveniente.", level: null }, { date: "2025-08-26", mainTitle: "Métrica", content: "Sin inconveniente.", level: null }, { date: "2025-08-25", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-08-24", mainTitle: "Métrica", content: "Sin inconveniente.", level: null }, { date: "2025-08-23", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-08-22", mainTitle: "Métrica", content: "Sin inconveniente.", level: "high" }, { date: "2025-08-21", mainTitle: "Métrica", content: "Sin inconveniente.", level: "high" }, { date: "2025-08-20", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-08-19", mainTitle: "Métrica", content: "Sin inconveniente.", level: "low" }, { date: "2025-08-18", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-08-17", mainTitle: "Métrica", content: "Sin inconveniente.", level: null }, { date: "2025-08-16", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-08-15", mainTitle: "Métrica", content: "Sin inconveniente.", level: null }, { date: "2025-08-14", mainTitle: "Métrica", content: "Sin inconveniente.", level: "low" }, { date: "2025-08-13", mainTitle: "Métrica", content: "Sin inconveniente.", level: null }, { date: "2025-08-12", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-08-11", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-08-10", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-08-09", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-08-08", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-08-07", mainTitle: "API", content: "Problemas en la API de datos económicos y afecta aquellos que utilizan la autorización Bearer Auth.", level: "high" }, { date: "2025-08-06", mainTitle: "Métrica", content: "Sin inconveniente.", level: null }, { date: "2025-08-05", mainTitle: "Métrica", content: "Sin inconveniente.", level: null }, { date: "2025-08-04", mainTitle: "Métrica", content: "Sin inconveniente.", level: null }, { date: "2025-08-03", mainTitle: "Métrica", content: "Sin inconveniente.", level: null }, { date: "2025-08-02", mainTitle: "Métrica", content: "Sin inconveniente.", level: null }, { date: "2025-08-01", mainTitle: "Métrica", content: "Sin inconveniente.", level: null }, { date: "2025-07-31", mainTitle: "Métrica", content: "Sin inconveniente.", level: null }, { date: "2025-07-30", mainTitle: "Métrica", content: "Sin inconveniente.", level: null }, { date: "2025-07-29", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-07-28", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-07-27", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-07-26", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-07-25", mainTitle: "Métrica", content: "Sin inconveniente.", level: "high" }, { date: "2025-07-24", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-07-23", mainTitle: "Métrica", content: "Sin inconveniente.", level: "high" }, { date: "2025-07-22", mainTitle: "Métrica", content: "Sin inconveniente.", level: "low" }, { date: "2025-07-21", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-07-20", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-07-19", mainTitle: "Métrica", content: "Sin inconveniente.", level: "high" }, { date: "2025-07-18", mainTitle: "Métrica", content: "Sin inconveniente.", level: null }, { date: "2025-07-17", mainTitle: "Métrica", content: "Sin inconveniente.", level: "high" }, { date: "2025-07-16", mainTitle: "Métrica", content: "Sin inconveniente.", level: null }, { date: "2025-07-15", mainTitle: "Métrica", content: "Sin inconveniente.", level: "low" }, { date: "2025-07-14", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-07-13", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-07-12", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-07-11", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-07-10", mainTitle: "Métrica", content: "Sin inconveniente.", level: "low" }, { date: "2025-07-09", mainTitle: "Métrica", content: "Sin inconveniente.", level: "low" }, { date: "2025-07-08", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-07-07", mainTitle: "Métrica", content: "Sin inconveniente.", level: "low" }, { date: "2025-07-06", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-07-05", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-07-04", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-07-03", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-07-02", mainTitle: "Métrica", content: "Sin inconveniente.", level: "low" }, { date: "2025-07-01", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-06-30", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-06-29", mainTitle: "Métrica", content: "Sin inconveniente.", level: "low" }, { date: "2025-06-28", mainTitle: "Métrica", content: "Sin inconveniente.", level: null }, { date: "2025-06-27", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-06-26", mainTitle: "Métrica", content: "Sin inconveniente.", level: null }, { date: "2025-06-25", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-06-24", mainTitle: "Métrica", content: "Sin inconveniente.", level: null }, { date: "2025-06-23", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-06-22", mainTitle: "Métrica", content: "Sin inconveniente.", level: null }, { date: "2025-06-21", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-06-20", mainTitle: "Métrica", content: "Sin inconveniente.", level: "high" }, { date: "2025-06-19", mainTitle: "Métrica", content: "Sin inconveniente.", level: "high" }, { date: "2025-06-18", mainTitle: "Métrica", content: "Sin inconveniente.", level: null }, { date: "2025-06-17", mainTitle: "Métrica", content: "Sin inconveniente.", level: "low" }, { date: "2025-06-16", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-06-15", mainTitle: "Métrica", content: "Sin inconveniente.", level: "high" }, { date: "2025-06-14", mainTitle: "Métrica", content: "Sin inconveniente.", level: null }, { date: "2025-06-13", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-06-12", mainTitle: "Métrica", content: "Sin inconveniente.", level: "high" }, { date: "2025-06-11", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-06-10", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-06-09", mainTitle: "Métrica", content: "Sin inconveniente.", level: "low" }, { date: "2025-06-08", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-06-07", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-06-06", mainTitle: "Métrica", content: "Sin inconveniente.", level: "zero" }, { date: "2025-06-05", mainTitle: "Métrica", content: "Sin inconveniente.", level: "high" }, { date: "2025-06-04", mainTitle: "Métrica", content: "Sin inconveniente.", level: "high"}]);

  const onClick = (data: { date: string; value: number }) => {
    console.log(data);
  }
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-4 p-2">
      <h1 className="text-2xl font-semibold text-center">uikitly-react components</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Developed by{" "}
        <a
          href="https://sebastianurdanegui.vercel.app/"
          className="underline"
        >
          Sebastian Marat Urdanegui Bisalaya
        </a>
      </p>
      <div className="w-full">
        <h2 className="text-2xl font-semibold pb-4 border-b border-gray-300 dark:border-gray-400 w-full text-left">
          Habit Tracking
        </h2>
        <p className='text-sm text-gray-400 dark:text-gray-500 font-light py-2'>Based on the GitHub contribution tracker</p>
        <div className='flex flex-col justify-center items-center p-2'>
          <HabitTracking
            data={habitTracking}
            onCellClick={onClick}
          />
        </div>
      </div>
      <div className="w-full">
        <h2 className="text-2xl font-semibold pb-4 border-b border-gray-300 dark:border-gray-400 w-full text-left">
          Status Tracking
        </h2>
        <p className='text-sm text-gray-400 dark:text-gray-500 font-light py-2'>Based on the Supabase status tracking chart</p>
        <div className='flex flex-col justify-center items-center p-2'>
          <StatusTracking
            data={statusTracking}
            titleComponent="Analytics"
            status="Operational"
            tooltipContentMark="Company analytics powers logs, metrics, and reports for all users."
          />
        </div>
      </div>
    </div>
  );
}


export default App
