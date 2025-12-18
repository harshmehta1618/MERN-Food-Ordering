import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./List.css";

const List = () => {
  const [list, setList] = useState([]);

  // fetch food list
  const fetchList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/food/list"
      );

      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to fetch food items");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // remove food item
const removeFood = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:4000/api/food/remove/${id}`
    );

    if (response.data.success) {
      toast.success(response.data.message);
      fetchList(); // refresh list
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("Error removing item");
  }
};


  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list">
      <h2 className="list-title">All Food Items</h2>

      <div className="list-table">
        <div className="list-table-header">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Action</p>
        </div>

        {list.map((item) => (
          <div className="list-table-row" key={item._id}>
            <img
              src={`http://localhost:4000/images/${item.image}`}
              alt={item.name}
            />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>₹{item.price}</p>
            <p
              className="list-remove"
              onClick={() => removeFood(item._id)}
            >
              ❌
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
