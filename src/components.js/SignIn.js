import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { signinWithGoogle } from '../firebase'
import { userContext } from '../providers/UserProvider'

function SignIn() {
    const auth = useContext(userContext);
    if (auth.user) {
        return <Redirect to="/" />
    }

    return (
        <div className="signin-form">
            <h1>Sign In</h1>
            <button className="btn basic-btn" onClick={signinWithGoogle}>
                <img src="https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Google-256.png" alt="" />
                Sign in With Google
            </button>
            <div style={{ textAlign: 'center', fontSize: 13 }}>OR</div>
            <button className="btn basic-btn" onClick={signinWithGoogle}>
                <img src="https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Google-256.png" alt="" />
                Sign Up With Google
            </button>

        </div>
    )
}

export default SignIn;