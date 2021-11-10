import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { isNull, map } from 'lodash';

import { Card, CardHeader } from '@material-ui/core';
import { FolderSharedOutlined } from '@material-ui/icons';

import HomeStyle from './HomeStyle';
import PageLoad from '../PageLoad/PageLoad';

import { ActiveUser, useActiveUser } from '../../context/ActiveUserContext';
import useFetch from '../../hooks/useFetch';
import { fetchUsers } from '../../endpoints';

const Home: FC = () => {
  const activeUser = useActiveUser() as ActiveUser;
  const users = useFetch(fetchUsers, null);
  const navigate = useNavigate();

  if (isNull(activeUser) || users.isLoading) return <PageLoad />;

  return (
    <HomeStyle>
      <div id="outterDiv">
        <Card className="card" variant="outlined" onClick={() => navigate('/home/mycarlist')}>
          <div className="iconDiv">
            <FolderSharedOutlined style={{ fontSize: 45 }} />
          </div>
          <CardHeader
            className="cardHeader"
            title={activeUser.Username}
            subheader={activeUser.Email}
          />
        </Card>

        {map(users.data, (user: ActiveUser) => (
          <Card
            key={user.Id}
            className="card"
            variant="outlined"
            onClick={() => navigate(`/home/carlist/${user.Id}`)}
          >

            <div className="iconDiv">
              <FolderSharedOutlined style={{ fontSize: 45 }} />
            </div>
            <CardHeader
              className="cardHeader"
              title={user.Username}
              subheader={user.Email}
            />
          </Card>
        ))}
      </div>
    </HomeStyle>
  );
};

export default Home;
