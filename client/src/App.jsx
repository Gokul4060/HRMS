import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import TaskDetails from "./pages/TaskDetails";
import { Toaster } from "sonner";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard";
import { setOpenSidebar } from "./redux/slices/authSlice";
import Allemployee from "./pages/allEmployees";
import Alldepartment from "./pages/allDepartments";
import Leave from "./pages/leaves";
import Payroll from "./pages/payRoll";
import ErrorPage from "./pages/ErrorPage";
import Profile from "./pages/profile";
import Approvel from "./pages/Approvel";
import Demo from "./pages/demo";
import Tasks from "./pages/Tasks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequestMessages from "./pages/Manager/RequestMessages";
import AddProject from "./components/project/AddProject";
import AddTask from "./components/task/AddTask";
import DeletedRecords from "./pages/DeletedRecords";
import Tab1 from "./components/project/SubTabs/Tab1";
import Tab2 from "./components/project/SubTabs/Tab2";
import Attendance from "./pages/Attendance";
import Project from "./pages/project";
import CreateProject from "./components/project/createProject";


function Layout() {
  const { user } = useSelector((state) => state.auth);

  const location = useLocation();

  return user ? (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-1/5 h-screen bg-white sticky top-0 hidden md:block">
        <Sidebar />
      </div>

      <MobileSidebar />

      <div className="flex-1 overflow-y-auto">
        <Navbar />

        <div className="p-4 2xl:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/log-in" state={{ from: location }} replace />
  );
}

const MobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.auth);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <>
      <Transition
        show={isSidebarOpen}
        as={Fragment}
        enter="transition-opacity duration-700"
        enterFrom="opacity-x-10"
        enterTo="opacity-x-100"
        leave="transition-opacity duration-700"
        leaveFrom="opacity-x-100"
        leaveTo="opacity-x-0"
      >
        {(ref) => (
          <div
            ref={(node) => (mobileMenuRef.current = node)}
            className={clsx(
              "md:hidden w-full h-full bg-black/40 transition-all duration-700 transform ",
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            )}
            onClick={() => closeSidebar()}
          >
            <div className="bg-white w-3/4 h-full">
              <div className="w-full flex justify-end px-5 mt-5">
                <button
                  onClick={() => closeSidebar()}
                  className="flex justify-end items-end"
                >
                  <IoClose size={25} />
                </button>
              </div>

              <div className="-mt-10">
                <Sidebar />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
};

function App() {
  return (
    <main className="w-full min-h-screen bg-[#f3f4f6] ">
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/alldepartment" element={<Alldepartment />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/allEmployee" element={<Allemployee />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/approvel" element={<Approvel />} />
          <Route path="/completed/:status" element={<Tasks />} />
          <Route path="/in-progress/:status" element={<Tasks />} />
          <Route path="/todo/:status" element={<Tasks />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tasks/:projectName" element={<Tasks />} />
          <Route path="/task" element={<Tasks />} />
          <Route path="/addProject" element={<AddProject />} />
          <Route path="/addTask" element={<AddTask />} />
          <Route path="/trash" element={<DeletedRecords />} />
          <Route path="/task/:id" element={<TaskDetails />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/tab1" element={<Tab1 />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/project" element={<Project />} />
          <Route path="/create-project" element={<CreateProject />} />

          <Route path="/tab2" element={<Tab2 />} />

          <Route path="/request-messages" element={<RequestMessages />} />

          <Route path="*" element={<ErrorPage />} />
        </Route>

        <Route path="/log-in" element={<Login />} />
      </Routes>

      <Toaster richColors />
    </main>
  );
}

export default App;
