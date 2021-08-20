import { ReactNode } from 'react';

const TabPanel = ({ children, index, value }: TabPanelProps) => (
  <div
    id="tab-panel"
    role="tabpanel"
    hidden={value !== index}
    aria-labelledby={`scrollable-auto-tab-${index}`}
  >
    {value === index && children}
  </div>
);

interface TabPanelProps {
  children: ReactNode;
  index: number;
  value: number;
}

export default TabPanel;
