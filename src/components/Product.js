import { useState, useEffect } from "react"
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const Product = () => {

    const [products, setProducts] = useState([]);;

    useEffect(() => {
        //api
        fetch("https://fakestoreapi.com/products")
            .then(data => data.json())
            .then(result => setProducts(result));
    }, []);

    const cards = products.map(product => (
        <div className="col-md-3" style={{ marginBottom: '10px' }}>
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
                    <Button variant="primary">Add to Cart</Button>
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

export default Product