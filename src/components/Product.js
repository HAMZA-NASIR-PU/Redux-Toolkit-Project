import { useState, useEffect } from "react"
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { add } from "../store/cartSlice";
import { getProducts } from "../store/productSlice";
import { Spinner } from "react-bootstrap";
const Product = () => {
    const dispatch = useDispatch();
    const { data: products } = useSelector(state => state.products);
    useEffect(() => {
        //dispatch an action for fetch products
        dispatch(getProducts());
    }, []);

    const addToCart = (product) => {
        //dispatch an add action
        dispatch(add(product));
    }

    const cards = products.map(product => (
        <div key={product.id} className="col-md-3" style={{ marginBottom: '10px' }}>
            <Card className="h-100">
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
                    <Button variant="primary" onClick={() => addToCart(product)}>Add to Cart</Button>
                </Card.Footer>
            </Card>
        </div>
    ));

    return (
        <>
            <h1>Product Dashboard</h1>
            {
                products.length == 0 ? <div className="row justify-content-center align-items-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div> :
                    <div className="row">
                        {cards}
                    </div>
            }
        </>
    )
}

export default Product