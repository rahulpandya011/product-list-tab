import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { cartLength } from "../store/features/cartSlice";

const Header = () => {
  const navigate = useNavigate();
  const cartCount = useSelector(cartLength);

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Dashboard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <div className="cart-div" onClick={() => navigate("cart")}>
          <FontAwesomeIcon icon={faShoppingCart} />
          <span className="count">{cartCount}</span>
        </div>
      </Container>
    </Navbar>
  );
};
export default Header;
