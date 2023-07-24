import React, { useState, useEffect } from "react";
import DefaultLayout from "./../components/DefaultLayout";
import axios from "axios";
import { Row, Col } from "antd";
import { useDispatch } from "react-redux";
import ItemList from "../components/ItemList";
const Homepage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [selecedCategory, setSelecedCategory] = useState("drinks");
  const categories = [
    {
      name: " Network",
      imageUrl: "https://images.tokopedia.net/img/cache/900/VqbcmM/2022/6/5/4acc6779-528b-4d44-a71c-5aaaad1fd79d.jpg",
    },
    {
      name: "Camera",
      imageUrl: "https://images.tokopedia.net/img/cache/900/VqbcmM/2022/3/30/7a6172a0-8c04-439f-9e16-32d158a02127.jpg",
    },
    {
      name: "Computer",
      imageUrl: "https://images.tokopedia.net/img/cache/900/VqbcmM/2023/5/25/76244a1e-6565-46e0-82ab-e06fe0e2e724.jpg",
    },
  ];
  const dispatch = useDispatch();

  //useEffect
  useEffect(() => {
    const getAllItems = async () => {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const { data } = await axios.get("/api/items/get-item");
        setItemsData(data);
        dispatch({ type: "HIDE_LOADING" });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllItems();
  }, [dispatch]);
  return (
    <DefaultLayout>
      <div className="d-flex">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`d-flex category ${
              selecedCategory === category.name && "category-active"
            }`}
            onClick={() => setSelecedCategory(category.name)}
          >
            <h4>{category.name}</h4>
            <img
              src={category.imageUrl}
              alt={category.name}
              height="200"
              width="200"
            />
          </div>
        ))}
      </div>
      <Row>
        {itemsData
          .filter((i) => i.category === selecedCategory)
          .map((item) => (
            <Col xs={24} lg={6} md={12} sm={6}>
              <ItemList key={item.id} item={item} />
            </Col>
          ))}
      </Row>
    </DefaultLayout>
  );
};

export default Homepage;
