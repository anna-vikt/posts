import { CssBaseline } from "@mui/material";
import { Container } from "@mui/system";
import { postData } from "../../postData";
import { AppHeader } from "../app-header";
import { PostList } from "../post-list/post-list";
import { Footer } from "../footer";

import api from "../../utils/api";
import { useEffect, useState } from "react";
import { isLiked } from "../../utils/post";




export function App() {
    const [posts, setPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        api.getAllInfo()
            .then(([dataPosts, dataUser]) => {
                setPosts(dataPosts);
                setCurrentUser(dataUser)
            })
            .catch(data => console.log(data))
    }, [])

    function handlePostLike(post) {
        const like = isLiked(post.likes, currentUser._id);
        api.changeLikePostStatus(post._id, like)
            .then((updateCard) => {
                const newPosts = posts.map(cardState => {
                    console.log("old", cardState);
                    console.log("new", cardState);
                    return cardState._id === updateCard._id ? updateCard : cardState
                })

                setPosts(newPosts)
            })
    }

    return (
        <>
            <CssBaseline />
            <Container>
                <AppHeader user={currentUser} />
                <PostList posts={posts} onPostLike={handlePostLike}/>
                <Footer />
            </Container>
        </>

    )
}