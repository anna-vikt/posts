import { Post } from "../post/post";
import { postData } from "../../postData";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";


export const PostList = ({posts, onPostLike, currentUser, onDelete}) => {
    return (
        <Grid2 container spacing={4}>
            {posts.map(postData => <Post key={postData._id} {...postData} onPostLike={onPostLike} onDelete={onDelete} currentUser={currentUser} />)}
        </Grid2>

    )
}