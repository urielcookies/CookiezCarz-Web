import { FC } from 'react';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import { map } from 'lodash';

import { Card, CardHeader } from '@material-ui/core';
import { FolderSharedOutlined } from '@material-ui/icons';

import HomeStyle from './HomeStyle';

import { ActiveUser, useActiveUser } from '../../context/ActiveUserContext';
import useFetch from '../../hooks/useFetch';
import { fetchUsers } from '../../endpoints';

interface LoginProps {
  history: History;
}

const Home: FC<LoginProps> = ({ history: { push } }) => {
  const activeUser = useActiveUser();
  const users = useFetch(fetchUsers, null);
  return (
    <HomeStyle>
      <Card className="card" variant="outlined" onClick={() => push('/home/mycarlist')}>
        <div className="iconDiv">
          <FolderSharedOutlined style={{ fontSize: 45 }} />
        </div>
        <CardHeader
          className="cardHeader"
          title={activeUser?.Username}
          subheader={activeUser?.Email}
        />
      </Card>

      {map(users.data, (user: ActiveUser) => (
        <Card className="card" variant="outlined" onClick={() => push(`/home/carlist/${user?.Id}`)}>
          <div className="iconDiv">
            <FolderSharedOutlined style={{ fontSize: 45 }} />
          </div>
          <CardHeader
            className="cardHeader"
            title={user?.Username}
            subheader={user?.Email}
          />
        </Card>
      ))}
    </HomeStyle>
  );
};

export default withRouter(Home);
