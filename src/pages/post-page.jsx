import { useState } from "react";
import { useEffect } from "react";
import PostDetailed from "../components/post-detailed/post-detailed";
import api from "../utils/api";

const ID_POST = '6432e07daa39712183bd932b';


function PostPage() {
    const [post, setPost] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        api.getInfoPost(ID_POST)
            .then(([postData, userData]) => {
                console.log(postData, userData);
                setPost(postData);
                setCurrentUser(userData)
            })
    }, [])

    
    return ( 
        <PostDetailed {...post} user={currentUser}/>
        
     );
}

export default PostPage;