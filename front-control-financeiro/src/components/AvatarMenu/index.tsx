import React, { useContext, useState } from "react";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { menuFontSize } from "./styles";
import { UsersContext, useUsersContext } from "../../hooks/auth/useAuthContext";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";


export  function AvatarMenu() {

  const { user } = useContext(UsersContext);
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const authLogout = useUsersContext();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    authLogout.signout();
    navigate('/login');
  };

  function obterIniciais(name: string) {
    const partesDoNome = name.split(' ');

    if (partesDoNome.length >= 2) {
      const primeiraLetraPrimeiroNome = partesDoNome[0][0].toUpperCase();
      const primeiraLetraUltimoNome = partesDoNome[partesDoNome.length - 1][0].toUpperCase();
  
      return primeiraLetraPrimeiroNome + primeiraLetraUltimoNome;
    } else {
      return null;
    }
  }

  const iniciais = obterIniciais(user as any);
  
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
       
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar
             sx={{ width: 40, height: 40 }}
             style={{fontSize: '1rem', fontWeight:'600', color: 'var(--blue)', backgroundColor: 'white'}}
             >
                {iniciais}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 19,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem> */}
       
        <h3 style={{alignItems: 'center', textAlign: 'center'}}>{user as any}</h3>
        
        <Divider />
         {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem> */}
        <MenuItem style={menuFontSize} onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Trocar a Senha
        </MenuItem>
        <MenuItem style={menuFontSize} onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
