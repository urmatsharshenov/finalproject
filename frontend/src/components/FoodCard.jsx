import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { API_URL } from "../const";
import ApiClient from "../api";

export default function FoodCard({ id, image, name, price }) {
  const handleOnOrder = async () => {
    try {
      await ApiClient.post(`${API_URL}/delivery/create-order`, {
        food: [id],
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card sx={{ maxWidth: 345, width: "100%" }}>
      <CardMedia sx={{ height: 140 }} image={image} title={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleOnOrder} size="small">
          Order
        </Button>
      </CardActions>
    </Card>
  );
}
