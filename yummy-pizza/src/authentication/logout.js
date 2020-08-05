import axios from "axios";
import React from 'react';

export default function LogOut() {

    return (
        axios.get(process.env.REACT_APP_API_GATEWAY+`logout`, {
                // headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
            }
        ).then((resp) => {
                console.log(resp)
                //logged out  successfully
                if (resp['data']['success']) {
                    console.log(localStorage)
                    localStorage.clear();
                    window.location.href = '/home'
                }

            }
        ).catch((error) => {//the alert is shown to the user if the logout returns error
            alert(error)
        })
    )
}
