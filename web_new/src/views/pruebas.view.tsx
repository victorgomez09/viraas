import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

export function Pruebas() {
  return (
    <Tabs orientation="vertical">
      <TabList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>one!</p>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
