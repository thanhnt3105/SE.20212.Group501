import React, {memo} from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Rating} from "@mui/material";

export const CommentBox = memo(function CommentBox(props) {
    const comment = props.comment;
    let date = new Date(comment.comment_time * 1000)
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    return (
        <BoxFeedBack>
            <RowSection style={{justifyContent: 'space-between'}}>
                <TextNormal>{comment.user_name}</TextNormal>
                <StarView>
                    <Rating value={comment.user_rating} readOnly
                            sx={{
                                color: '#EC393E',
                            }}
                    />
                </StarView>
            </RowSection>
            <TextLight>{
                'Thời gian: ' + year + '/' + month + '/' + day + '-' + hour + ':' + minute + ':' + second
            }</TextLight>
            <br/>
            <TextNormal style={{fontSize: 10}}>{comment.content} </TextNormal>
        </BoxFeedBack>
    )
})


const TextNormal = styled('span')`
  font-size: 16px;
  color: black;
  padding: 4px 0;
`
const TextLight = styled('span')`
  font-size: 12px;
  color: #5B5959FF;
`

const StarView = styled(Box)`
  flex-direction: row;
`
const RowSection = styled('div')`
  display: flex;
  align-items: center;
`

const BoxFeedBack = styled(Box)`
  background-color: #cecccc;
  padding: 8px;
  border-radius: 12px;
  width: 100%;
`