import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useState } from "react";
import Tab1 from "../profileTabs/Tab1";
import Tab2 from "../profileTabs/Tab2";
import Tab3 from "../profileTabs/Tab3";
import Tab4 from "../profileTabs/Tab4";
import Tab5 from "../profileTabs/Tab5";
import Tab6 from "../profileTabs/Tab6";

export default function Tabs({ control, register, errors, setValue }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const nextTab = () => {
    setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, 5));
  };

  const prevTab = () => {
    setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      <TabList className="bg-gray-100 rounded-2xl w-full space-x-5">
        {["Personal", "Work", "Contact", "Bank", "Hierarchy", "Identity"].map(
          (tabName, index) => (
            <Tab key={index} as={Fragment}>
              {({ selected }) => (
                <button
                  className={clsx(
                    selected && "bg-green-600 text-white rounded-3xl p-2"
                  )}
                >
                  {tabName}
                </button>
              )}
            </Tab>
          )
        )}
      </TabList>
      <TabPanels>
        <TabPanel>
          <Tab1
            control={control}
            register={register}
            errors={errors}
            nextTab={nextTab}
            setValue={setValue}
          />
        </TabPanel>
        <TabPanel>
          <Tab2
            control={control}
            register={register}
            errors={errors}
            nextTab={nextTab}
            prevTab={prevTab}
            setValue={setValue}
          />
        </TabPanel>
        <TabPanel>
          <Tab3
            control={control}
            register={register}
            errors={errors}
            nextTab={nextTab}
            prevTab={prevTab}
            setValue={setValue}
          />
        </TabPanel>
        <TabPanel>
          <Tab4
            control={control}
            register={register}
            errors={errors}
            nextTab={nextTab}
            prevTab={prevTab}
            setValue={setValue}
          />
        </TabPanel>
        <TabPanel>
          <Tab5
            control={control}
            register={register}
            errors={errors}
            nextTab={nextTab}
            prevTab={prevTab}
            setValue={setValue}
          />
        </TabPanel>
        <TabPanel>
          <Tab6
            control={control}
            register={register}
            errors={errors}
            prevTab={prevTab}
            setValue={setValue}
          />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
}
