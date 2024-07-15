import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loading from "../components/Tools/Loader";
import Title from "../components/Tools/Title";
import Button from "../components/Tools/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../components/layout/Tabs";
import TaskTitle from "../components/task/TaskTitle";
import BoardView from "../components/layout/BoardView";
import Table from "../components/project/ProjectTable";

import { useGetAllTaskQuery } from "../redux/slices/api/taskApiSlice";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

const Tasks = () => {
  const navigate = useNavigate();
  const params = useParams();
  const status = params?.status || "";
  const { data, isLoading, refetch } = useGetAllTaskQuery({
    strQuery: status,
    isTrashed: "",
    search: "",
  });

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreateProject = () => {
    navigate("/addProject");
  };

  React.useEffect(() => {
    refetch();
  }, []);

  return isLoading ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <Title title={status ? `${status} Tasks` : "Project"} />

        {!status && (
          <Button
            onClick={handleCreateProject}
            label="Create"
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-customplam text-white  rounded-2xl py-2 2xl:py-2.5"
          />
        )}
      </div>

      <Tabs tabs={TABS} setSelected={setSelected}>
        {!status && (
          <div className="w-full flex justify-between   gap-4 md:gap-x-12 py-4">
            <TaskTitle label="To Do" className={TASK_TYPE.todo} />
            <TaskTitle
              label="In Progress"
              className={TASK_TYPE["in progress"]}
            />
            <TaskTitle label="completed" className={TASK_TYPE.completed} />
          </div>
        )}

        {selected !== 1 ? (
          <BoardView tasks={data?.tasks} />
        ) : (
          <div className="w-full">
            <Table tasks={data?.tasks} />
          </div>
        )}
      </Tabs>
    </div>
  );
};

export default Tasks;
