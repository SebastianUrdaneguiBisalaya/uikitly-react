import { HabitTracking, StatusTracking } from 'uikitly-react';

function App() {
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-4">
      <h1 className="text-xl font-semibold text-center">uikitly components</h1>
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
        <h2 className="text-2xl font-semibold pb-4 border-b border-gray-400 w-full text-left">
          Habit Tracking
        </h2>
        <HabitTracking />
      </div>
      <div className="w-full">
        <h2>Status Tracking</h2>
        <StatusTracking />
      </div>
    </div>
  );
}


export default App
