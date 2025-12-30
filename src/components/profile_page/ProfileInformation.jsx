import { AuthContext } from "@/context/AuthContext";
import { CssBaseline, ListItemText } from "@mui/material";
import { useContext } from "react";
import AppTheme from '@components/AppTheme';
import List from '@mui/material/List';
import ListItem from "@mui/material/ListItem";
import Link from "next/link";


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
                <ListItem><ListItemText primary={`ID: ${user.id}`} /></ListItem>
                <ListItem><ListItemText primary={`email: ${user.email}`} /></ListItem>
                <ListItem> <ListItemText primary={`name: ${user.name}`} /></ListItem>
                
                <ListItem     color="secondary" onClick={(event) => {
                    // event.preventDefault();
                    console.log('%cgo to admin Dashboard','color:blue;font-size;18px;');
                }
            }>

                <ListItemText primary={`you are admin: ${user.isAdmin ?"True" : "False"}`} />
                {user.isAdmin && <ListItemText component={Link} href="admin" primary={`Go to Admin Dashboard`} />}

                </ListItem>

             
           </List>
            
        </div>
        </AppTheme>
    );
}