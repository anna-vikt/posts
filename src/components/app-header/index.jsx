import s from "./styles.module.css";
import { Menu as MenuIcon, Add } from '@mui/icons-material';
import cn from 'classnames';
import { AppBar, IconButton, Toolbar, Typography, Button } from "@mui/material";
import { UserContext } from "../../contexts/current-user-context";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";


export function AppHeader({ handleOpenPopup}) {
  const user = useContext(UserContext);
  const location = useLocation();
  const initialPath = location.state?.initialPath;
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
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Posts
          </Typography>
          <Button color="inherit" >{user?.name}:{user?.about}</Button>
          <Link to='/create' replace state={{ backgroundLocation: {...location, state: null}, initialPath }}>
              <Button 
                color="inherit" 
                onClick={handleOpenPopup}>
                  <Add/>Создать пост
              </Button>
          </Link>
        </Toolbar>
      </AppBar>
    )
}
