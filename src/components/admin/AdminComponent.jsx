import { AuthContext } from "@/context/AuthContext";
import { CssBaseline, ListItemText } from "@mui/material";
import { useContext } from "react";
import AppTheme from '@components/AppTheme';
import List from '@mui/material/List';
import ListItem from "@mui/material/ListItem";
import Link from "next/link";
import {
    Box,
    Button,
    Typography,
    Container,
    Card,
    CardContent,
    CardActions
} from '@mui/material';
import PostArticleForm from "@/components/admin/PostArticleForm"

export default function AdminComponent(props) {
    const {isLoggedIn, logout, user} = useContext(AuthContext);

    return (
        <Container maxWidth="md">
        <Box mt={4}>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Admin Dashboard
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Welcome to the Admin Section!
                    </Typography>
                    {user.isAdmin ? (
                        <>
                            <Typography variant="body2">
                                You are logged in as an admin.
                            </Typography>
                           
                        </>
                    ) : (
                        <Typography variant="body2">
                            Please log in to access the admin features.
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </Box>
        <PostArticleForm/>
    </Container>
    );
}