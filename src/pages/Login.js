import React, {memo, useCallback, useEffect, useRef, useState} from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Header} from "../component/Header";
import {IMG_BACKGROUND_LOGIN, IMG_PIZZA_LOGIN} from "../assets";
import {Modal, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

export const Login = memo(function Login() {
    const [isModalVisible, setModalVisible] = useState(true);
    const toggleModal = useCallback(() => {
        setModalVisible(!isModalVisible)
    }, [isModalVisible])
    const [userName,setUserName] = useState("");
    const [pass,setPass] = useState("");
    const [error,setError] = useState("");
    const {login} = useAuth();
    const navigate = useNavigate();
    const btn = useRef(null);
    const handleSubmit= async (e)=>{
        e.preventDefault();
        try{
            setError('');
            await login(userName,pass);
            navigate('/');
        }
        catch{setError('error')}
    };


    useEffect(() => {
        const listener = event => {
            if (event.keyCode === 13) {
                event.preventDefault();
                btn.current.click();
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, []);

    return (
        <Container>
            <Header/>
            <ImageBackground src={IMG_BACKGROUND_LOGIN}/>
            <Modal
                open={toggleModal}
                onClose={toggleModal}
            >
                <BoxLogin>
                    <LeftSection>
                        <LeftImage src={IMG_PIZZA_LOGIN}/>
                    </LeftSection>
                    <RightSection>
<LoginHeader>ĐĂNG NHẬP</LoginHeader>
                        <TextNormal>Email</TextNormal>
                        <br/>
                        <InputText
                            value={userName}
                            variant="standard" // <== changed this
                            placeholder="Email"
                            InputProps={{
                                disableUnderline: true, // <== added this
                            }}
                            onChange = { e => setUserName(e.target.value)}

                        />

                        <TextNormal>Mật khẩu</TextNormal>
                        <InputText
                            value={pass}
                            variant="standard" // <== changed this
                            placeholder="Mật khẩu"
                            InputProps={{
                                disableUnderline: true, // <== added this
                            }}
                            onChange={e=>setPass(e.target.value)}

                        />
                        <TextNormal style={{color:'#9A9A9AFF',fontSize:12}}>Quên mật khẩu?</TextNormal>
                        {error &&
                            <h3 style={{textAlign:'left',justifyContent:'left',fontSize:'15px',opacity:'0.5',marginLeft:'50px',color:'red'}}>
                                Tên đăng nhập hoặc mật khẩu không đúng
                            </h3>}
                        <ButtonLogin
                            onClick = {e => handleSubmit(e)}
                            ref = {btn}
                        >
                            <TextNormal style={{color:"white"}}>ĐĂNG NHẬP</TextNormal>
                        </ButtonLogin>
                    </RightSection>
                </BoxLogin>
            </Modal>
        </Container>
    )
})
const Container = styled(Box)`
  margin-top: 48px;
  background-color: #F4F1F1;
  outline:none;
`
const ImageBackground = styled('img')`
  width: 100%;
  height: 100%;
`
const BoxLogin = styled(Box)`
  display: flex;
  background-color: #F6F6F7;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 24px;
`

const LeftSection = styled('div')`
    
`
const LeftImage=styled('img')`
  width: 100%;
  height: 100%;
`
const RightSection = styled('div')`
  width: 60%;
`
const LoginHeader = styled('p')`
  color: #fc2255;
`
const TextNormal = styled('span')`
  color: black;
`
const InputText=styled(TextField)`
  display: flex;
  justify-content: center;
background-color: white;
  border-radius: 8px;
  width: 80%;
  box-shadow: -5px -4px 8px -3px rgba(84,66,66,0.75);
  -webkit-box-shadow: -5px -4px 8px -3px rgba(84,66,66,0.75);
  -moz-box-shadow: -5px -4px 8px -3px rgba(84,66,66,0.75);
  height: 32px;
  padding-left: 12px;
  margin-top: 8px;
  margin-bottom: 8px;
`
const ButtonLogin=styled(Button)`
width: 80%;
  height: 32px;
  background-color: #EC393E;
  border-radius: 12px;
  margin-top: 12px;
`