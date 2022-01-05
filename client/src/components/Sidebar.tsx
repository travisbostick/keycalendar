import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import React, { useState } from 'react';
import { Redirect } from 'react-router';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  options: {
    text: string;
    link: string;
  }[];
}

const Sidebar: React.FC<Props> = ({ options, open, setOpen }) => {
  // const [state, setState] = useState({
  //   top: false,
  //   left: false,
  //   bottom: false,
  //   right: false
  // });

  // const toggleDrawer =
  //   (anchor: string, open: boolean) =>
  //   (event: React.KeyboardEvent | React.MouseEvent) => {
  //     if (
  //       event.type === 'keydown' &&
  //       ((event as React.KeyboardEvent).key === 'Tab' ||
  //         (event as React.KeyboardEvent).key === 'Shift')
  //     ) {
  //       return;
  //     }

  //     setState({ ...state, [anchor]: open });
  //   };

  const [link, setLink] = useState('');

  if (link !== '') {
    return <Redirect to={link} />;
  }

  const list = (anchor: string) => (
    <Box
      // sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      sx={{ width: 250 }}
      role='presentation'
      onClick={() => setOpen(false)}
      onKeyDown={() => setOpen(false)}
    >
      <Divider />
      <List>
        {options.map((option, index) => (
          <ListItem button key={index} onClick={() => setLink(option.link)}>
            <ListItemText primary={option.text} />
          </ListItem>
        ))}
      </List>
      {/* <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Drawer
          anchor={'left'}
          open={open}
          // onClose={toggleDrawer('left', false)}
          onClose={() => setOpen(false)}
        >
          {list('left')}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default Sidebar;
