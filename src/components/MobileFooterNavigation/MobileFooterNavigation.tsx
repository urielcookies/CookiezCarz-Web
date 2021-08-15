import { useState, FC } from 'react';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import { Restore, HomeOutlined, Settings } from '@material-ui/icons';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import MobileFooterNavigationPropsStyle from './MobileFooterNavigationStyle';

interface MobileFooterNavigationProps {
  history: History;
}

const MobileFooterNavigation: FC<MobileFooterNavigationProps> = ({ history }) => {
  const { push, goBack } = history;
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
          onClick={() => goBack()}
        />

        <BottomNavigationAction
          label="Home"
          icon={<HomeOutlined />}
          onClick={() => push('/home')}
        />

        <BottomNavigationAction
          label="Settings"
          icon={<Settings />}
          onClick={() => push('/home/settings')}
        />
      </BottomNavigation>
    </MobileFooterNavigationPropsStyle>
  );
};

export default withRouter(MobileFooterNavigation);
