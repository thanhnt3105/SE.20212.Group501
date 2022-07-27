import React, {memo, useState} from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Header} from "../component/Header";
import {IMG_COMBOS_BACKGROUND, IMG_MENU_BACKGROUND} from "../assets";
import {CircularProgress, Grid} from "@mui/material";
import {ComboItem} from "../component/ComboItem";
import {useSelector} from "react-redux";

export const SaleCombos=memo(function SaleCombos(){
    const ids = useSelector(state => state.combos.ids);
    const combos = useSelector(state => state.combos.entities);
    const fetchingStatus = useSelector(state => state.combos.fetchingStatus);
    return (
     <Container>
         <Header/>
         <BackgroundMenu>COMBOS</BackgroundMenu>
         <ContentContainer>
             {
                 fetchingStatus === 'SUCCESS' ? (
                     <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                         {
                             ids
                                 .map((id, index) =>{
                                     return <Grid item xs={2} sm={4} md={4} key={index}>
                                         <ComboItem  combo = {combos[id]} comboId={id}/>
                                     </Grid>
                                 })
                         }
                     </Grid>
                 ) :  <Box sx= {{width: '100%', alignItems: 'center'}}>
                     <div>Hãy đợi một chút</div>
                     <CircularProgress/>
                 </Box>
             }
             {/*<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >*/}
             {/*    */}
             {/*    <Grid item xs={2} sm={4} md={4}>*/}
             {/*        <ComboItem/>*/}
             {/*    </Grid>*/}
             {/*    <Grid item xs={2} sm={4} md={4}>*/}
             {/*        <ComboItem/>*/}
             {/*    </Grid>*/}
             {/*    <Grid item xs={2} sm={4} md={4}>*/}
             {/*        <ComboItem/>*/}
             {/*    </Grid>*/}
             {/*    <Grid item xs={2} sm={4} md={4}>*/}
             {/*        <ComboItem/>*/}
             {/*    </Grid>*/}
             {/*    <Grid item xs={2} sm={4} md={4}>*/}
             {/*        <ComboItem/>*/}
             {/*    </Grid>*/}
             {/*    <Grid item xs={2} sm={4} md={4}>*/}
             {/*        <ComboItem/>*/}
             {/*    </Grid>*/}
             {/*</Grid>*/}
         </ContentContainer>
     </Container>
    )
})
const Container = styled(Box)`
  margin-top: 48px;
  width: 100%;
  background-color: black;
`
const BackgroundMenu = styled('div')`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  background-image: url(${IMG_COMBOS_BACKGROUND});
  justify-content: center;
  font-size: 32px;
  color: white;
`

const ContentContainer = styled(Box)`
flex-grow: 1;
  background-color: white;
  padding: 24px 36px;
`
