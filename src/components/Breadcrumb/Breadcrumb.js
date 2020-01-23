import React from 'react';
import {Link} from 'react-router-dom';
import {Breadcrumb, Container, Divider} from 'semantic-ui-react'

const Breadcrumbs = (props) => {
  const paths = props.location.pathname.split('/');
  const userId = paths[3];
  const filtered = paths.filter(path => !Number(path)).slice(1);

  const routes = [];

  filtered.map((path, index) => {
    const lastIndex = index === filtered.length - 1;

    if (path === 'home') {
      return routes.push({
        active: lastIndex,
        link: '/home',
        title: 'Home'
      });
    } else if (path === 'carlist') {
      return routes.push({
        active: lastIndex,
        link: `/home/carlist/${userId}`,
        title: "Inventory"
      });
    }
    return routes.push({
      active: lastIndex,
      link: path,
      title: path
    });
  });

  return (
    <Container>
      <Breadcrumb size="large">
        {routes.map((route, index) => (
          <React.Fragment key={`route-${index}`}>
            <Breadcrumb.Section>
              {
                !route.active 
                ? <Link style={{color: '#00b5ad'}} to={route.link}>{route.title}</Link>
                : route.title
              }
            </Breadcrumb.Section>
            {!route.active && <Breadcrumb.Divider icon='right chevron' />}
          </React.Fragment>
        ))}
      </Breadcrumb>
      <Divider />
    </Container>
  );
};

export default Breadcrumbs;
