import React, { useState, ChangeEvent, CSSProperties } from 'react';

function SignUp() {
    const [id,setId] = useState<string>("");
    const [pwd,setPwd] = useState<string>("");
    const [pwdCheck,setPwdCheck] = useState<string>("");
    const [name,setName] = useState<string>("");
    // 커서가 버튼위에 Hover되었는지 확인하는 구문.
    const [isHovered, setIsHovered] = useState<boolean>(false);


    const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setId(event.target.value);
    }
    const handlePwdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPwd(event.target.value);
    }
    const handlePwdCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPwdCheck(event.target.value);
    }
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const signUpComp : CSSProperties = {
        width:"430px",
        backgroundColor: "#FFA41B"
    }
    const flexColumnCenter : CSSProperties = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
    }
    const flexRowCenter : CSSProperties = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems : "center",
        boxSizing: "border-box",
    }
    const titleStyle : CSSProperties = {
        display: "inline-flex",
        padding: "38px 165px",
        alignItems: "flex-start",
        gap: "10px"
    }
    
    const signUpInputName : CSSProperties = {
        width:"30%",
        color: "#000",
        fontSize: "25px",
        fontFamily: "Saira",
        fontWeight: "500",
    }
    const signUpLabelSize : CSSProperties = {
        width: "100%",
        height:"115px"
    }
    const signUpInputBox : CSSProperties = {
        width:"70%",
    }
    const signUpInput : CSSProperties = {
        width: "80%",
        fontSize: "25px",
        border: "0",
        backgroundColor: "inherit",
        borderBottom: "1px solid",
        borderColor: "#000",
        padding: "1px 2px",
    }
    const signUpButtonBox : CSSProperties = {
        width: "430px",   
        height: "266px",
    }
    const signUpButton : CSSProperties = {
        fontSize: "25px",
        border: "0",
        backgroundColor: "inherit",
        borderBottom: "1px solid",
        borderColor: "#000",
        padding: "1px 2px",
    }
    return(
        <div id="signup" style={{...signUpComp,...flexColumnCenter}}>
            <form method="POST"style={flexColumnCenter}>
                <h2 style={titleStyle}>회원가입</h2>
                <label htmlFor='id' style={{...signUpLabelSize,...flexRowCenter}}>
                    <div style={{...flexRowCenter,...signUpInputName}}>ID</div>
                    <div style={{...flexColumnCenter,...signUpInputBox}}>
                        <input name='id' type="text" onChange={handleIdChange} value={id} style={signUpInput} />
                    </div>
                </label>
                <label htmlFor='pwd' style={{...signUpLabelSize,...flexRowCenter}}>
                    <div style={{...flexRowCenter,...signUpInputName}}>PW</div>
                    <div style={{...flexColumnCenter,...signUpInputBox}}>
                        <input name='pwd' type="text" onChange={handlePwdChange} value={pwd} style={signUpInput} />
                    </div>
                </label>
                <label htmlFor='pwdCheck' style={{...signUpLabelSize,...flexRowCenter}}>
                    <div style={{...flexRowCenter,...signUpInputName}}>PW<br/>Check</div>
                    <div style={{...flexColumnCenter,...signUpInputBox}}>
                        <input name='pwdCheck' type="text" onChange={handlePwdCheckChange} value={pwdCheck} style={signUpInput} />
                    </div>
                </label>
                <label htmlFor='name' style={{...signUpLabelSize,...flexRowCenter}}>
                    <div style={{...flexRowCenter,...signUpInputName}}>Name</div>
                    <div style={{...flexColumnCenter,...signUpInputBox}}>
                        <input name='name' type="text" onChange={handleNameChange} value={name} style={signUpInput} />
                    </div>
                </label>
                <div style={{...flexColumnCenter,...signUpButtonBox}}>
                    <button type="submit" style={signUpButton}>Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp;