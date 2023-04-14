import { Avatar, Box, Button, CardActions, CardContent, CardHeader, CardMedia, Grid, Typography } from '@mui/material';
import s from './styles.module.css';
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { ReactComponent as LikeIcon } from '../../images/save.svg';
import cn from "classnames";
import { useNavigate } from 'react-router';
import { isLiked } from '../../utils/post';
import { useState } from 'react';
dayjs.locale('ru');
dayjs.extend(relativeTime)

function PostDetailed({ image, title, text, author, created_at, user, likes, _id, onPostLike, tags }) {
  // const navigate = useNavigate();
  const like = isLiked(likes, user?._id);


  function handleClickButtonLike() {
    onPostLike({ likes, _id })
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} md={12}>
        <Button variant="outlined" href="#outlined-buttons" size="small" sx={{ margin: '0.5rem 1rem 1rem 0' }}>
          Назад
        </Button>
      </Grid>

      <Grid item xs={12} md={8}>

        <div className={s.imgWrapper}>
          <CardMedia
            component="img"
            height="300"
            image={image}
            alt={title}
          />
        </div>
      </Grid>
      <Grid item xs={12} md={4}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" src={author?.avatar}>

            </Avatar>
          }
          title={`${author?.name} ${author?.about}`}
          subheader={dayjs(created_at).fromNow()}
        />
        <CardContent>
          <Typography variant='h5' component="h3" gutterBottom>{title}</Typography>
          <Typography variant="body2" color="text.secondary" component="p" >
            {text}
          </Typography>
          <CardActions>
            <button className={cn(s.favorite, { [s.favoriteActive]: like })} onClick={handleClickButtonLike}>
              <LikeIcon />
            </button>
            {likes?.length !== 0 && <div className={s.likes}>{likes?.length}</div>}
            <div className={s.tags}>
              {tags?.map(el => {
                return el = `#${el} `
              })}
            </div>

          </CardActions>

        </CardContent>
      </Grid>
    </Grid>
  )
}
export default PostDetailed;