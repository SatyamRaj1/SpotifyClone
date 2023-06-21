const client_id = "09e6956b9eaa474ba5790321d3420b34";
const scope = "user-top-read user-follow-read playlist-read-private user-library-read";
const redirect_uri = "http://localhost:3000/login/login.html";
const ACCESS_TOKEN_KEY = "accessToken"
const app_url = "http://localhost:3000"
const autorizeUser = ()=>{
    const url = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=${scope}&redirect_uri=${redirect_uri}&show_dialogue=true`;
    window.open(url, "login", "width=800,height=600")
}
document.addEventListener("DOMContentLoaded", ()=>{
    const login_button = document.getElementById("spotify_login_button");
    login_button.addEventListener("click", autorizeUser);
});

window.setItemsInLocalStorage = ({accessToken, tokenType, expiresIn})=>{
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("tokenType", tokenType);
    localStorage.setItem("expiresIn", expiresIn);
    window.location.href = app_url;
}
window.addEventListener("load", ()=>{
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if(accessToken){
        window.location.href =`${app_url}/dashboard/dashboard.html`;
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