export const Header = () => (
  <header className="flex items-center justify-between p-4 border-b border-gray-200">
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-500"
        >
          <path d="m15 5-3 3-3-3 3-3 3 3z" />
          <path d="m6 15 3 3 3-3-3-3-3 3z" />
          <path d="M9 9 3 3" />
          <path d="m21 21-6-6" />
          <path d="m21 3-6 6" />
          <path d="m3 21 6-6" />
        </svg>
      </div>
      <span className="text-2xl font-bold text-gray-800">myBookmark</span>
    </div>
  </header>
);
