import React, {useState} from "react";
import {
    Box,
    Button,
    Fade,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grow,
    IconButton,
    MenuItem,
    Modal,
    Pagination,
    Radio,
    RadioGroup,
    Snackbar,
    Stack,
    styled,
    TextField,
    Typography
} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import InputAdornment from '@mui/material/InputAdornment';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import {add1Combo} from "../store/comboSlice";
import {add1Pizza} from "../store/categories/pizzaSlice";
import {add1Appetizer} from "../store/categories/appetizerSlice";
import {add1Dessert} from "../store/categories/dessertSlice";
import {add1Drink} from "../store/categories/drinkSlice";
import {add1Kid} from "../store/categories/kidSlice";
import {add1Vegetable} from "../store/categories/vegetableSlice";
import {ComboManageCard, PizzaManageCard} from "./manageCard";


const axios = require('axios');
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

export const ComboManage = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.combos.entities);
    const ids = useSelector(state => state.combos.ids);
    const [addCombo, setAddCombo] = useState(false);
    const url = 'https://pizzahust-c5035-default-rtdb.firebaseio.com/combo.json';
    const max = 16;
    const [page, setPage] = useState(1);
    const totalPage = Math.ceil(ids.length / max);
    const pageList = [];

    const currencies = [
        {
            value: 'dessert',
            label: 'Dessert',
        },
        {
            value: 'kid',
            label: 'Kid',
        },
        {
            value: 'vegetable',
            label: 'Vegetable',
        },
        {
            value: 'drink',
            label: 'Drink',
        },
        {
            value: 'appetizer',
            label: 'Appetizer',
        },
    ];

    //Variable of new Combo
    const [title, setTitle] = useState('');
    const [subtitle, setSubTitle] = useState('');
    const [banner, setBanner] = useState('');
    const [categorys, setCategorys] = useState([
        {name: 'dessert', number: ''},
    ]);
    const [free, setFree] = useState([
        {name: 'dessert', number: ''},
    ]);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [off, setOff] = useState('');
    const [persons, setPerson] = useState('');
    const [pizza, setPizza] = useState('');
    //

    const [comboType, setComboType] = useState("off");
    const [type, setType] = useState(true);
    const [cmt, setCmt] = useState(false);
    const [posted, setPosted] = useState(false);
    const [message, setMess] = useState('');

    const closeCmt = () => {
        setCmt(false);

        setCategorys([
            {name: 'desset', number: ''},
        ]);
        setFree([
            {name: 'dessert', number: ''},
        ]);
    }

    const handleChange = (event) => {
        setComboType(event.target.value);
        setType(!type);

    };
    //handle the dynamic Category in Modal
    const handleCategoryChange = (index, e) => {
        const Categories = [...categorys];
        Categories[index][e.target.name] = (e.target.value);
        setCategorys(Categories);
    }

    const handleAddCategory = () => {
        setCategorys([...categorys, {name: 'dessert', number: ''}]);
    }

    const handleRemoveCategory = (index, e) => {
        const Categories = [...categorys];
        Categories.splice(index, 1);
        setCategorys(Categories);
    }
    // ...........

    //handle the dynamic Free in Modal
    const handleFreeChange = (index, e) => {
        const Free = [...free];
        Free[index][e.target.name] = e.target.value;
        setFree(Free);
    }

    const handleAddFree = () => {
        setFree([...free, {name: 'dessert', number: ''}]);
    }

    const handleRemoveFree = (index, e) => {
        const Free = [...free];
        Free.splice(index, 1);
        setFree(Free);
    }
    // ...........


    // const handleaddPizza = () => {
    //     console.log( {
    //         comment : [],
    //         description : newDescription,
    //         image_url : newImage,
    //         order_number : 0,
    //         price : newPrice,
    //         rating: 0,
    //         size: newSizes,
    //         title: newName,
    //         topping: newToppings,
    //         type: ["Đế giòn","Đế mềm xốp truyền thống"]
    //     })
    // }

    //Check combo property
    const checkCombo = () => {
        if (title.length == 0 || subtitle.length == 0 || (off.length == 0 && (free[0].number == ''))
            || persons.length == 0 || pizza.length == 0 || categorys[0].number == '' || description.length == 0
            || banner.length == 0 || image.length == 0) {
            alert("The form has not been completed !")
            return false;
        }
        if (isNaN(parseInt(persons)) || isNaN(parseInt(pizza)) || (isNaN(parseInt(off)) && comboType == 'off')) {
            alert("Invalid value !");
            return false;
        }
        if (comboType == 'free') {
            free.forEach(a => {
                if (isNaN(parseInt(a.number)) || parseInt(a.number) <= 0) {
                    alert("Invalid value !");
                    return false;
                }
            });
        }
        categorys.forEach(a => {
            if (isNaN(parseInt(a.number)) || parseInt(a.number) <= 0) {
                alert("Invalid value !");
                return false;
            }
        })
        return true;
    }


    const handleAddCombo = async () => {
        const newItem = {
            banner: banner,
            description: description,
            image: image,
            start: Date.parse(start) / 1000,
            end: Date.parse(end) / 1000,
            persons: parseInt(persons),
            title: title,
            subtitle: subtitle,
            pizza: parseInt(pizza),
            off: parseInt(off),
        };

        if (categorys[0].name !== '') {
            categorys.forEach(a => newItem[a.name] = parseInt(a.number));
        }
        if (comboType == 'free') {
            newItem['free'] = {};
            free.forEach(a => newItem['free'][a.name] = parseInt(a.number));
            newItem.off = 0;
        }
        try {
            const resp = await axios.post(url, newItem);
            if (resp.statusText === "OK") {
                dispatch(add1Combo({id: resp.data.name, item: newItem}));
                setMess('Đã thêm thành công');
                setPosted(true);
            }
            closeCmt();
        } catch (err) {
            // Handle Error Here
            alert(err);
            setMess('Có sự cố xảy ra');
            setPosted(false);
        }
    }


    for (let i = 1; i <= totalPage; i++) pageList.push(i);
    return (
        <Box sx={{p: 5, marginBottom: '100px', width: '100%'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', padding: '0 50px 30px 50px'}}
            >
                <Typography variant="h6"
                            sx={{
                                fontFamily: 'Playfair Display',
                                fontWeight: 700,
                                fontSize: '30px',
                                lineHeight: '52px',
                                color: '#07143B',
                                textAlign: 'start',
                            }}
                >Combos
                </Typography>
                <Button variant="contained"
                        onClick={() => setAddCombo(true)}
                        sx={{
                            backgroundColor: '#EC393E',
                            borderRadius: '100px',
                            fontFamily: 'Josefin Sans',
                            fontWeight: 'normal',
                            fontSize: '15px',
                            lineHeight: '175%',
                            color: 'white',
                            '&:hover, &:active': {
                                backgroundColor: '#ce070c'
                            },
                            marginBottom: 2,
                            marginRight: 2
                        }}
                >
                    Thêm Combo
                </Button>
                <Modal open={addCombo} onClose={() => {
                    setAddCombo(false)
                }}>
                    <Fade in={addCombo} timeout={500}>
                        <Stack
                            spacing={2}
                            sx={{
                                borderRadius: '24px',
                                backgroundColor: 'white',
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                p: 3,
                                boxShadow: 24,
                                width: {md: '50%', sm: '80%', xs: '90%'},
                            }}
                        >
                            <Typography variant="h6"
                                        sx={{
                                            fontFamily: 'Playfair Display',
                                            fontWeight: 700,
                                            fontSize: '20px',
                                            lineHeight: '40px',
                                            color: '#07143B',
                                            textAlign: 'center',
                                        }}
                            >{'Combo của bạn'}
                            </Typography>
                            <Stack direction="row" spacing={2}>
                                <TextField onChange={(e) => {
                                    setTitle(e.target.value)
                                }}
                                           required
                                           variant="standard"
                                           id="title"
                                           label="Combo"
                                           multiline
                                           maxRows={1}
                                           color='warning'
                                           inputProps={{style: {fontFamily: 'Josefin Sans'}}} // font size of input text
                                           InputLabelProps={{style: {fontFamily: 'Josefin Sans'}}} // font size of input label
                                           sx={{
                                               width: '50%'
                                           }}
                                />
                                <TextField onChange={(e) => {
                                    setSubTitle(e.target.value)
                                }}
                                           required variant="standard" multiline color='warning' maxRows={4}
                                           id="subtitle" label="Phụ đề"
                                           inputProps={{style: {fontFamily: 'Josefin Sans'},}} // font size of input text
                                           InputLabelProps={{style: {fontFamily: 'Josefin Sans'}}} // font size of input label
                                           sx={{
                                               width: '50%'
                                           }}
                                />
                            </Stack>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Loại Combo</FormLabel>
                                <RadioGroup row
                                            aria-label="Type Combo"
                                            name="comboType"
                                            value={comboType}
                                            onChange={(e) => handleChange(e)}
                                >
                                    <FormControlLabel value="off" control={<Radio/>} label="% Giảm giá"/>
                                    <FormControlLabel value="free" control={<Radio/>} label="Miễn phí"/>
                                </RadioGroup>
                            </FormControl>

                            <Stack direction="row" spacing={2}>
                                <TextField onChange={(e) => {
                                    setOff(e.target.value)
                                }}
                                           disabled={!type ? true : false} value={off}
                                           variant="standard"
                                           id="off"
                                           label="% giảm giá"
                                           multiline
                                           maxRows={1}
                                           color='warning'
                                           InputProps={{style: {fontFamily: 'Josefin Sans'},}} // font size of input text
                                           InputLabelProps={{style: {fontFamily: 'Josefin Sans'}}} // font size of input label
                                           sx={{
                                               width: '40%'
                                           }}
                                />
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        maxHeight: '60px',
                                        overflow: 'auto',
                                        width: '54%'
                                    }}
                                >
                                    {free.map((fre, index) => (
                                        <Stack key={index} direction='row' spacing={2}
                                        >
                                            <TextField
                                                name="name" variant="standard" disabled={type ? true : false}
                                                select
                                                label="Loại"
                                                value={fre.name}
                                                onChange={(e) => {
                                                    handleFreeChange(index, e)
                                                }}
                                                color='warning'
                                                InputProps={{style: {fontFamily: 'Josefin Sans'},}} // font size of input text
                                                InputLabelProps={{style: {fontFamily: 'Josefin Sans'}}} // font size of input label
                                                sx={{
                                                    width: '70%'
                                                }}
                                            >
                                                {currencies.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}

                                            </TextField>
                                            <TextField onChange={(e) => {
                                                handleFreeChange(index, e)
                                            }}
                                                       value={'' + fre.number} disabled={type ? true : false}
                                                       variant="standard"
                                                       name="number"
                                                       label="Số lượng"
                                                       multiline
                                                       maxRows={1}
                                                       color='warning'
                                                       InputProps={{style: {fontFamily: 'Josefin Sans'},}} // font size of input text
                                                       InputLabelProps={{style: {fontFamily: 'Josefin Sans'}}} // font size of input label
                                                       sx={{
                                                           width: '30%'
                                                       }}
                                            />
                                            <IconButton disabled={free.length === 1}
                                                        onClick={(e) => handleRemoveFree(index, e)}>
                                                <RemoveCircleOutlineIcon
                                                    sx={{
                                                        color: '#EC393E',
                                                        '&:hover, &:active': {
                                                            color: '#07143B'
                                                        },
                                                    }}
                                                ></RemoveCircleOutlineIcon>
                                            </IconButton>
                                            <IconButton disabled={type ? true : false} onClick={() => handleAddFree()}>
                                                <AddCircleOutlineIcon
                                                    sx={{
                                                        color: '#EC393E',
                                                        '&:hover, &:active': {
                                                            color: '#07143B'
                                                        },
                                                    }}
                                                ></AddCircleOutlineIcon>
                                            </IconButton>
                                        </Stack>
                                    ))}
                                </Box>
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <TextField onChange={(e) => {
                                    setPerson((e.target.value))
                                }}
                                           required
                                           variant="standard"
                                           id="person"
                                           label="Người"
                                           multiline
                                           maxRows={1}
                                           color='warning'
                                           InputProps={{style: {fontFamily: 'Josefin Sans'},}} // font size of input text
                                           InputLabelProps={{style: {fontFamily: 'Josefin Sans'}}} // font size of input label
                                           sx={{
                                               width: '50%'
                                           }}
                                />
                                <TextField onChange={(e) => {
                                    setPizza((e.target.value))
                                }}
                                           required
                                           variant="standard"
                                           id="pizza"
                                           label="Pizza"
                                           multiline
                                           maxRows={1}
                                           color='warning'
                                           InputProps={{style: {fontFamily: 'Josefin Sans'},}} // font size of input text
                                           InputLabelProps={{style: {fontFamily: 'Josefin Sans'}}} // font size of input label
                                           sx={{
                                               width: '50%'
                                           }}
                                />
                            </Stack>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    maxHeight: '110px',
                                    overflow: 'auto',
                                }}
                            >
                                {categorys.map((category, index) => (
                                    <Stack key={index} direction='row' spacing={2} sx={{marginTop: '6px'}}
                                    >
                                        <TextField
                                            name="name" variant="standard"
                                            select
                                            label="Loại"
                                            value={category.name}
                                            onChange={(e) => {
                                                handleCategoryChange(index, e)
                                            }}
                                            color='warning'
                                            InputProps={{style: {fontFamily: 'Josefin Sans'},}} // font size of input text
                                            InputLabelProps={{style: {fontFamily: 'Josefin Sans'}}} // font size of input label
                                            sx={{
                                                width: '40%'
                                            }}
                                        >
                                            {currencies.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <TextField onChange={(e) => {
                                            handleCategoryChange(index, e)
                                        }}
                                                   required value={'' + category.number}
                                                   variant="standard"
                                                   name="number"
                                                   label="Số lượng"
                                                   multiline
                                                   maxRows={1}
                                                   color='warning'
                                                   InputProps={{style: {fontFamily: 'Josefin Sans'},}} // font size of input text
                                                   InputLabelProps={{style: {fontFamily: 'Josefin Sans'}}} // font size of input label
                                                   sx={{
                                                       width: '40%'
                                                   }}
                                        />
                                        <IconButton disabled={categorys.length === 1}
                                                    onClick={(e) => handleRemoveCategory(index, e)}>
                                            <RemoveCircleOutlineIcon
                                                sx={{
                                                    color: '#EC393E',
                                                    '&:hover, &:active': {
                                                        color: '#07143B'
                                                    },
                                                }}
                                            ></RemoveCircleOutlineIcon>
                                        </IconButton>
                                        <IconButton onClick={() => handleAddCategory()}>
                                            <AddCircleOutlineIcon
                                                sx={{
                                                    color: '#EC393E',
                                                    '&:hover, &:active': {
                                                        color: '#07143B'
                                                    },
                                                }}
                                            ></AddCircleOutlineIcon>
                                        </IconButton>
                                    </Stack>
                                ))}
                            </Box>
                            <TextField onChange={(e) => {
                                setDescription(e.target.value)
                            }}
                                       required variant="standard" multiline color='warning' maxRows={4}
                                       id="description" label="Mô tả"
                                       inputProps={{style: {fontFamily: 'Josefin Sans'},}} // font size of input text
                                       InputLabelProps={{style: {fontFamily: 'Josefin Sans'}}} // font size of input label
                                       sx={{
                                           width: '100%'
                                       }}
                            />
                            <TextField onChange={(e) => {
                                setBanner(e.target.value)
                            }}
                                       required variant="standard" multiline color='warning' maxRows={1}
                                       id="banner" label="URL Banner"
                                       inputProps={{style: {fontFamily: 'Josefin Sans'}}} // font size of input text
                                       InputLabelProps={{style: {fontFamily: 'Josefin Sans'}}} // font size of input label
                                       sx={{
                                           width: '100%'
                                       }}
                            />
                            <TextField onChange={(e) => {
                                setImage(e.target.value)
                            }}
                                       required variant="standard" multiline color='warning' maxRows={1}
                                       id="image" label="URL Ảnh"
                                       inputProps={{style: {fontFamily: 'Josefin Sans'}}} // font size of input text
                                       InputLabelProps={{style: {fontFamily: 'Josefin Sans'}}} // font size of input label
                                       sx={{
                                           width: '100%'
                                       }}
                            />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Stack
                                    direction={'row'} spacing={4}
                                >
                                    <DateTimePicker
                                        sx={{width: '50%'}} variant="standard"
                                        label="Bắt đầu"
                                        value={start}
                                        onChange={(newValue) => {
                                            setStart(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    <DateTimePicker
                                        sx={{width: '50%'}}
                                        label="Kết thúc"
                                        value={end}
                                        onChange={(newValue) => setEnd(newValue)}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Stack>
                            </LocalizationProvider>
                            <Button variant="contained"
                                    onClick={() => {
                                        if (checkCombo()) {
                                            setAddCombo(false);
                                            handleAddCombo();
                                        }
                                    }}
                                    sx={{
                                        backgroundColor: '#EC393E',
                                        borderRadius: '100px',
                                        alignSelf: 'center',
                                        fontFamily: 'Josefin Sans',
                                        fontWeight: 'normal',
                                        fontSize: '15px',
                                        lineHeight: '175%',
                                        color: 'white',
                                        '&:hover, &:active': {
                                            backgroundColor: '#f57c00'
                                        },
                                        marginBottom: 2,
                                    }}
                            >
                                Thêm
                            </Button>

                        </Stack>
                    </Fade>
                </Modal>
                <Snackbar
                    open={posted}
                    onClose={() => {
                        setPosted(false)
                    }}
                    message={message}
                    autoHideDuration={6000}
                />
            </Box>

            {
                pageList.map(p => {
                    return (
                        <Grow in={page === p} mountOnEnter unmountOnExit timeout={page === p ? 1000 : 0}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap'
                                }}
                            >
                                {
                                    ids
                                        .map((id, index) => {
                                            return (index >= (page - 1) * max && index < page * max) ?
                                                <Box sx={{marginRight: '90px'}}>
                                                    <ComboManageCard combo={products[id]}
                                                                     comboId={id}
                                                                     cardUrl={'https://pizzahust-c5035-default-rtdb.firebaseio.com/combo/' + id + '.json'}
                                                    />

                                                </Box>
                                                : false
                                        })
                                }
                            </Box>
                        </Grow>
                    )
                })
            }
            <Box sx={{marginTop: '100px', alignItems: 'center', width: '100%', marginLeft: '40%'}}>
                <CustomPagination variant="outlined" shape="rounded" count={totalPage}
                                  onChange={(event, value) => {
                                      setPage(value)
                                  }} size="large" page={page}
                />
            </Box>
        </Box>
    )
}


export const PizzaManage = (props) => {
    const dispatch = useDispatch();
    const categories = {
        'pizza': {
            selector: useSelector(state => state.pizzas),
            menuName: 'Pizzas',
            add: add1Pizza,
            dbPath: 'main_courses',
        },
        'dessert': {
            selector: useSelector(state => state.desserts),
            menuName: 'Tráng miệng',
            add: add1Dessert,
            dbPath: 'dessert'
        },
        'drink': {
            selector: useSelector(state => state.drinks),
            menuName: 'Đồ uống',
            add: add1Drink,
            dbPath: 'drink'
        },
        'vegetable': {
            selector: useSelector(state => state.vegetables),
            menuName: 'Món chay',
            add: add1Vegetable,
            dbPath: 'vegetarian'
        },
        'kid': {
            selector: useSelector(state => state.kids),
            menuName: 'Đồ cho bé',
            add: add1Kid,
            dbPath: 'kid'
        },
        'appetizer': {
            selector: useSelector(state => state.appetizers),
            menuName: 'Khai vị',
            add: add1Appetizer,
            dbPath: 'appetizer'
        }
    }
    const category = props.category;
    const products = categories[category].selector.entities;
    const ids = categories[category].selector.ids;
    const fetchingStatus = categories[category].selector.fetchingStatus;
    const [addPizza, setAddPizza] = useState(false);
    const url = 'https://pizzahust-c5035-default-rtdb.firebaseio.com/menu/menu_' + categories[category].dbPath + '.json';
    const max = 12;
    const [page, setPage] = useState(1);
    const totalPage = Math.ceil(ids.length / max);
    const pageList = [];
    //Variable of new Pizza
    const [newName, setNewName] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newSizes, setNewSizes] = useState([
        {type_detail: '', type_price: ''},
    ]);
    const [newToppings, setNewToppings] = useState([
        {topping_name: '', topping_price: ''},
    ]);
    const [newDescription, setNewDescription] = useState('');
    const [newImage, setNewImage] = useState('');
    //
    const [cmt, setCmt] = useState(false);
    const [posted, setPosted] = useState(false);
    const [message, setMess] = useState('');

    const closeCmt = () => {
        setCmt(false);
        setNewName('');
        setNewDescription('');
        setNewImage('');
        setNewPrice(0);
        setNewToppings([
            {topping_name: '', topping_price: ''},
        ]);
        setNewSizes([
            {type_detail: '', type_price: ''},
        ]);
    }

    const checkItem = () => {
        if (category == 'pizza') {
            if (newName.length == 0 || newDescription.length == 0 || newImage.length == 0 || newPrice.length == 0 ||
                !(newToppings[0].topping_name.length == 0 && newToppings[0].topping_price.length == 0) ||
                newSizes[0].type_price.length == 0 || newSizes[0].type_detail.length == 0) {
                alert("Hãy điền đủ thông tin!")
                return false;
            }
            if (isNaN(parseInt(newPrice))) {
                alert("Giá trị không hợp lệ");
                return false;
            }
            newSizes.forEach(a => {
                if (isNaN(parseInt(a.type_price)) || parseInt(a.type_price) < 0 || a.type_detail.length == 0) {
                    alert("Giá trị không hợp lệ !");
                    return false;
                }
            });
            newToppings.forEach(a => {
                if (isNaN(parseInt(a.topping_price)) || parseInt(a.topping_price) <= 0 || a.topping_name.length == 0) {
                    alert("Giá trị không hợp lệ!");
                    return false;
                }
            });
        } else {
            if (newName.length == 0 || newDescription.length == 0 || newImage.length == 0 || newPrice.length == 0) {
                alert("Chưa điền đủ thông tin !")
                return false;
            }
            if (isNaN(parseInt(newPrice))) {
                alert("Giá trị không hợp lệ!");
                return false;
            }
        }
        return true;
    }
    //handle the dynamic Sizes in Modal
    const handleSizeChange = (index, e) => {
        const Sizes = [...newSizes];
        Sizes[index][e.target.name] = e.target.value;
        setNewSizes(Sizes);
    }

    const handleAddSize = () => {
        setNewSizes([...newSizes, {type_detail: '', type_price: ''}]);
    }

    const handleRemoveSize = (index, e) => {
        const Sizes = [...newSizes];
        Sizes.splice(index, 1);
        setNewSizes(Sizes);
    }

    const handleToppingChange = (index, e) => {
        const Toppings = [...newToppings];
        Toppings[index][e.target.name] = e.target.value;
        setNewToppings(Toppings);
    }

    const handleAddTopping = () => {
        setNewToppings([...newToppings, {topping_name: '', topping_price: ''}]);
    }

    const handleRemoveTopping = (index, e) => {
        const Toppings = [...newToppings];
        Toppings.splice(index, 1);
        setNewToppings(Toppings);
    }


    const handleAddPizza = async () => {
        const newItem = {
            comment: [],
            description: newDescription,
            image_url: newImage,
            order_number: 0,
            price: parseInt(newPrice),
            rating: 0,
            title: newName,
        };
        if (category == 'pizza') {
            newItem['size'] = [];
            newSizes.forEach(a => newItem['size'].push({
                "type_detail": a.type_detail,
                "type_price": parseInt(a.type_price)
            }));
            newItem['topping'] = [];
            newToppings.forEach(a => newItem['topping'].push({
                "topping_name": a.topping_name,
                "topping_price": parseInt(a.topping_price)
            }));
            newItem['type'] = ["Đế giòn", "Đế mềm xốp truyền thống"];
        }
        try {
            const resp = await axios.post(url, newItem);
            if (resp.status === 200) {
                dispatch(categories[category].add({id: resp.data.name, item: newItem}));


                setMess('Đã thêm thành công');
                setPosted(true);
                // setInterval(window.location.reload(), 1000);
            }
            closeCmt()
        } catch (err) {
            // Handle Error Here
            console.error(err);
            setMess('Có sự cố xảy ra');
            setPosted(true);
        }
    }


    for (let i = 1; i <= totalPage; i++) pageList.push(i);
    return fetchingStatus === 'SUCCESS' && (
        <Box sx={{p: 5, marginBottom: '100px', width: '100%'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}
            >
                <Typography variant="h6"
                            sx={{
                                fontFamily: 'Playfair Display',
                                fontWeight: 700,
                                fontSize: '30px',
                                lineHeight: '52px',
                                color: '#07143B',
                                textAlign: 'start',
                            }}
                >{categories[category].menuName}
                </Typography>
                <Button variant="contained"
                        onClick={() => setAddPizza(true)}
                        sx={{
                            backgroundColor: '#EC393E',
                            borderRadius: '100px',
                            fontFamily: 'Josefin Sans',
                            fontWeight: 'normal',
                            fontSize: '15px',
                            lineHeight: '175%',
                            color: 'white',
                            '&:hover, &:active': {
                                backgroundColor: '#ce070c'
                            },
                            marginBottom: 2,
                            marginRight: 2
                        }}
                >
                    {'Thêm ' + categories[category].menuName.slice(0, categories[category].menuName.length)}
                </Button>
                <Modal open={addPizza} onClose={() => {
                    setAddPizza(false)
                }}>
                    <Fade in={addPizza} timeout={500}>
                        <Stack
                            spacing={2}
                            sx={{
                                borderRadius: '24px',
                                backgroundColor: 'white',
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                p: 3,
                                boxShadow: 24,
                                width: {md: '50%', sm: '80%', xs: '90%'}
                            }}
                        >
                            <Typography variant="h6"
                                        sx={{
                                            fontFamily: 'Playfair Display',
                                            fontWeight: 700,
                                            fontSize: '20px',
                                            lineHeight: '52px',
                                            color: '#07143B',
                                            textAlign: 'center',
                                        }}
                            >{categories[category].menuName.slice(0, categories[category].menuName.length)}
                            </Typography>
                            <Stack direction="row" spacing={2}>
                                <TextField onChange={(e) => {
                                    setNewName(e.target.value)
                                }}
                                           required
                                           variant="standard"
                                           id="name-field"
                                           label="Tên"
                                           multiline
                                           maxRows={1}
                                           color='warning'
                                           inputProps={{style: {fontFamily: 'Josefin Sans'}}} // font size of input text
                                           InputLabelProps={{style: {fontFamily: 'Josefin Sans'}}} // font size of input label
                                           sx={{
                                               width: '60%'
                                           }}
                                />
                                <TextField onChange={(e) => {
                                    setNewPrice((e.target.value))
                                }}
                                           required
                                           variant="standard"
                                           id="price-field"
                                           label="Giá"
                                           multiline
                                           maxRows={1}
                                           color='warning'
                                           InputProps={{
                                               style: {fontFamily: 'Josefin Sans'},
                                               endAdornment: <InputAdornment position="end">VND</InputAdornment>,
                                           }} // font size of input text
                                           InputLabelProps={{style: {fontFamily: 'Josefin Sans'}}} // font size of input label
                                           sx={{
                                               width: '40%'
                                           }}
                                />
                            </Stack>

                            {category === 'pizza' &&
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        maxHeight: '162px',
                                        overflow: 'auto',
                                    }}
                                >
                                    {newSizes.map((newSize, index) => (
                                        <Stack key={index} direction='row' spacing={2} sx={{marginTop: '6px'}}
                                        >
                                            <TextField onChange={(e) => {
                                                handleSizeChange(index, e)
                                            }}
                                                       required value={newSize.type_detail}
                                                       variant="standard"
                                                       name="type_detail"
                                                       label="Cỡ"
                                                       multiline
                                                       maxRows={1}
                                                       color='warning'
                                                       InputProps={{style: {fontFamily: 'Josefin Sans'},}} // font size of input text
                                                       InputLabelProps={{style: {fontFamily: 'Josefin Sans'}}} // font size of input label
                                                       sx={{
                                                           width: '40%'
                                                       }}
                                            />
                                            <TextField onChange={(e) => {
                                                handleSizeChange(index, e)
                                            }}
                                                       required value={newSize.type_price}
                                                       variant="standard"
                                                       name="type_price"
                                                       label="Giá cỡ"
                                                       multiline
                                                       maxRows={1}
                                                       color='warning'
                                                       InputProps={{
                                                           style: {fontFamily: 'Josefin Sans'},
                                                           endAdornment: <InputAdornment
                                                               position="end">VND</InputAdornment>,
                                                       }} // font size of input text
                                                       InputLabelProps={{style: {fontFamily: 'Josefin Sans'}}} // font size of input label
                                                       sx={{
                                                           width: '40%'
                                                       }}
                                            />
                                            <IconButton disabled={newSizes.length === 1}
                                                        onClick={(e) => handleRemoveSize(index, e)}>
                                                <RemoveCircleOutlineIcon
                                                    sx={{
                                                        color: '#EC393E',
                                                        '&:hover, &:active': {
                                                            color: '#07143B'
                                                        },
                                                    }}
                                                ></RemoveCircleOutlineIcon>
                                            </IconButton>
                                            <IconButton onClick={() => handleAddSize()}>
                                                <AddCircleOutlineIcon
                                                    sx={{
                                                        color: '#EC393E',
                                                        '&:hover, &:active': {
                                                            color: '#07143B'
                                                        },
                                                    }}
                                                ></AddCircleOutlineIcon>
                                            </IconButton>
                                        </Stack>
                                    ))}
                                </Box>
                            }

                            <TextField onChange={(e) => {
                                setNewDescription(e.target.value)
                            }}
                                       required variant="standard" multiline color='warning' maxRows={4}
                                       id="description-field" label="Mô tả"
                                       inputProps={{style: {fontFamily: 'Josefin Sans'},}} // font size of input text
                                       InputLabelProps={{style: {fontFamily: 'Josefin Sans'}}} // font size of input label
                                       sx={{
                                           width: '100%'
                                       }}
                            />
                            <TextField onChange={(e) => {
                                setNewImage(e.target.value)
                            }}
                                       required variant="standard" multiline color='warning' maxRows={1}
                                       id="image-field" label="URL Ảnh"
                                       inputProps={{style: {fontFamily: 'Josefin Sans'}}} // font size of input text
                                       InputLabelProps={{style: {fontFamily: 'Josefin Sans'}}} // font size of input label
                                       sx={{
                                           width: '100%'
                                       }}
                            />

                            {category === 'pizza' &&
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        maxHeight: '162px',
                                        overflow: 'auto',
                                    }}
                                >
                                    {newToppings.map((newTopping, index) => (
                                        <Stack key={index} direction='row' spacing={2} sx={{marginTop: '6px'}}
                                        >
                                            <TextField onChange={(e) => {
                                                handleToppingChange(index, e)
                                            }}
                                                       required value={newTopping.topping_name}
                                                       variant="standard"
                                                       name="topping_name"
                                                       label="Tên Topping"
                                                       multiline
                                                       maxRows={1}
                                                       color='warning'
                                                       InputProps={{style: {fontFamily: 'Josefin Sans'},}} // font size of input text
                                                       InputLabelProps={{style: {fontFamily: 'Josefin Sans'}}} // font size of input label
                                                       sx={{
                                                           width: '40%'
                                                       }}
                                            />
                                            <TextField onChange={(e) => {
                                                handleToppingChange(index, e)
                                            }}
                                                       required value={newTopping.topping_price}
                                                       variant="standard"
                                                       name="topping_price"
                                                       label="Giá Topping"
                                                       multiline
                                                       maxRows={1}
                                                       color='warning'
                                                       InputProps={{
                                                           style: {fontFamily: 'Josefin Sans'},
                                                           endAdornment: <InputAdornment
                                                               position="end">VND</InputAdornment>,
                                                       }} // font size of input text
                                                       InputLabelProps={{style: {fontFamily: 'Josefin Sans'}}} // font size of input label
                                                       sx={{
                                                           width: '40%'
                                                       }}
                                            />
                                            <IconButton disabled={newToppings.length === 1}
                                                        onClick={(e) => handleRemoveTopping(index, e)}>
                                                <RemoveCircleOutlineIcon
                                                    sx={{
                                                        color: '#EC393E',
                                                        '&:hover, &:active': {
                                                            color: '#07143B'
                                                        },
                                                    }}
                                                ></RemoveCircleOutlineIcon>
                                            </IconButton>
                                            <IconButton onClick={() => handleAddTopping()}>
                                                <AddCircleOutlineIcon
                                                    sx={{
                                                        color: '#EC393E',
                                                        '&:hover, &:active': {
                                                            color: '#07143B'
                                                        },
                                                    }}
                                                ></AddCircleOutlineIcon>
                                            </IconButton>
                                        </Stack>
                                    ))}
                                </Box>
                            }

                            <Button variant="contained"
                                    onClick={() => {

                                        setAddPizza(false);
                                        handleAddPizza();

                                    }}
                                    sx={{
                                        backgroundColor: '#EC393E',
                                        borderRadius: '100px',
                                        alignSelf: 'center',
                                        fontFamily: 'Josefin Sans',
                                        fontWeight: 'normal',
                                        fontSize: '15px',
                                        lineHeight: '175%',
                                        color: 'white',
                                        '&:hover, &:active': {
                                            backgroundColor: '#f57c00'
                                        },
                                        marginBottom: 2
                                    }}
                            >
                                Thêm món
                            </Button>

                        </Stack>
                    </Fade>
                </Modal>
                <Snackbar
                    open={posted}
                    onClose={() => {
                        setPosted(false)
                    }}
                    message={message}
                    autoHideDuration={6000}
                />
            </Box>

            {
                pageList.map(p => {
                    return (
                        <Grow in={page === p} mountOnEnter unmountOnExit timeout={page === p ? 1000 : 0}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap'
                                }}
                            >
                                {
                                    ids
                                        .map((id, index) => {
                                            return (index >= (page - 1) * max && index < page * max) ?
                                                <Box sx={{marginLeft: '40px'}}>
                                                    <PizzaManageCard item={products[id]} category={category}
                                                                     id={id}
                                                                     cardUrl={'https://pizzahust-c5035-default-rtdb.firebaseio.com/menu/menu_'
                                                                         + categories[category].dbPath + '/' + id + '.json'}
                                                    />

                                                </Box>
                                                : false
                                        })
                                }
                            </Box>
                        </Grow>
                    )
                })
            }
            <Box sx={{marginTop: '100px', alignItems: 'center', width: '100%', marginLeft: '40%'}}>
                <CustomPagination variant="outlined" shape="rounded" count={totalPage}
                                  onChange={(event, value) => {
                                      setPage(value)
                                  }} size="large" page={page}
                />
            </Box>
        </Box>
    )
}