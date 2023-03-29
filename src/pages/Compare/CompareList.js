import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  compareList,
  removetoCompare,
} from "../../store/features/compareSlice";

const CompareList = () => {
  const compareListData = useSelector(compareList);
  const dispatch = useDispatch();

  const handleRemovetoCompare = (data) => {
    dispatch(removetoCompare(data.id));
  };

  return (
    <Container className="my-4">
      <Row>
        <Col className="text-center" xs={12}>
          <h1>Compare Detail</h1>
        </Col>
      </Row>
      <Row className="my-4">
        {compareListData.length === 0 ? (
          <Col xs={12}>
            <h2>No Compare List found</h2>
          </Col>
        ) : (
          compareListData.map((data) => {
            return (
              <Col key={data.id} xs={4}>
                <Row>
                  <Col xs={12}>
                    <img src={data.product_image} alt="product-img" />
                  </Col>
                  <Col xs={12}>
                    <h3>{data.title}</h3>
                    <p>{data.description}</p>
                    <p className="compare-data">
                      <b>PRICE:</b>
                      {data.price}
                    </p>
                    <p className="compare-data">
                      <b>RATINGS:</b>
                      {data.rating}
                    </p>
                    <p className="compare-data">
                      <b>STOCKS:</b>
                      {data.stock}
                    </p>
                    {Object.keys(data.product_attributes).map(
                      (data1, index1) => {
                        return (
                          <p key={index1} className="compare-data">
                            <b>{data1.toUpperCase()}:</b>
                            {Object.values(data.product_attributes)[index1]}
                          </p>
                        );
                      }
                    )}
                  </Col>
                  <Col className="text-center">
                    <Button
                      className="ms-2"
                      variant="dark"
                      onClick={() => handleRemovetoCompare(data)}
                    >
                      Remove Compare
                    </Button>
                  </Col>
                </Row>
              </Col>
            );
          })
        )}
      </Row>
    </Container>
  );
};
export default CompareList;
