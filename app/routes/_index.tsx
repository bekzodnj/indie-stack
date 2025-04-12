import type { MetaFunction } from "react-router";
import { Link } from "react-router";

import { useOptionalUser } from "~/utils";

export const meta: MetaFunction = () => [{ title: "Remix Notes" }];

export default function Index() {
  const user = useOptionalUser();

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation Bar */}
      <header className="flex items-center justify-between border-b border-gray-400 px-20 py-5">
        <div>
          <h1 className="text-2xl font-bold">Udenote</h1>
        </div>
        <div className="flex items-center gap-6">
          <Link to="./dashboard" className="text-sm text-gray-700">
            Our story
          </Link>
          <a href="." className="text-sm text-gray-700">
            Search materials
          </a>
          <a href="." className="text-sm text-gray-700">
            Write
          </a>
          <a href="." className="text-sm text-gray-700">
            Sign in
          </a>
          <button className="rounded-full bg-black px-4 py-2 text-sm text-white">
            Get started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex w-full justify-between border-b border-gray-400">
        <div className="flex px-20 py-10">
          {/* Left content */}
          <div className="w-1/2 pr-10">
            <h1 className="mb-8 font-serif text-8xl font-bold">
              Marketplace for Notion pages
            </h1>
            <p className="mb-8 text-xl text-gray-700">
              A place to read, write, and share your knowledge
            </p>
            <button className="rounded-full bg-black px-8 py-3 font-medium text-white">
              Discover
            </button>
          </div>
        </div>

        {/* Right illustration */}
        <div className="relative w-1/3">
          <div className="absolute inset-0">
            <div className="relative h-full w-full overflow-hidden">
              {/* Elegant gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-400"></div>

              {/* Abstract elegant shape */}
              <svg
                className="absolute inset-0"
                width="100%"
                height="100%"
                viewBox="0 0 800 600"
                preserveAspectRatio="xMidYMid slice"
              >
                {/* Large minimalist circle */}
                <circle
                  cx="500"
                  cy="200"
                  r="120"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  opacity="0.8"
                />

                {/* Small accent circle */}
                {/* <circle cx="500" cy="200" r="20" fill="white" opacity="0.9" /> */}

                {/* Subtle dots */}
                <g>
                  <circle cx="200" cy="400" r="4" fill="white" opacity="0.6" />
                  <circle cx="300" cy="300" r="3" fill="white" opacity="0.6" />
                  <circle cx="400" cy="450" r="2" fill="white" opacity="0.6" />
                  <circle cx="600" cy="350" r="3" fill="white" opacity="0.6" />
                  <circle cx="700" cy="250" r="4" fill="white" opacity="0.6" />
                </g>
              </svg>

              {/* Elegant pen icon at bottom right */}
              <div className="absolute bottom-8 right-8">
                <svg viewBox="0 0 100 100" className="h-32 w-32">
                  <path
                    d="M70,10 L90,30 L40,80 L10,90 L20,60 L70,10 Z"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <line
                    x1="60"
                    y1="20"
                    x2="80"
                    y2="40"
                    stroke="white"
                    strokeWidth="1"
                  />
                  <circle cx="10" cy="90" r="2" fill="white" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
// <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
//             {user ? (
//               <Link
//                 to="/notes"
//                 className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
//               >
//                 View Notes for {user.email}
//               </Link>
//             ) : (
//               <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
//                 <Link
//                   to="/join"
//                   className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
//                 >
//                   Sign up
//                 </Link>
//                 <Link
//                   to="/login"
//                   className="flex items-center justify-center rounded-md bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600"
//                 >
//                   Log In
//                 </Link>
//               </div>
//             )}
//           </div>
