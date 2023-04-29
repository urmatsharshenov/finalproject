import React, { useEffect, useState } from "react";
import { API_URL } from "../const";
import { styled } from "styled-components";
import FoodCard from "../components/FoodCard";
import ApiClient from "../api";

const getFoods = async () => {
  try {
    return await ApiClient.get(`${API_URL}/delivery/food-list`);
  } catch (error) {
    throw error;
  }
};

export default function Foods() {
  const [foods, setFoods] = useState([]);

  const initData = () => {
    getFoods()
      .then(({ data }) => {
        setFoods(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <FoodsWrapper>
      {!!foods?.length &&
        foods.map((food) => <FoodCard key={food.id} {...food} />)}
    </FoodsWrapper>
  );
}

const FoodsWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  grid-gap: 30px;
`;
