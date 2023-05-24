import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import FormInput from '../form-input';
import Form from "../form";
import api from '../../utils/api'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState} from 'react';
import s from './styles.module.css'

export function CreateNewPost ({handlePostAdd, handleClickCancel})  {
    const navigate = useNavigate();
    const location = useLocation();
    const initialPath = location.state?.initialPath;

    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [tags, setTags] = useState([]);

    const {register, handleSubmit, formState: {errors, isValid}, reset} = useForm({mode: "onBlur"});
    
    const submitForm = (data) => {
        data.tags = data.tags.split(",");
        if (data.tags[0] === "") data.tags = [];
        for (let i = 0; i < data.tags.length; i++) {
            data.tags[i] = data.tags[i].trim();
        }
        handlePostAdd(data);
        navigate('/', { replace: true, state:{  backgroundLocation: {...location, state: null}, initialPath }})
        reset();   
    }
    

    const titlePost = register('title', {
        required: {
            value: true,
            message: 'Обязательное поле'
        },
        minLength: {
            value: 3,
            message: "Заголовок поста должен содержать не менее 3 символов"
        }
    })
   
    const imagePost = register('image', {
        required: {
            value: true,
            message: 'Обязательное поле'
        },
        pattern: {
            value: /^https:\/\/(.+?)\/(([a-zA-Z0-9_ \-%\.]*)\.(jpg|jpeg))/,
            message: "Загрузите изображение в формате jpg/jpeg"
        }    
    })
    
    const textPost = register('text', {
        required: {
            value: true,
            message: 'Обязательное поле'
        },
        minLength: {
            value: 5,
            message: "Текст поста должен содержать не менее 150 символов"
        }
    })

    const tagsPost = register('tags');
    
  
    return (
        <Form title="Create a new post" handleFormSubmit={handleSubmit(submitForm)}>
            <FormInput 
                {...imagePost}
                id="imagePost" 
                type="text"
                value={image}
                onChange={(e) =>{setImage(e.target.value)}}
                placeholder="Загрузите изображение"/>
            {errors?.image && <p className={s.errorMessage}>{errors?.image?.message}</p>}
            <FormInput
                {...titlePost}
                id="titlePost" 
                type="text"
                value={title}
                onChange={(e) =>{setTitle(e.target.value)}}
                placeholder="Заголовок поста" />
            {errors?.title && <p className={s.errorMessage}>{errors?.title?.message}</p>}
            <FormInput
                {...textPost}
                id="textPost" 
                typeTag={'textarea'}
                value={text}
                onChange={(e) =>{setText(e.target.value)}} 
                placeholder="Текст поста" />
            {errors?.text && <p className={s.errorMessage}>{errors?.text?.message}</p>}
            <FormInput
                {...tagsPost}
                id="tagsPost" 
                type="text"
                value={tags}
                onChange={(e) =>{setTags(e.target.value)}} 
                placeholder="Добавить тэги" />
            
            <Button type='submit' disabled={!isValid}>Create Post</Button>
            <Button type='button'color='secondary' onClick={handleClickCancel}>Cancel</Button>
        </Form>
    )
}
    

