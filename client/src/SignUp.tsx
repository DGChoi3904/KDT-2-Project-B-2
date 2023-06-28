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
        justifyContent: "center",
        alignItems : "center"
    }
    const signUpInputName : CSSProperties = {
        width:"29.5vw",
        color: "#000",
        fontSize: "25px",
        fontFamily: "Saira",
        fontWeight: "500",
    }
    const signUpLabelSize : CSSProperties = {
        width: "100%",
        height:"115px"
    }
    return(
        <div id="signup" style={{...mainWidth,...flexColumnCenter}}>
            <form method="POST"style={flexColumnCenter}>
                <h1 style={titleStyle}>회원가입</h1>
                <label htmlFor='id' style={{...signUpLabelSize,...flexRowCenter}}>
                    <div style={{...flexRowCenter,...signUpInputName}}>ID</div>
                    <div>
                        <input name='id' onChange={handleIdChange} value={id} />
                    </div>
                </label>
                <label htmlFor='pwd' style={{...signUpLabelSize,...flexRowCenter}}>
                    <div style={{...flexRowCenter,...signUpInputName}}>PW</div>
                    <div>
                        <input name='pwd' onChange={handlePwdChange} value={pwd} />
                    </div>
                </label>
                <label htmlFor='pwdCheck' style={{...signUpLabelSize,...flexRowCenter}}>
                    <div style={{...flexRowCenter,...signUpInputName}}>PW<br/>Check</div>
                    <div>
                        <input name='pwdCheck' onChange={handlePwdCheckChange} value={pwdCheck} />
                    </div>
                </label>
                <label htmlFor='name' style={{...signUpLabelSize,...flexRowCenter}}>
                    <div style={{...flexRowCenter,...signUpInputName}}>Name</div>
                    <div>
                        <input name='name' onChange={handleNameChange} value={name} />
                    </div>
                </label>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp;