import { useEffect } from "react"
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { add } from "../store/cartSlice";
import { getProducts } from "../store/productSlice";
import { Spinner } from "react-bootstrap";
import StatusCode from "../utils/StatusCode";
const Product = () => {
    const dispatch = useDispatch();
    const { data: products, status } = useSelector(state => state.products);
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

    if (status === StatusCode.LOADING) {
        return (
            <>
                <h1>Product Dashboard</h1>
                <div className="row justify-content-center align-items-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            </>
        );
    } else if (status === StatusCode.ERROR) {
        return (
            <>
                <h1>Product Dashboard</h1>
                <Alert key="danger" variant="danger" className="row justify-content-center align-items-center">Something went wrong, try again later.</Alert>
            </>
        );
    }
    else {
        return (
            <>
                <h1>Product Dashboard</h1>
                <div className="row">
                    {cards}
                </div>
            </>
        );
    }

}

export default Product