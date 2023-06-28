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

    const mainWidth : CSSProperties = {
        width:"430px"
    }
    const flexColumnCenter : CSSProperties = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }
    const titleStyle : CSSProperties = {
        display: "inline-flex",
        padding: "38px 165px",
        alignItems: "flex-start",
        gap: "10px"
    }
    const flexRowCenter : CSSProperties = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    }
    return(
        <div id="signup" style={{...mainWidth,...flexColumnCenter}}>
            <form method="POST"style={flexColumnCenter}>
                <h1 style={titleStyle}>회원가입</h1>
                <label htmlFor='id' style={flexRowCenter}>
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