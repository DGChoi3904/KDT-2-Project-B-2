import React, { useState, ChangeEvent, CSSProperties } from 'react';

function SignUp() {
    const [id,setId] = useState<string>("");
    const [pwd,setPwd] = useState<string>("");
    const [pwdCheck,setPwdCheck] = useState<string>("");
    const [name,setName] = useState<string>("");
    
    const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setId(event.target.value);
    }
    const handlePwdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setId(event.target.value);
    }
    const handlePwdCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setId(event.target.value);
    }
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setId(event.target.value);
    }

    const signupComp : CSSProperties = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    }

    return(
        <div id="signup" style={signupComp}>
            <form method="POST">
                <h1>회원가입</h1>
                <label htmlFor='id'>
                    <span>ID</span>
                    <input name='id' onChange={handleIdChange} value={id} />
                </label>
                <label htmlFor='pwd'>
                    <span>PW</span>
                    <input name='pwd' onChange={handlePwdChange} value={pwd} />
                </label>
                <label htmlFor='pwdCheck'>
                    <span>PW Check</span>
                    <input name='pwdCheck' onChange={handlePwdCheckChange} value={pwdCheck} />
                </label>
                <label htmlFor='name'>
                    <span>Name</span>
                    <input name='name' onChange={handleNameChange} value={name} />
                </label>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp;