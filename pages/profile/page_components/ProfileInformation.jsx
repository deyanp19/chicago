import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export default function ProfileInformation() {
    const {isLoggedIn, logout, user} = useContext(AuthContext);

    return (
        <div>
            <h1>Hello {user.name}</h1>
            <p>Is logged in now: <b>{isLoggedIn ? "True" : "False"}</b></p>
            <p>User Information:</p>
            <ul>
                <li>ID:  {user.id}</li>
                <li><b>email: </b>{user.email}</li>

                <li><b>name: </b>{user.name}</li>
            </ul>
        </div>
    );
}