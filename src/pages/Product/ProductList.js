import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTh } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../../config";
import {
  addToCart,
  cartList,
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../../store/features/cartSlice";
import {
  addToCompare,
  compareList,
  removetoCompare,
} from "../../store/features/compareSlice";

const { Container, Row, Col, Card, Button, Table } = require("react-bootstrap");

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartListData = useSelector(cartList);
  const compareListData = useSelector(compareList);
  const [viewType, setViewType] = useState("grid");
  const [data, setData] = useState([]);

  const apiEndPoint = API_URL();

  const getData = () => {
    fetch(apiEndPoint + "/products", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setData(myJson);
      });
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewType]);

  const handleViewClick = (type) => {
    setViewType(type);
  };

  const handleAddtoCompare = (data) => {
    if (compareListData.length === 3) {
      toast.error("You can not add more than 3 item");
      return;
    }
    dispatch(addToCompare(data));
  };

  const handleAddtoCart = (data) => {
    dispatch(addToCart(data));
    setViewType(viewType);
  };

  const handleRemovetoCompare = (data) => {
    dispatch(removetoCompare(data.id));
  };

  const handleRemovetoCart = (data) => {
    dispatch(removeItem(data.id));
    setViewType(viewType);
  };

  const handleDecrement = (data) => {
    dispatch(decrementQuantity(data.id));
  };

  const handleIncrement = (data, added) => {
    if (added.quantity === data.stock) {
      toast.error(`Maximum stock is only ${data.stock} for ${data.title}`);
    } else if (added.quantity === data.maximum_cart) {
      toast.error(
        `You can not add more than ${data.maximum_cart} quantity for ${data.title}`
      );
    } else {
      dispatch(incrementQuantity(data.id));
    }
  };

  var count = 1;

  const compareButton = (data) => {
    return compareListData.find((item) => item.id === data.id) !== undefined ? (
      <>
        <Button
          variant="dark"
          onClick={() => {
            navigate("/compare");
          }}
        >
          View Compare
        </Button>
        <Button
          className="ms-2"
          variant="dark"
          onClick={() => handleRemovetoCompare(data)}
        >
          Remove Compare
        </Button>
      </>
    ) : (
      <Button
        variant="primary"
        onClick={() => {
          handleAddtoCompare(data);
        }}
      >
        Add to Compare
      </Button>
    );
  };

  const buttonData = (data) => {
    return cartListData.find((item) => item.id === data.id) !== undefined ? (
      <div className="action-button">
        <button
          className="minus-button"
          onClick={() =>
            cartListData.find((item) => item.id === data.id).quantity === 1
              ? handleRemovetoCart(data)
              : handleDecrement(data)
          }
        >
          -
        </button>
        <p className="quantity">
          {cartListData.find((item) => item.id === data.id).quantity}
        </p>
        <button
          className="add-button"
          onClick={() =>
            handleIncrement(
              data,
              cartListData.find((item) => item.id === data.id)
            )
          }
        >
          +
        </button>
      </div>
    ) : (
      <Button
        variant="primary"
        onClick={() => {
          handleAddtoCart(data);
        }}
      >
        Add to Cart
      </Button>
    );
  };

  return (
    <Container className="my-4">
      <Row className={data.length > 0 ? "d-none" : ""}>
        <Col>Load Here</Col>
      </Row>
      <Row className="my-4">
        <Col className="text-center" xs={12}>
          <h1>Product List</h1>
        </Col>
        <Col className="text-end">
          <div className="view-type-icons">
            <span
              onClick={() => handleViewClick("table")}
              className={viewType === "table" ? "active" : ""}
            >
              <FontAwesomeIcon icon={faBars} />
            </span>
            <span
              onClick={() => handleViewClick("grid")}
              className={(viewType === "grid" ? "active" : "") + " ms-2"}
            >
              <FontAwesomeIcon icon={faTh} />
            </span>
          </div>
        </Col>
      </Row>
      {viewType === "grid" ? (
        <Row className={data.length > 0 ? "" : "d-none"}>
          {data.map((data) => {
            return (
              <Col className="mt-2" xs={4} key={data.id}>
                <Card>
                  <Card.Img variant="top" src={data.product_image} />
                  <Card.Body>
                    <Card.Title>{data.title}</Card.Title>
                    <Card.Text>{data.description}</Card.Text>
                    <Row>
                      <Col xs={6}>Rating : {data.rating}</Col>
                      <Col xs={6} className={data.stock > 3 ? "d-none" : ""}>
                        <p className="hurry-up">
                          Hurry up only {data.stock} left
                        </p>
                      </Col>
                      <Col xs={12} className="mt-2">
                        <span>Price : {data.price}</span>
                      </Col>
                    </Row>
                    <div className="mt-2 text-center">{buttonData(data)}</div>
                    <div className="mt-2 text-center">
                      {compareButton(data)}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      ) : (
        <Row className={data.length > 0 ? "" : "d-none"}>
          <Col xs={12}>
            <Row>
              <Table striped bordered hover className="product-tabel">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Rating</th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((data) => {
                    return (
                      <tr key={data.id}>
                        <td>{count++}</td>
                        <td>
                          <img alt="top" src={data.product_image}></img>
                        </td>
                        <td>{data.title}</td>
                        <td>{data.description}</td>

                        <td>
                          {data.stock > 3 ? (
                            data.stock
                          ) : (
                            <p className="hurry-up">
                              Hurry up only {data.stock} left
                            </p>
                          )}
                        </td>
                        <td>{data.rating}</td>
                        <td>{data.price}</td>
                        <td className="text-center">{buttonData(data)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Row>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProductList;
