import React, { useEffect, useState } from "react";
import logo from "../img/logo.png";
import { styled } from "styled-components";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ApiClient from "../api";
import { API_URL } from "../const";

const getOrders = async () => {
  try {
    return await ApiClient.get(`${API_URL}/delivery/user-order`);
  } catch (error) {
    throw error;
  }
};

export default function MainLayout({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getOrders()
      .then(() => setIsLogged(true))
      .catch(() => setIsLogged(false));
  }, [location]);

  const handleOnLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <MainWrapper>
      <Header>
        <img src={logo} alt="" />
        <Links>
          {isLogged ? (
            <>
              <Link to={"/foods"}>
                <CusButton>Foods</CusButton>
              </Link>
              <Link to={"/orders"}>
                <CusButton>My orders</CusButton>
              </Link>
              <CusButton onClick={handleOnLogOut}>Log Out</CusButton>
            </>
          ) : (
            <Link to={"/login"}>
              <CusButton>Log in</CusButton>
            </Link>
          )}
        </Links>
      </Header>
      {children}
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  min-height: 100vh;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 30px;

  & img {
    height: 75px;
    width: 75px;
  }
`;

const Links = styled.div`
  display: flex;
  grid-gap: 30px;
`;

const Link = styled(NavLink)`
  color: #000;
  text-decoration: none;
  outline: none;
`;

const CusButton = styled(Button)`
  height: min-content;
`;
