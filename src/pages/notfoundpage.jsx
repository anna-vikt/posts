import { Card, Grid, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from 'react-router';

export const NotFoundPage = () => {
    const navigate = useNavigate();
  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
        }}>
        
        <Typography variant="h1" align="center">404</Typography>
        <Typography variant="h1" align="center">Такой страницы пока еще нет!</Typography>
      </Card>      
    <Button variant="outlined"  size="small" onClick ={() => {navigate(-1)}} sx={{ margin: '0.5rem 1rem 1rem 0' }}>
        Назад
    </Button>
    </Grid>
  );
};