import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';

const AdminComponent = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!title || !content) {
            setSnackbarMessage('Title and content are required.');
            setOpenSnackbar(true);
            return;
        }

        try {
            // Simulate posting the article
            console.log('Posting Article:', { title, content });

            // Reset form
            setTitle('');
            setContent('');

            setSnackbarMessage('Article posted successfully!');
            setOpenSnackbar(true);
        } catch (error) {
            console.error('Error posting article:', error);
            setSnackbarMessage('Failed to post article.');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container maxWidth="md">
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
                <TextField
                    required
                    multiline
                    rows={6}
                    fullWidth
                    id="content"
                    label="Content"
                    name="content"
                    value={content}
                    onChange={handleContentChange}
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

export default AdminComponent;