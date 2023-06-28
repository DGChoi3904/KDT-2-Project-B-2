import React, { useState, ChangeEvent } from 'react';

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

    return(
        <div id="signup">
            <form method="POST">
                <h1>회원가입</h1>
                <label htmlFor='id'>
                    <input name='id' onChange={handleIdChange} value={id} />
                </label>
                <label htmlFor='pwd'>
                    <input name='pwd' onChange={handlePwdChange} value={pwd} />
                </label>
                <label htmlFor='pwdCheck'>
                    <input name='pwdCheck' onChange={handlePwdCheckChange} value={pwdCheck} />
                </label>
                <label htmlFor='name'>
                    <input name='name' onChange={handleNameChange} value={name} />
                </label>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp;