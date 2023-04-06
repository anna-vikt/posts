import { Box, Grid } from '@mui/material';
import s from './styles.module.css';

function PostDetailed({image, title}) {
    return (
      <Grid container spacing={0}>
        <Grid item xs={12} md={8}>
            <div className={s.imgWrapper}>
                <img  src={image} alt={title}/>
            </div>
         
        </Grid>
        <Grid item xs={12} md={4}>
          xs=6 md=4
        </Grid>
      </Grid>

    )
}

export default PostDetailed;