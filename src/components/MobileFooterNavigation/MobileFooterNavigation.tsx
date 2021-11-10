import { useState, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Restore, HomeOutlined, Settings } from '@material-ui/icons';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import MobileFooterNavigationPropsStyle from './MobileFooterNavigationStyle';

const MobileFooterNavigation: FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<number>(1);

  return (
    <MobileFooterNavigationPropsStyle>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        style={{ height: '7.5vh' }}
      >
        <BottomNavigationAction
          label="Recents"
          icon={<Restore />}
          onClick={() => navigate(-1)}
        />

        <BottomNavigationAction
          label="Home"
          icon={<HomeOutlined />}
          onClick={() => navigate('/home')}
        />

        <BottomNavigationAction
          label="Settings"
          icon={<Settings />}
          onClick={() => navigate('/home/settings')}
        />
      </BottomNavigation>
    </MobileFooterNavigationPropsStyle>
  );
};

export default MobileFooterNavigation;
