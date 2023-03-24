import { CssBaseline } from "@mui/material";
import { Container } from "@mui/system";
import { postData } from "../../postData";
import { AppHeader } from "../app-header";
import { PostList } from "../post-list/post-list";


export function App() {
    return (
        <>
            <CssBaseline />
            <Container>
                <AppHeader />
                <PostList posts={postData}/>
            </Container>
        </>

    )
}