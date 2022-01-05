import React, { useState } from 'react';
import {
  AppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@mui/material';
import { Redirect, useHistory } from 'react-router';
import { useLogoutMutation } from '../generated/graphql';
import { setAccessToken } from '../accessToken';
import { useClient, useUser } from '../contexts';
import { Box } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Sidebar from './Sidebar';

type Props =
  | {
      options?: { text: string; link: string; onClick?: Promise<void> }[];
      sidebar: true;
      sidebarOptions?: { text: string; link: string }[];
    }
  | {
      options?: { text: string; link: string; onClick?: Promise<void> }[];
      sidebar: false;
      sidebarOptions?: never;
    };

export const Header: React.FC<Props> = ({
  options,
  sidebar,
  sidebarOptions
}) => {
  const history = useHistory();
  const { user, setUser } = useUser();
  const { client } = useClient();
  const [loggedOut, setLoggedOut] = useState(false);
  const [logout] = useLogoutMutation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  async function handleLogout() {
    if (user) {
      try {
        await client.cache.reset();
        setAccessToken('');
        const response = await logout();
        if (response) {
          setLoggedOut(true);
          setUser(null);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  if (loggedOut) {
    return <Redirect to='/login' />;
  }

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          handleMenuClose();
          history.push('/my-account');
        }}
      >
        My Account
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleLogout();
          handleMenuClose();
        }}
      >
        Log Out
      </MenuItem>
    </Menu>
  );

  return (
    <React.Fragment>
      <AppBar position='static' elevation={2}>
        <Toolbar>
          {sidebar && (
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}
              onClick={() => setSidebarOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            className='hkfont-bold'
            color='inherit'
            variant='h6'
            onClick={() => history.push('/')}
            sx={{ cursor: 'pointer' }}
          >
            {'KeyCalendar'}
          </Typography>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            {options &&
              options.map((option, i) => {
                return (
                  <Button
                    color='inherit'
                    key={i}
                    onClick={() => history.push(option.link)}
                  >
                    {option.text}
                  </Button>
                );
              })}
          </Box>
          {/* {user && <Typography>{user.name}</Typography>} */}
          {user && (
            <IconButton color='inherit' onClick={handleProfileMenuOpen}>
              <Typography className='hkfont'>
                {user.name}&nbsp;&nbsp;
              </Typography>
              <AccountCircle />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      {renderMenu}
      {sidebar && sidebarOptions && (
        <Sidebar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          options={sidebarOptions}
        />
      )}
    </React.Fragment>
  );
};

export default Header;
