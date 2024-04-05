import { useSelector } from "react-redux"
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { remove } from "../store/cartSlice";
const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.cart);
  const removeToCart = (productId) => {
    //dispatch a remove action
    dispatch(remove(productId));
  }

  const cards = products.map(product => (
    <div className="col-md-12" style={{ marginBottom: '10px' }}>
      <Card key={product.id} className="h-100">
        <div className="text-center">
          <Card.Img variant="top" src={product.image} style={{ width: '100px', height: '130px' }} />
        </div>
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>
            PKR. {product.price}
          </Card.Text>
        </Card.Body>
        <Card.Footer style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="danger" onClick={() => removeToCart(product.id)}>Remove Item</Button>
        </Card.Footer>
      </Card>
    </div>
  ));

  return (
    <>
      <h1>Cart</h1>
      <div className="row">
        {cards}
      </div>
    </>
  )
}

export default Cart