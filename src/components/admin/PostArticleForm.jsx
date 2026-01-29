import React, { useContext, useState } from 'react';
import { Box, Container, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { styled } from '@mui/material/styles';
import requestMethods from '../../../utils/requestMethods';
import UploadPictureForm from './UploadPictureForm';
import { useRouter } from "next/router";
import { AuthContext } from '@/context/AuthContext';

const ArticlePicturePath = process.env.NEXT_PUBLIC_READ_DIR;

const StyledTextarea = styled(TextareaAutosize)(({ theme }) => ({
        width: '100%',
        padding: theme.spacing(2),
        fontFamily: theme.typography.fontFamily,
        fontSize: '1rem',
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.divider}`,
        '&:focus': {
            borderColor: theme.palette.primary.main,
            outline: 'none',
        },
    }));

const PostArticleFormComponent = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [tag, setTag] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [titleErrorMessage, setTitlelErrorMessage] = useState('');
    const [postError, setPostError] = useState('');

    const { articleFileName } = useContext(AuthContext);
    
    const router = useRouter();
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleTagChange = (e) => {
        setTag(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (titleError ) {
            return;
        };
        setPostError('');
    

        const fd = new FormData(e.currentTarget);
        const data = Object.fromEntries(fd);
               
        // hardcoded data
        data.author={};
        data.author.name = JSON.parse(localStorage.getItem('userData')).name;
        data.author.avatar = "https://cdn.jsdelivr.net/gh/alohe/memojis/png/teams_1.png";
        data.image = ArticlePicturePath + articleFileName;
        try {
            
            await requestMethods.postArticle(data)
            // Reset form
            setTitle('');
            setContent('');

            setSnackbarMessage('Article posted successfully!');
            setOpenSnackbar(true);

            setTimeout(()=>{
                router.push('/');
            },1500);

        } catch (error) {
            console.error('Error posting article:', error);
            setPostError(error.message || 'Posting of article failed')
            setSnackbarMessage('Failed to post article.');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container maxWidth="md">
            <UploadPictureForm/>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    mt: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Post a New Article
                </Typography>
                <TextField
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    value={title}
                    onChange={handleTitleChange}
                    margin="normal"
                />
                <StyledTextarea
                    required
                    minRows={20} maxRows="150" placeholder="Type here your article..."
                    id="content"
                    label="Content"
                    name="content"
                    value={content}
                    onChange={handleContentChange}
                    margin="normal"
                />
                   <TextField
                    required
                    fullWidth
                    id="title"
                    label="Tag"
                    name="tag"
                    value={tag}
                    onChange={handleTagChange}
                    margin="normal"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Post Article
                </Button>
            </Box>

            {/* Snackbar for displaying messages */}
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default PostArticleFormComponent;