import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  cartList,
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../../store/features/cartSlice";

const { Container, Row, Col, Table } = require("react-bootstrap");

const CartDetail = () => {
  const dispatch = useDispatch();
  const cartListData = useSelector(cartList);
  let totalValue = 0;

  const handleRemovetoCart = (data) => {
    dispatch(removeItem(data.id));
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
      ""
    );
  };
  var count = 1;
  return (
    <Container className="my-4">
      <Row>
        <Col className="text-center" xs={12}>
          <h1>Cart Detail</h1>
        </Col>
      </Row>
      <Row className="my-4">
        <Col xs={12}>
          <Table striped bordered hover className="product-tabel">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Title</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartListData.map((data) => {
                totalValue += data.quantity * data.price;
                return (
                  <tr key={data.id}>
                    <td>{count++}</td>
                    <td>
                      <img alt="top" src={data.product_image}></img>
                    </td>
                    <td>{data.title}</td>
                    <td>{data.quantity}</td>
                    <td>{data.price}</td>
                    <td>{data.quantity * data.price}</td>
                    <td>{buttonData(data)}</td>
                  </tr>
                );
              })}
              {cartListData.length > 0 ? (
                <tr>
                  <td className="text-end" colSpan={7}>
                    Total Price : {totalValue}
                  </td>
                </tr>
              ) : (
                <tr>
                  <td className="text-center" colSpan={7}>
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
export default CartDetail;
