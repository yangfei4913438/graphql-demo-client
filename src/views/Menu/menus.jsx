import React from 'react';
import './menus.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import RouteList from '../../Router/helper';

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const Menus = () => {
  return (
    <article id={'menus'}>
      <List component="nav">
        {RouteList.map((item, idx) => {
          return (
            <ListItemLink selected={window.location.pathname === item.path} href={item.path} key={idx}>
              <item.icon style={{ marginRight: 15 }} />
              <ListItemText primary={item.name} />
            </ListItemLink>
          );
        })}
      </List>
      <div className={'menu_img'} />
    </article>
  );
};

export default Menus;
