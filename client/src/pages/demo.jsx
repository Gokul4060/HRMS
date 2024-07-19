import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import clsx from "clsx";
import { Fragment } from "react";
import Tab1 from "../components/project/SubTabs/Tab1";
import Tab2 from "../components/project/SubTabs/Tab2";
import { useGetAllTaskQuery } from "../redux/slices/api/taskApiSlice";
import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

const demo = () => {
  const params = useParams();

  const status = params?.status || "";
  const { data } = useGetAllTaskQuery({
    strQuery: status,
    isTrashed: "",
    search: "",
  });

  return (
    <TabGroup>
      <TabList className="flex space-x-1 bg-gray-100 p-4">
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={clsx(
                "py-2.5 px-4 text-sm leading-5 font-medium rounded-lg",
                selected
                  ? "bg-green-500 text-white"
                  : "bg-white text-green-700 hover:bg-green-500 hover:text-white"
              )}
            >
              Project
            </button>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={clsx(
                "py-2.5 px-4 text-sm leading-5 font-medium rounded-lg",
                selected
                  ? "bg-green-500 text-white"
                  : "bg-white text-green-700 hover:bg-green-500 hover:text-white"
              )}
            >
              Task
            </button>
          )}
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel className="p-4">
          <Tab1 tasks={data?.tasks} />
        </TabPanel>
        <TabPanel className="p-4">
          <Tab2 />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
};

export default demo;
