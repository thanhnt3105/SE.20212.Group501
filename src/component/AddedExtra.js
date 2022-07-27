import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {IMG_DRINKS_COCA} from "../assets";
import {useSelector} from "react-redux";

export const AddedExtra = (props) => {
    const menu = {
        'pizza': useSelector(state => state.pizzas),
        'kid': useSelector(state => state.kids),
        'drink': useSelector(state => state.drinks),
        'appetizer': useSelector(state => state.appetizers),
        'vegetable': useSelector(state => state.vegetables),
        'dessert': useSelector(state => state.desserts),
    }
    const category = props.category;
    const slotId = props.slotId;
    const openModal = props.openModal;
    const productId = props.productId;
    const product = menu[category].entities[productId];
    return (
        <Container>
            <RowSection>
                <ColumnSection>
                    <ImageView src={product.image_url}/>
                    <ChangeItem
                        onClick={() =>{
                            openModal(slotId)
                        }}
                    >
                        <TextChangeItem>ĐỔI MÓN</TextChangeItem>
                    </ChangeItem>
                </ColumnSection>
                <div style={{width: '58%', padding: 8}}>
                    <RowSection style={{justifyContent: 'space-between'}}>
                        <TextNormal>{product.title}</TextNormal>
                        <TextNormal>{product.price} đ</TextNormal>
                    </RowSection>
                    <br/>
                </div>
            </RowSection>
        </Container>
    )
}
const Container = styled(Box)`
  background-color: white;
  width: 100%;
  margin-bottom: 16px;
  border-radius: 20px;
`
const RowSection = styled('div')`
  display: flex;
`
const TextNormal = styled('span')`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.8);
`
const TextLight = styled('span')`
  font-size: 12px;
  color: #2c2b2b;
`
const ImageView = styled('img')`
  width: 120px;
`
const ChangeItem = styled(Button)`
  background-color: #ec393e;
  width: 120px;
  height: 28px;
  margin-top: 4px;

`
const TextChangeItem = styled('span')`
  font-size: 12px;
  color: white;
`

const ColumnSection = styled('div')`
  display: flex;
  flex-direction: column;
`