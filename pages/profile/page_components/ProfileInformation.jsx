import { AuthContext } from "@/context/AuthContext";
import { CssBaseline, ListItemText } from "@mui/material";
import { useContext } from "react";
import AppTheme from '@components/AppTheme';
import List from '@mui/material/List';
import ListItem from "@mui/material/ListItem";


export default function ProfileInformation(props) {
    const {isLoggedIn, logout, user} = useContext(AuthContext);

    return (
        <AppTheme {...props} >
            <CssBaseline enableColorScheme />
        <div>
            <h1>Hello {user.name}</h1>
             <p>Is logged in now: <b>{isLoggedIn ? "True" : "False"}</b></p>
            <p>User Information:</p>
           <List component="ol"> 
                <ListItemText primary={`ID: ${user.id}`} />
                <ListItemText primary={`name: ${user.name}`} />
                <ListItemText primary={`email: ${user.email}`} />
           </List>
        </div>
        </AppTheme>
    );
}