import React, {memo, useState} from "react";
import Box from "@mui/material/Box";
import {styled} from '@mui/material/styles';
import {IC_ADMIN, IMG_CART_HEADER, IMG_LOGO} from "../assets";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router';
import {useAuth} from "../context/AuthContext";
import {Menu, MenuItem} from "@mui/material";

export const Header = memo(function Header() {
    const navigate = useNavigate();
    const {currentUser} = useAuth()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const {logout} = useAuth();
    const {resetPassword} = useAuth();
    const handlelogout = () => {
        logout();
        setAnchorEl(null);
        navigate('/')
    }

    const changePassword = async () => {
        resetPassword(currentUser.email);
        alert('Hãy kiểm tra email của bạn');
    }

    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }
    return (
        <Container>
            <LogoImage src={IMG_LOGO}/>
            <Right direction={'row'} spacing={4}>
                {currentUser ?
                    <>
                        <ButtonHeader
                            onClick={() => {
                                navigate('/order_report')
                            }}
                            variant="text">Thống kê đơn hàng</ButtonHeader>
                        <ButtonHeader
                            onClick={() => {
                                navigate('/manage_menu')
                            }}
                            variant="text">Quản lý menu</ButtonHeader>
                        <ButtonCustom
                            onClick={handleClick}
                        >
                            <CartImage
                                src={IC_ADMIN}/>
                        </ButtonCustom>
                        <Menu sx={{width: '100%'}}
                              open={open}
                              anchorEl={anchorEl}
                              onClose={handleClose}
                              anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'left',
                              }}
                        >
                            <MenuItem sx={{width: '100%'}}
                                      onClick={() => {
                                          handleClose();
                                          changePassword();
                                      }}>Đổi mật khẩu</MenuItem>
                            <MenuItem sx={{width: '100%'}} onClick={handlelogout}>Đăng xuất</MenuItem>
                        </Menu>
                    </>
                    :
                    <>
                        <ButtonHeader
                            onClick={() => {
                                navigate('/')
                            }}
                            variant="text">Trang chủ</ButtonHeader>
                        <ButtonHeader
                            onClick={() => {
                                navigate('/menu/')
                            }}
                            variant="text"
                        >Thực đơn</ButtonHeader>
                        <ButtonHeader
                            onClick={() => {
                                navigate('/combos/')
                            }}
                            variant="text">Khuyến mãi </ButtonHeader>
                        <ButtonHeader
                            onClick={() => {
                                navigate('/order/')
                            }}
                            variant="text">Đơn hàng</ButtonHeader>
                        <CartImage
                            onClick={() => {
                                navigate('/cart/')
                            }}
                            src={IMG_CART_HEADER}/>
                    </>
                }

            </Right>
        </Container>
    )
})
const Container = styled(Box)`
  background-color: #FFFBFB;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const LogoImage = styled('img')({
    width: 180,
    height: 40
})


const CartImage = styled('img')({
    width: 32,
    height: 32
})

const ButtonCustom = styled('button')`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFFBFB;
  cursor: pointer;
`

const ButtonHeader = styled(Button)({
    color: '#333',
    fontSize: 12,
    fontWeight: "bolder",
    '&:hover': {
        color: '#EC393E',
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none',
        color: '#EC393E',
    }
})
const Right = styled(Stack)`

`
