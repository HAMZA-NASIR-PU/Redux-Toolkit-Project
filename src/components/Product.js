import { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../store/cartSlice";
import { getProducts } from "../store/productSlice";
import { Alert } from "react-bootstrap";

const Product = () => {
    const dispatch = useDispatch();
    const { data: products, status } = useSelector(state => state.products);
    const cart = useSelector(state => state.cart);

    useEffect(() => {
        // fetch('https://fakestoreapi.com/products')
        //     .then(data => data.json())
        //     .then(result => getProducts(result));

        //dispatch an action for fetch products.
        dispatch(getProducts());
    }, []);

    const addToCart = (product) => {
        // dispatch an add action

        dispatch(add(product));
    }

    const removeToCart = (id) => {
        //dispatch a remove action
        dispatch(remove(id));
    }

    const isInCart = (product) => {
        return cart.some(cartItem => cartItem.id === product.id);
    }

    if (status === 'loading') {
        return <Alert key="warning" variant="warning">Loading...</Alert>
    }

    if (status === 'error') {
        return <Alert key="danger" variant="danger">Something went wrong</Alert>
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
                        INR. {product.price}
                    </Card.Text>
                </Card.Body>
                <Card.Footer style={{ backgroundColor: 'white' }}>
                    {isInCart(product) ? (
                        <Button variant="danger" onClick={() => removeToCart(product.id)}>
                            Remove from Cart
                        </Button>
                    ) : (
                        <Button variant="primary" onClick={() => addToCart(product)}>
                            Add to Cart
                        </Button>
                    )}
                </Card.Footer>
            </Card>
        </div>
    ));

    return (
        <>
            <h1>Product Dashboard</h1>
            <div className="row">
                {cards}
            </div>
        </>
    )
}

export default Product;