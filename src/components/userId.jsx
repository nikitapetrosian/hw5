import React from "react";
import { useHistory, useParams } from "react-router";
import api from "../api";
const UserId = () => {
    const params = useParams();
    const { id } = params;
    const allUsers = api.users.fetchAll();
    console.log(id);
    const user = allUsers.find((el) => {
        return el._id === id;
    });
    const history = useHistory();
    const onBack = () => {
        history.push("/users");
    };
    console.log(user);
    return <>
        {user ? <div>
            <h1>{user.name}</h1>
            <h2>{user.profession.name}</h2>
            <h3>{user.qualities.map((el) => {
                return `${el.name} `;
            })}</h3>
            <h3>{user.rate}</h3>
            <h3>{user.completedMeetings}</h3>
            <button onClick={() => { onBack(); }}> back</button>
        </div> : <h2>loading</h2>}

    </>;
};
export default UserId;
