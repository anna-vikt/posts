import { Avatar, Box, CardHeader, Grid } from '@mui/material';
import s from './styles.module.css';

import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';


dayjs.locale('ru');
dayjs.extend(relativeTime)

function PostDetailed({ image, title, author, created_at, user }) {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} md={8}>
        <div className={s.imgWrapper}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" src={author.avatar}>

              </Avatar>
            }

            title={`${author.name} ${author.about}`}
            subheader={dayjs(created_at).fromNow()}
          />
        </div>
        {user?.name}

      </Grid>
      <Grid item xs={12} md={4}>

      </Grid>
    </Grid>

  )
}

export default PostDetailed;