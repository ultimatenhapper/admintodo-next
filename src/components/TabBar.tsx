"use client";
import React, { useState } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
const tabOptions = [1, 2, 3, 4, 5];

interface Props {
  currentTab?: number;
  tabOptions?: number[];
}
export const TabBar = ({
  tabOptions = [1, 2, 3, 4],
  currentTab = 1,
}: Props) => {
  const [selected, setSelected] = useState(currentTab);
  const router = useRouter();

  const onTableSelected = (tab: number) => {
    setSelected(tab);
    setCookie("selectedTab", tab.toString());
    router.refresh();
  };
  return (
    <div
      className={`grid w-full ${
        "grid-cols-" + tabOptions.length
      } space-x-2 rounded-xl bg-gray-200 p-2`}
    >
      {tabOptions.map((tab) => (
        <div key={tab}>
          <input
            checked={selected === tab}
            onChange={() => {}}
            type="radio"
            id={tab.toString()}
            className="peer hidden"
          />
          <label
            onClick={() => onTableSelected(tab)}
            className="block cursor-pointer transition-all select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            {tab}
          </label>
        </div>
      ))}
    </div>
  );
};

export default TabBar;
