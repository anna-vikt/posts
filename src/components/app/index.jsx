
import { postData } from "../../postData";
import { AppHeader } from "../app-header";
import { PostList } from "../post-list/post-list";
import { Popup } from "../popup";
import { Footer } from "../footer";

import api from "../../utils/api";
import { useEffect, useState } from "react";
import { isLiked } from "../../utils/post";

import { CssBaseline } from "@mui/material";
import { Container } from "@mui/system";




export function App() {
    const [posts, setPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [popupActive, setPopupActive] = useState(false);
    const handleOpenPopup = () => {
        setPopupActive(true)
    }

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
                    return cardState._id === updateCard._id ? updateCard : cardState
                })

                setPosts(newPosts)
            })
    }


    return (
        <>
            <CssBaseline />
            <Container>

                <AppHeader user={currentUser} handleOpenPopup={handleOpenPopup}/>
                <PostList posts={posts} onPostLike={handlePostLike} currentUser={currentUser}/>
                <Footer />

            </Container>
            <Popup popupActive={popupActive} setPopupActive={setPopupActive}>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus, provident iste voluptates pariatur neque mollitia eum quibusdam numquam iure at eveniet, ipsa aliquam porro vitae. Iure, dolorum. Repellendus, molestiae iure!</p>
            </Popup>
        </>

    )
}