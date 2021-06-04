import React from 'react'
import useStyles from './styles';
import { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, InputLabel, FormHelperText, FormControl, NativeSelect } from '@material-ui/core';
//import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';

function Form({ currentId, setCurrentId }) {
    const [postData, setPostData] = useState({
        title: '', description: '', price: 0, category: '', phoneno: '', selectedFile: ''
    });
    const user = JSON.parse(localStorage.getItem('profile'));
    const post = useSelector(state => currentId ? state.posts.find((p) => p._id === currentId) : null)
    const classes = useStyles();
    const [image, setImage] = useState();
    const dispatch = useDispatch();
    useEffect(() => {
        if (post) setPostData(post);
    }, [post])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        }
        else {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
        }
        clear();
    }
    const clear = () => {
        setCurrentId(null);
        setPostData({
            title: '', description: '', price: 0, category: '', phoneno: '', selectedFile: ''
        });
        setImage("");
    }
    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setPostData({ ...postData, selectedFile: base64 });
    }
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader?.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }
    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper} elevation={6}>
                <Typography varient="h6" align="center">
                    Please login to sell your product.
                </Typography>
            </Paper>
        )
    }
    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography varient="h6">{currentId ? `Edit` : 'Post'} Your Ad</Typography>
                <TextField name="title" variant="outlined" label="Ad title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="description" variant="outlined" label="Description" fullWidth multiline rows={4} value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })} />
                <span className={classes.span}>
                    <TextField name="price" className={classes.price} variant="outlined" label="Price" fullWidth value={postData.price} onChange={(e) => setPostData({ ...postData, price: e.target.value })} />
                    <FormControl className={classes.category}>
                        <InputLabel htmlFor="age-native-helper" fullWidth >Category</InputLabel>
                        <NativeSelect
                            value={postData.category}
                            onChange={(e) => setPostData({ ...postData, category: e.target.value })}>
                            <option aria-label="None" value="" />
                            <option value={"Vehicles"}>Vehicles</option>
                            <option value={"Electronics"}>Electronics</option>
                            <option value={"Property"}>Property</option>
                            <option value={"Services"}>Services</option>
                        </NativeSelect>
                        <FormHelperText>Select suitable category.</FormHelperText>
                    </FormControl>
                </span>
                <TextField name="Phoneno" variant="outlined" label="Phone#" fullWidth value={postData.phoneno} onChange={(e) => setPostData({...postData,phoneno:e.target.value})} />
                <div className={classes.fileInput}>
                    {/* <FileBase type="file" multiple={false} onDone={(base64)=>setPostData({...postData,selectedFile:base64})}/> */}
                    <input value={image} type="file" multiple={false} onChange={(e) => { uploadImage(e) }} />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Post Ad</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form
