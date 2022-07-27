import React, {memo, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {CircularProgress, Grow, Pagination, styled} from "@mui/material";
import Box from "@mui/material/Box";
import {ExtraItemInMenu} from "../ExtraItemInMenu";

export const CustomPagination = styled(Pagination)({
    "& .MuiPaginationItem-root": {
        fontFamily: 'Josefin Sans'
    },
    "& .MuiPaginationItem-root:active": {
        backgroundColor: 'rgb(234, 106, 18, 0.5)',
    },
    '& .Mui-selected': {
        backgroundColor: 'rgb(234, 106, 18, 0.5)',
    }
})

export const MenuKid = memo(function MenuKid(props) {
    const category = 'kid';
    const categories = {
        'kid': {
            selector: useSelector(state => state.kids),
            menuName: 'Kids',
            singlePath: '/kid/'
        }
    }
    const [search, setSearch] = useState('');
    //  const [ids,setids] = useState([]);
    const ids = categories[category].selector.ids;
    const [page, setPage] = useState(1);
    const fetchingStatus = categories[category].selector.fetchingStatus
    const products = categories[category].selector.entities
    // const ids = categories[category].selector.ids
    const max = 3;
    //const [page, setPage] = useState(1);
    const totalPage = Math.ceil(ids.length / max);
    const pageList = [];
    for (let i = 1; i <= totalPage; i++) pageList.push(i);
    useEffect(() => {
        setSearch(props.search);
    }, [props.search])
    return (
        <div>
            {
                fetchingStatus === 'SUCCESS' ? <Box>
                        {
                            pageList.map(p => {
                                return (
                                    <Grow in={page === p} mountOnEnter unmountOnExit timeout={page === p ? 1000 : 0}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            {
                                                ids.filter(id =>
                                                    !search ? id : products[id].title.toUpperCase().includes(search.toString().toUpperCase())
                                                )
                                                    .map((id, index) => {
                                                        return (index >= (page - 1) * max && index < page * max) &&
                                                            <Box sx={{marginRight: 4}}>
                                                                <ExtraItemInMenu image={products[id].image_url}
                                                                                 name={products[id].title}
                                                                                 rate={products[id].rating}
                                                                                 price={products[id].price}
                                                                                 id={id}
                                                                                 link={categories[category].singlePath + id}
                                                                                 category={category}
                                                                />
                                                            </Box>
                                                    })
                                            }
                                        </Box>
                                    </Grow>
                                )
                            })
                        }
                    </Box>

                    :
                    fetchingStatus === 'LOADING' || fetchingStatus === 'INITIAL' ?
                        <Box sx={{width: '100%', alignItems: 'center'}}>
                            <div>Hãy đợi một chút</div>
                            <CircularProgress/>
                        </Box>
                        : <Box sx={{width: '100%', alignItems: 'center'}}>
                            <div>Có vẻ có lỗi đã xảy ra
                            </div>
                        </Box>
            }
            <Box sx={{marginTop: '80px', alignItems: 'center', width: '100%', marginLeft: '40%'}}>
                <CustomPagination variant="outlined" shape="rounded" count={totalPage}
                                  onChange={(event, value) => {
                                      setPage(value)
                                  }} size="large" page={page}
                />
            </Box>
        </div>
    )
})
