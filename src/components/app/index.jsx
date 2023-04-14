import { postData } from "../../postData";
import { AppHeader } from "../app-header";
import { PostList } from "../post-list/post-list";
import { Popup } from "../popup";
import { Footer } from "../footer";
import { AppPagination } from "../pagination";

import api from "../../utils/api";
import { useEffect, useState } from "react";
import { isLiked } from "../../utils/post";

import { CssBaseline } from "@mui/material";
import { Container } from "@mui/system";
import PostDetailed from "../post-detailed/post-detailed";
import PostPage from "../../pages/post-page";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "../../contexts/current-user-context";

export function App() {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [popupActive, setPopupActive] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const handleOpenPopup = () => {
    setPopupActive(true);
  };

  useEffect(() => {
    api
      .getAllInfo()
      .then(([dataPosts, dataUser]) => {
        setPosts(dataPosts);
        setCurrentUser(dataUser);
      })
      .catch((data) => console.log(data));
  }, []);

  function handlePostLike(post) {
    const like = isLiked(post.likes, currentUser._id);
    return api.changeLikePostStatus(post._id, like).then((updateCard) => {
      const newPosts = posts.map((cardState) => {
        return cardState._id === updateCard._id ? updateCard : cardState;
      });

      setPosts(newPosts);

      if (!like) {
        setFavorites(prevState => [...prevState, updateCard])
      } else {
          setFavorites(prevState => prevState.filter(card => card._id !== updateCard._id))
        }
    });
  }

  function handlePostDelete(post) {
    api.deletePost(post._id).then((updatePost) => {
      const newPosts = posts.filter((post) => {
        return post._id !== updatePost._id;
      });
      setPosts(newPosts);
    });
  }

  return (
    <>
      <UserContext.Provider value={currentUser}>
        <CssBaseline />
        <Container>
          <AppHeader user={currentUser} handleOpenPopup={handleOpenPopup} />
          <Routes>
            <Route
              path="/postpage/:postID"
              element={<PostPage onPostLike={handlePostLike} />}
            />
            <Route
              path="/"
              element={
                <PostList
                  posts={posts}
                  onPostLike={handlePostLike}
                  currentUser={currentUser}
                  onDelete={handlePostDelete}
                />
              }
            />
          </Routes>

          <AppPagination />
          <Footer />
        </Container>
        <Popup popupActive={popupActive} setPopupActive={setPopupActive}>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus,
            provident iste voluptates pariatur neque mollitia eum quibusdam
            numquam iure at eveniet, ipsa aliquam porro vitae. Iure, dolorum.
            Repellendus, molestiae iure!
          </p>
        </Popup>
      </UserContext.Provider>
    </>
  );
}
