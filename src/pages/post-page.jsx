import { useState } from "react";
import { useEffect } from "react";
import PostDetailed from "../components/post-detailed/post-detailed";
import api from "../utils/api";

const ID_POST = '642eea2eaa39712183b88ebf';


function PostPage() {
    const [post, setPost] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        api.getPostById(ID_POST)
            .then(([postData, userData]) => {
                setPost(postData);
                setCurrentUser(userData)
            })
    })

    
    return ( 
        <PostDetailed/>
     );
}

export default PostPage;