import { ACCESS_TOKEN, TOKEN_TYPE, EXPIRES_IN } from "../common";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
// const ACCESS_TOKEN_KEY
const scope = "user-top-read user-follow-read playlist-read-private user-library-read";
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const APP_URL = import.meta.env.VITE_APP_URL;
const autorizeUser = ()=>{
    const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=${scope}&redirect_uri=${REDIRECT_URI}&show_dialogue=true`;
    window.open(url, "login", "width=800,height=600")
}
document.addEventListener("DOMContentLoaded", ()=>{
    const login_button = document.getElementById("spotify_login_button");
    login_button.addEventListener("click", autorizeUser);
});

window.setItemsInLocalStorage = ({accessToken, tokenType, expiresIn})=>{
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(TOKEN_TYPE, tokenType);
    localStorage.setItem(EXPIRES_IN, expiresIn);
    window.location.href = APP_URL;
}
window.addEventListener("load", ()=>{
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if(accessToken){
        window.location.href =`${APP_URL}/dashboard/dashboard.html`;
    }

    if(window.opener!==null && !window.opener.closed){ //if we dont get access token and popuo is not open and popup has not been closed
        window.focus();
        if(window.location.href.includes("error")){  //if popup is not closed by user 
            window.close();
        }
        console.log(window.location.hash)
        const {hash} = window.location;
        const searchParams  = new URLSearchParams(hash);
        const accessToken = searchParams.get("#access_token");
        const tokenType = searchParams.get("token_type");
        const expiresIn = searchParams.get("expires_in");
        if(accessToken){
            window.close();
            window.opener.setItemsInLocalStorage({accessToken, tokenType, expiresIn});
            
        }
        else{
            window.close();
        }
    }
    
})