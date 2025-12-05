import { useEffect, useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { SidebarClose, SidebarOpen } from "lucide-react";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Close on click outside (only when sidebar is open on small screens)
  useEffect(() => {
    function handleClickOutside(e) {
      // only close for mobile (let md+ remain visible)
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        window.innerWidth < 768
      ) {
        setIsSidebarOpen(false);
      }
    }

    function handleEsc(e) {
      if (e.key === "Escape" && window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isSidebarOpen]);

  return (
    <>
      <div className="relative flex min-h-screen">
        {/* Overlay (mobile only) */}
        {/* shows when sidebar is open on small screens, prevents background scroll & closes on click */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <aside
          ref={sidebarRef}
          // fixed so it never scrolls with page; h-screen to occupy full height
          // on small screens it's translate-x-full when closed, on md it is always visible (translate-x-0)
          className={`fixed top-16 left-0 w-[250px] h-screen bg-white dark:bg-slate-950 shadow-xl z-50 transform transition-transform duration-300
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          `}
          aria-hidden={false}
        >
          {/* Use overflow-hidden to make sidebar non-scrollable (content clipped) */}
          <div className="h-full overflow-hidden py-6 px-3">
            <h1 className="text-2xl font-semibold mb-6 text-black dark:text-white text-center whitespace-normal break-words">
              Admin Panel
            </h1>

            <nav>
              <Link to="/admin/dashboard">
                <div className="px-4 py-3 rounded-md text-black dark:text-white hover:text-purple-800 hover:bg-purple-100/80 hover:dark:bg-slate-800 transition-all duration-300 cursor-pointer whitespace-normal break-words">
                  Dashboard
                </div>
              </Link>

              <Link to="/admin/course">
                <div className="px-4 py-3 rounded-md text-black dark:text-white hover:text-purple-800 hover:bg-purple-100/80 hover:dark:bg-slate-800 transition-all duration-300 cursor-pointer whitespace-normal break-words">
                  Course
                </div>
              </Link>

              {/* add more nav items here */}
            </nav>
          </div>
        </aside>

        {/* Toggle Button - show only on small screens (md:hidden).
            If you want the toggle visible on desktop too remove md:hidden */}
        <button
          onClick={() => setIsSidebarOpen((p) => !p)}
          className={`fixed top-16 left-0 md:hidden shadow-md border bg-gray-100 dark:bg-gray-900/70 dark:text-gray-100 rounded-md text-black p-1 transform transition-transform duration-300`}
          aria-expanded={isSidebarOpen}
          aria-controls="sidebar"
        >
          {isSidebarOpen ? <SidebarClose /> : <SidebarOpen />}
        </button>

        {/* Main Content */}
        {/* add md:pl-[250px] so content doesn't go under the fixed sidebar on md+ */}
        <main className="flex-1 transition-all duration-300 w-full md:pl-[250px]">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Sidebar;
