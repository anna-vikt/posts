//import { CenterFocusStrong, ContentPasteRounded } from "@mui/icons-material";
import s from "./styles.pagination.css";

import axios from "axios"; 
import { Container, Pagination } from "@mui/material";
import { useState, useEffect } from "react";
// import { postData } from "../../postData";
// import { PostList } from "../post-list/post-list";

const BASE_URL = 'https://api.react-learning.ru/v2/:groupId/posts/paginate?';

//const BASE_URL = https://api.react-learning.ru/v2/:groupId/posts/paginate?page=<номер страницы>&limit=<число ограничивающее вывод на страницу>&query=<строка фильтрации по title> //добавление навигации

    export function AppPagination() {

    const [posts, setPosts] = useState([]);
    const [query, setQuery] = useState('title');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);

    useEffect(() => {
        axios.get(BASE_URL + `query=${query}&page=${page}`).then(
        ({data}) => {
            console.log(data);
            //setPosts(data.  );
            //setLimit(   )
        }
        )
    }, [query, page]);

    
        return (
        <Container>
        <Pagination>
    page={page}
    variant="outlined"
    sx={{marginY: 3, marginX: 'auto'}}
    size="small"
    showFirstButton
    showLastButton

        </Pagination>
        </Container>
        );
    };