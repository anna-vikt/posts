import { useState } from "react";
import { useEffect } from "react";
import PostDetailed from "../components/post-detailed/post-detailed";
import api from "../utils/api";
import { isLiked } from "../utils/post";
import { useParams } from "react-router-dom";
import { NotFoundPage } from "./notfoundpage";

const ID_POST = '6432e07daa39712183bd932b';


function PostPage({onDelete}) {
    const [post, setPost] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const {postID} = useParams();
    
    function handlePostLike(post) {
        const like = isLiked(post.likes, currentUser._id);
        api.changeLikePostStatus(post._id, like). then((updatePost) => {
            setPost(updatePost);
        })
    }

    useEffect(() => {
        api.getInfoPost(postID)
            .then(([postData, userData]) => {
                console.log(postData, userData);
                setPost(postData);
                setCurrentUser(userData)
            })
        
    }, [postID])

    
    return ( 
        <PostDetailed {...post} user={currentUser} onPostLike={handlePostLike} onDelete={onDelete}/>
        
     );
}

export default PostPage;