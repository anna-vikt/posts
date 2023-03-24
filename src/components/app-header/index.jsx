import s from "./styles.module.css";

import { Menu as MenuIcon, Add } from '@mui/icons-material';

import cn from 'classnames';
import { AppBar, IconButton, Toolbar, Typography, Button } from "@mui/material";


export function AppHeader() {
    return (
        <AppBar className={s.appbar} position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Posts
          </Typography>
          <Button color="inherit">Login</Button>
          <Button color="inherit"><Add/>Создать пост</Button>
        </Toolbar>
      </AppBar>
    )
}
