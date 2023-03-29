import { Outlet } from "react-router-dom";
import Header from "../common/Header";

const PublicRoute = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
export default PublicRoute;
