import React from 'react';
import Drawer from '@material-ui/core/Drawer';

const DrawerWrapper = ({ anchor, open, onChange, children }) => {
  return (
    <Drawer anchor={anchor} open={open} onClose={onChange}>
      {children}
    </Drawer>
  );
};

export default DrawerWrapper;
