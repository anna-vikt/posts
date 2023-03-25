import { useState } from 'react'
import { CssBaseline } from "@mui/material";
import { Container } from "@mui/system";
import { postData } from "../../postData";
import { AppHeader } from "../app-header";
import { PostList } from "../post-list/post-list";
import { Popup } from "../popup";


export function App() {
    const [popupActive, setPopupActive] = useState(false);
    const handleOpenPopup = () => {
        setPopupActive(true)
    }
    return (
        <>
            <CssBaseline />
            <Container>
                <AppHeader handleOpenPopup={handleOpenPopup} />
                <PostList posts={postData}/>
            </Container>
            <Popup popupActive={popupActive} setPopupActive={setPopupActive}>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus, provident iste voluptates pariatur neque mollitia eum quibusdam numquam iure at eveniet, ipsa aliquam porro vitae. Iure, dolorum. Repellendus, molestiae iure!</p>
            </Popup>
        </>

    )
}