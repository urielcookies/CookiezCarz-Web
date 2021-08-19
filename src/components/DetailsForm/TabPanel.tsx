import { ReactNode } from 'react';

const TabPanel = ({ children, index, value }: TabPanelProps) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`scrollable-auto-tabpanel-${index}`}
    aria-labelledby={`scrollable-auto-tab-${index}`}
  >
    {value === index && (
      <div>{children}</div>
    )}
  </div>
);

interface TabPanelProps {
  children: ReactNode;
  index: number;
  value: number;
}

export default TabPanel;
