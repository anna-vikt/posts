import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import FormInput from '../form-input';
import Form from "../form";
import api from '../../utils/api'
import { useLocation, useNavigate} from 'react-router-dom';
import { useState, useEffect} from 'react';
import s from './styles.module.css'


export function EditPost ({handlePostEdit, handleClickCancel})  {
    
    const navigate = useNavigate();
    const location = useLocation();
    const initialPath = location.state?.initialPath;
    // const [post, setPost] = useState();
    
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [tags, setTags] = useState(['']);
    const {state:{postId}} = location;
    // console.log(location)

    // console.log('postID', postId)
//     useEffect(() => {   
//       api.getInfoPost(postId)
//           .then(([postData]) => {
//             setImage(postData.image);                 
//             setTitle(postData.title);                 
//             setText(postData.text);                 
//             setTags(postData.tags);                 
//           }).catch((err)=>{
//             console.log(err)

//           })      
//   },[])


    const {register, handleSubmit, formState: {errors, isValid}, reset} = useForm(
        {
            mode: "onBlur",
            defaultValues: async() => {
                const[{image, title, text, tags}] = await api.getInfoPost(postId);
                setImage(image);
                setTitle(title);
                setText(text);
                setTags(tags);
                return {image: image, title: title, text: text, tags: tags}
            }
        });
    
    const submitForm = (data) => { 
        if (typeof data.tags === 'string') 
        {
            data.tags = data.tags.split(",");
            if (data.tags[0] === "") data.tags = [];
            for (let i = 0; i < data.tags.length; i++) {
                data.tags[i] = data.tags[i].trim();
            }

        }
        
        console.log('dataForm', data)
        handlePostEdit(postId, data);
        navigate('/', { replace: true, state:{ backgroundLocation: {...location, state: null}, initialPath }})
        reset();   
    }
    

    const titlePost = register('title', { 
        minLength: {
            value: 3,
            message: "Заголовок поста должен содержать не менее 3 символов"
        }
    })
    
   
    const imagePost = register('image', {
        pattern: {
            value: /^https:\/\/(.+?)\/(([a-zA-Z0-9_ \-%\.]*)\.(jpg|jpeg))/,
            message: "Загрузите изображение в формате jpg/jpeg"
        }    
    })
    
    const textPost = register('text', {
        minLength: {
            value: 5,
            message: "Текст поста должен содержать не менее 150 символов"
        }
    })

    const tagsPost = register('tags');
    
  
    return (
        <Form title="Edit post" handleFormSubmit={handleSubmit(submitForm)}>
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
            
            <Button type='submit' disabled={!isValid}>Edit</Button>
            <Button type='button'color='secondary' onClick={handleClickCancel}>Cancel</Button>
        </Form>
    )
}