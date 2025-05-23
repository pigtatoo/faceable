import { Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AnimatedRoute from "../components/AnimatedRoute";
import Navbar from "../components/Navbar";


export default function DefaultLayout() {
  return (
    <div className="relative flex flex-col justify-between">
      <div className="flex flex-col min-h-screen max-h-screen overflow-hidden">
        <div className="z-50">
          <Navbar></Navbar>
        </div>
        <div className="relative flex-grow min-h-full h-full max-h-full overflow-auto bg-neutral-50 dark:bg-neutral-950">
          <AnimatePresence mode="wait">
            <AnimatedRoute>
              <Outlet />
            </AnimatedRoute>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
