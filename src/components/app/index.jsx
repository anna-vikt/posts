import { postData } from "../../postData";
import { AppHeader } from "../app-header";
import { PostList } from "../post-list/post-list";
import { CreateNewPost } from "../create-new-post";
import { EditPost } from "../edit-post";
import { Popup } from "../popup";
import { Footer } from "../footer";

import api from "../../utils/api";
import { useEffect, useState } from "react";
import { isLiked } from "../../utils/post";

import { CssBaseline, Pagination, Stack } from "@mui/material";
import { Container } from "@mui/system";
import PostDetailed from "../post-detailed/post-detailed";
import PostPage from "../../pages/post-page";
import { Route, Routes, useLocation, useNavigate} from "react-router-dom";
import { UserContext } from "../../contexts/current-user-context";
import { NotFoundPage } from "../../pages/notfoundpage";

export function App() {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(0);
  const [refresh, setRefresh] = useState(true);
  const [popupActive, setPopupActive] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const navigate = useNavigate();

  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const initialPath = location.state?.initialPath;

  const handleOpenPopup = () => { setPopupActive(true) };
  const handleClickClosePopup = () => {setPopupActive(false)}


  useEffect(() => {
    api
      .getPaginateInfo(page)
      .then(([postsData, userInfoData]) => {
        setCurrentUser(userInfoData);
        setPosts(postsData.posts);
        setPageQty(Math.ceil(postsData.total / 12));
      })
      .catch((err) => console.log(err));
  }, [page, refresh, posts]);

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
  function handlePostAdd(data) {
    api.addNewPost(data).then(() => page === 1 ? setRefresh((refresh) => !refresh) : setPage(1)) 
  }
  function handlePostEdit(_id, data) {
    api.editPost(_id, data).then(() => setRefresh((refresh) => !refresh)) 
  }

  function handlePostDelete(post) {
    api.deletePost(post._id).then((updatePost) => {
      const newPosts = posts.filter((post) => {
        return post._id !== updatePost._id;
      });
      setPosts(newPosts);
    });
  }

  const handleClickCancelButton = (e) => {
    e.preventDefault();
    navigate('/', { replace: true, state:{  backgroundLocation: {...location, state: null}, initialPath }})
}

  return (
    <>
      <UserContext.Provider value={currentUser}>
        <CssBaseline />
        <Container>
          <AppHeader user={currentUser} handleOpenPopup={handleOpenPopup} />
          <Routes location={(backgroundLocation && { ...backgroundLocation, pathname: initialPath }) || location} >
            <Route
              path="/postpage/:postID"
              element={<PostPage onPostLike={handlePostLike}
              onDelete={handlePostDelete}
              onEdit={handleOpenPopup} 
              
              />}
            />
            <Route
              path="/"
              element={
                <>
                  <PostList
                    posts={posts}
                    onPostLike={handlePostLike}
                    currentUser={currentUser}
                    onDelete={handlePostDelete}
                    
                  />
                  <Stack>
                    {!!pageQty && (
                      <Pagination
                        count={pageQty}
                        page={page}
                        onChange={(_, num) => {
                          window.scroll({
                            top: 0,
                            left: 0,
                            behavior: "instant",
                          });
                          setPage(num);
                        }}
                        showFirstButton
                        showLastButton
                        sx={{ marginY: 3, marginX: 'auto' }}
                      />
                    )}
                  </Stack>
                </>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          {backgroundLocation && <Routes>
            <Route
              path="/create"
              element={
                <Popup
                  popupActive={popupActive}
                  onClose={handleClickClosePopup}>
                  <CreateNewPost handlePostAdd={handlePostAdd} handleClickCancel={handleClickCancelButton}/>
                </Popup>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <Popup
                  popupActive={popupActive}
                  onClose={handleClickClosePopup}>
                  <EditPost handlePostEdit={handlePostEdit} handleClickCancel={handleClickCancelButton}/>
                </Popup>
              }
            />
          </Routes>}
        </Container>
        <Footer />
      </UserContext.Provider>
    </>
  );
}
