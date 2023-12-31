import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"
import jwt_decode from "jwt-decode";

const Header = (props) => {
    let onSuccess = (credentialResponse) => {
        let token = credentialResponse.credential;
        try {
            let data = jwt_decode(token);
            //store item in browser
            localStorage.setItem('zc_auth_token', token);
            alert("login successfully :)")
            window.location.assign("/");
        } catch (error) {
            console.log(error);
            //remove item from localstorage
            localStorage.removeItem('zc_auth_token');
        };

    }
    let onError = () => { console.log("login failed"); }
    let logout = () => {
        let isLogout = window.confirm("Are you sure to logout");
        if (isLogout) {
            localStorage.removeItem("zc_auth_token");
            window.location.reload();
        }
    };
    return (
        <>
            <GoogleOAuthProvider clientId="862455110660-l3s4lg5apkns739gss4elhhmus9l10rp.apps.googleusercontent.com">
                <div
                    className="modal fade"
                    id="login-sign-up"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">
                                    Login / SignUp
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <GoogleLogin onSuccess={onSuccess} onError={onError} />;
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-10 d-flex justify-content-between py-2">
                    {props.logo === false ? <p></p> : <p className="m-0 brand">e!</p>}

                    <div>
                        {props.user ? (<> <button className="btn btn-light">   welcome , {props.user.name} </button>
                            <button className="btn btn-warning mx-2" onClick={logout}> logout</button> </>) : (
                            <button className="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#login-sign-up">Login/signup</button>)}
                    </div>
                </div>
            </GoogleOAuthProvider>
        </>

    );
};
export default Header;