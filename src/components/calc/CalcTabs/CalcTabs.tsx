import { TabList, Tabs } from "react-aria-components";
import { PanelWrapper, TabItem } from "@/components/generic";
import { CALC_TABS, useCalcTabs } from "@/stores";
import {
  AttributesTab,
  BackgroundTab,
  CalcActions,
  ClassTab,
  FeatsTab,
} from "@/components/calc";

export const CalcTabs = () => {
  const { selectedTab, setSelectedTab } = useCalcTabs();

  return (
    <PanelWrapper>
      <Tabs
        selectedKey={selectedTab}
        // @ts-expect-error not "string"
        onSelectionChange={setSelectedTab}
        className={`flex flex-col`}
      >
        <div className={`flex`}>
          <TabList
            items={CALC_TABS}
            className={`mx-4 hidden select-none gap-2 md:flex`}
          >
            {({ label, id }) => <TabItem id={id as string} label={label} />}
          </TabList>
          <CalcActions />
        </div>
        <ClassTab />
        <BackgroundTab />
        <AttributesTab />
        <FeatsTab />
      </Tabs>
    </PanelWrapper>
  );
};
