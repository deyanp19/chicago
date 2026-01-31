import { useContext, useEffect,  useState } from 'react';
import { Box, Button, CircularProgress, Typography, Snackbar, Alert, AlertTitle } from '@mui/material';  import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { AuthContext } from '@/context/AuthContext';

export default function UploadPictureForm() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');  // State for error messages
    const [successMessage, setSuccessMessage] = useState('');  // State for success messages
    const [isLoading, setIsLoading] = useState(false);  // State for loading indicator
    const [fileSize, setFileSize] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const { articleFileName, uploadFileName } =useContext(AuthContext);

    useEffect(()=>{
        if (process.env.NEXT_PUBLIC_ENV === 'development') {
            setImageUrl( `/images/uploaded_pic/${articleFileName}`);
        } else {
            setImageUrl( `/res/${articleFileName}`);
        }
    },[articleFileName]);
 
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setErrorMessage('');  // Clear errors on new selection
        setSuccessMessage('');
        if (file) {
            // Calculate and format file size (e.g., in KB or MB)
            const sizeInBytes = file.size;
            const sizeInKB = (sizeInBytes / 1024).toFixed(2);  // Convert to KB
            const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);  // Convert to MB if needed
            setFileSize(sizeInBytes > 1024 * 1024 ? `${sizeInMB} MB` : `${sizeInKB} KB`);  // Display in KB or MB
        } else {
            setFileSize('');  // Reset if no file is selected
        }
    };
    
    const handleUpload = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            setErrorMessage('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {    
            setIsLoading(true);   
            setErrorMessage('');
            setSuccessMessage('');

            await uploadFileName(formData);
            setIsLoading(false);
              
            setSuccessMessage('File uploaded successfully!'); 
            
            setSnackbarMessage(`Uploaded `);
            setOpenSnackbar(true);
          
        } catch (error) {
            setErrorMessage('Not uploaded');
            console.error('Error uploading file:', error);
            setSnackbarMessage(`Upload failed: ${error}`);
            setOpenSnackbar(true);
            setIsLoading(false)
        } 
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });
  
    return (
        // {{change 3: Replace the div and form with MUI Box}}
        <Box sx={{ p: 3, maxWidth: 600, margin: 'auto' }}>  {/* Add some basic styling */}
          
            <Box sx={{ p: 3, maxWidth: 600, margin: 'auto' }}>
                <Typography variant="h4" gutterBottom>Upload File</Typography>
                {errorMessage && <Typography color="error">{errorMessage}</Typography>}   
                {successMessage && <Typography color="success.main">{successMessage}</Typography>}  
                {console.log(imageUrl)}
                {articleFileName  && <img src={imageUrl} alt="Uploaded file" style={{ maxWidth: '100%', marginTop: '16px' }} />}  
         
                
                <form onSubmit={handleUpload} enctype="multipart/form-data" sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                <Box sx={{ display: { xs: 'block', sm: 'flex', md: 'flex' },  // Not flex on xs and sm; flex on md and up
  justifyContent: { md: 'space-between' },  gap: 2 }} >
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    startIcon={(<CloudUploadIcon/>)}
                    sx={{ marginBottom: '8px',marginRight: '40px', marginTop: '8px', padding:'8px' }}
                >
                    Select Picture for the Article
                    <VisuallyHiddenInput
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                        multiple
                    />
                </Button>
                 {fileSize && <Typography variant="body2" sx={{ marginBottom: '16px' }}>Selected file size: {fileSize}</Typography>}
                  
              
                    <Button sx={{ margin: 'auto' }} type="submit" variant="contained" color="primary" disabled={isLoading} >{isLoading ? (<CircularProgress/>):'Upload'}</Button>

                </Box>
                 
                </form>
             </Box>
            {/* </form> */}
             {/* Snackbar for displaying messages */}
                        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                           { errorMessage == 'Not uploaded' ? (<Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}> <AlertTitle>Error</AlertTitle>
                                {snackbarMessage}
                            </Alert>)
                                :
                            (<Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                                {snackbarMessage}
                            </Alert>)}

                        </Snackbar>
        </Box>
    );
}