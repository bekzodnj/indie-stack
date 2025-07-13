import type { MetaFunction } from "react-router";
import { Link } from "react-router";

import { useOptionalUser } from "~/utils";

export const meta: MetaFunction = () => [{ title: "Remix Notes" }];

export default function Index() {
  const user = useOptionalUser();

  return (
    <div className="min-h-screen bg-white">
      {/* Nav Bar */}
      <header className="flex items-center justify-between border-b border-gray-400 px-20 py-5">
        <div>
          <h1 className="text-2xl font-bold">Udenote</h1>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="text-sm text-gray-700">
            Our story
          </Link>
          <a href="." className="text-sm text-gray-700">
            Search materials
          </a>
          <a href="." className="text-sm text-gray-700">
            Write
          </a>
          <a href="/login" className="text-sm text-gray-700">
            Sign in
          </a>
          <button className="rounded-full bg-black px-4 py-2 text-sm text-white">
            Get started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex w-full justify-between border-b border-gray-400">
        <div className="flex px-32 py-10">
          {/* Left content */}
          <div className="w-1/2 pr-10">
            <h1 className="mb-8 font-serif text-5xl font-bold md:text-7xl">
              Marketplace for Notion pages
            </h1>
            <p className="mb-8 text-xl text-gray-700">
              A place to read, write, and share your knowledge
            </p>
            <Link
              to="/dashboard"
              className="rounded-full bg-black px-8 py-3 font-medium text-white"
            >
              Discover yes
            </Link>
          </div>
        </div>

        {/* Right illustration */}
        <div className="relative hidden w-1/2 md:block">
          <div className="absolute inset-0">
            <div className="relative h-full w-full overflow-hidden">
              {/* Elegant gradient background */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-sky-500"></div>

              {/* Abstract elegant shape */}
              <svg
                className="absolute inset-0 transition-transform duration-500 hover:scale-150"
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
                  <circle cx="100" cy="300" r="3" fill="white" opacity="0.6" />
                  <circle cx="200" cy="400" r="4" fill="white" opacity="0.6" />
                  <circle cx="300" cy="300" r="3" fill="white" opacity="0.6" />
                  <circle cx="400" cy="450" r="2" fill="white" opacity="0.6" />
                  <circle cx="600" cy="350" r="3" fill="white" opacity="0.6" />
                  <circle cx="650" cy="250" r="5" fill="white" opacity="0.6" />
                  <circle cx="150" cy="150" r="5" fill="white" opacity="0.6" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
