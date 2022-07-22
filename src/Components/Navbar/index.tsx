import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { red } from '@mui/material/colors';
import { signOut } from 'firebase/auth';
import { styled, alpha } from '@mui/material/styles';
import { useState, useEffect } from 'react';

import InputBase from '@mui/material/InputBase';
import { Autocomplete, Modal, TextField } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const LogoutButtonColor = red[500];

const pages = ['movies', 'shows'];
const Navbar = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [autocompleteMovies, setAutocompleteMovies] = useState<any[]>([]);
  const [searchedItem, setSearchedItem] = useState<any>();
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  });
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const searchHandler = async (e: React.SyntheticEvent) => {
    try {
      const { results } = await (
        await fetch(
          //@ts-ignore
          `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_TMDB}&query=${e.target.value}`,
        )
      ).json();
      setAutocompleteMovies(
        results.map(({ id, title, name, media_type }: any) => ({
          label: title || name,
          id,
          media_type,
        })),
      );
    } catch {}
  };
  useEffect(() => {
    const search = () => {
      console.log(searchedItem);
      if (searchedItem) {
        navigate(`/${searchedItem?.media_type}/item/${searchedItem?.id}`);
      }
    };
    search();
  }, [searchedItem]);

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              MR
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {isAuth ? (
                  <MenuItem>
                    <Button
                      onClick={() => signOut(auth)}
                      variant="contained"
                      style={{ backgroundColor: LogoutButtonColor }}
                    >
                      Log Out
                    </Button>
                  </MenuItem>
                ) : (
                  <>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography
                        component={Link}
                        to={'/login'}
                        textAlign="center"
                        style={{ textDecoration: 'none', color: 'black' }}
                      >
                        Login
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography
                        component={Link}
                        to={`/signup`}
                        textAlign="center"
                        style={{ textDecoration: 'none', color: 'black' }}
                      >
                        Sign Up
                      </Typography>
                    </MenuItem>
                  </>
                )}
                {pages.map(page => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography
                      component={Link}
                      to={`/${page}`}
                      textAlign="center"
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              MR
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map(page => (
                <Button
                  component={Link}
                  to={`/${page}`}
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
              {isAuth ? (
                <Button
                  onClick={() => signOut(auth)}
                  variant="contained"
                  style={{ backgroundColor: LogoutButtonColor }}
                >
                  Log Out
                </Button>
              ) : (
                <>
                  <Button
                    component={Link}
                    to={'/login'}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Login
                  </Button>

                  <Button
                    component={Link}
                    to={`/signup`}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Box>
            <Autocomplete
              disablePortal
              onChange={(_, data) => setSearchedItem(data)}
              onInputChange={searchHandler}
              options={autocompleteMovies}
              sx={{ width: 300 }}
              renderInput={params => (
                //@ts-ignore
                <TextField
                  key={params.id}
                  {...params}
                  label="Movie"
                  //@ts-ignore
                />
              )}
            />
          </Toolbar>
        </Container>
      </AppBar>
      {/* <Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal> */}
    </>
  );
};
export default Navbar;
