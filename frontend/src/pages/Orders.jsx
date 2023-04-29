import React, { useEffect, useState } from "react";
import { API_URL } from "../const";
import { styled } from "styled-components";
import ApiClient from "../api";
import { Typography } from "@mui/material";
import { format } from "date-fns";

const getOrders = async () => {
  try {
    return await ApiClient.get(`${API_URL}/delivery/user-order`);
  } catch (error) {
    throw error;
  }
};

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const initData = () => {
    getOrders()
      .then(({ data }) => {
        setOrders(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <FoodsWrapper>
      {!!orders?.length &&
        orders.map((order) => (
          <OrderWrapper key={order.key}>
            <Typography>
              {format(new Date(order.created), "E, MMM d")}
            </Typography>

            {order.food?.length && (
              <Foods>
                {order.food.map(({ id, name, image, price }) => (
                  <Food key={id}>
                    <img src={image} alt="name" />
                    <Texts>
                      <Typography variant="body1">{name}</Typography>
                      <Typography variant="body2">{price} сом</Typography>
                    </Texts>
                  </Food>
                ))}
              </Foods>
            )}
          </OrderWrapper>
        ))}
    </FoodsWrapper>
  );
}

const FoodsWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  grid-gap: 30px;
`;

const OrderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 30px;
  border: 1px solid #e0dede;
  background: #ffffff;
  border-radius: 8px;
  padding: 10px;
`;

const Foods = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 30px;
  padding: 10px;
`;

const Food = styled.div`
  display: flex;
  grid-gap: 20px;

  & img {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
`;

const Texts = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
`;
