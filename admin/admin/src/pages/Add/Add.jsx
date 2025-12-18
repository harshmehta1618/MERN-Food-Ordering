import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import upload_area from "../../assets/upload_area.png";
import "./Add.css";

const Add = () => {
  const [image, setImage] = useState(null);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "salad",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/food/add",
        formData
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          name: "",
          description: "",
          price: "",
          category: "salad",
        });
        setImage(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="add">
      <h2 className="add-title">Add New Product</h2>

      <form className="add-form" onSubmit={onSubmitHandler}>
        {/* Image Upload */}
        <div className="form-group">
          <label className="form-label">Product Image</label>
          <div className="add-img-upload">
            <label htmlFor="image">
              <img
                src={image ? URL.createObjectURL(image) : upload_area}
                alt="upload"
              />
            </label>
            <input
              type="file"
              id="image"
              hidden
              accept="image/*"
              onChange={imageHandler}
            />
          </div>
        </div>

        {/* Product Name */}
        <div className="form-group">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter product name"
            value={data.name}
            onChange={onChangeHandler}
            required
          />
        </div>

        {/* Product Description */}
        <div className="form-group">
          <label className="form-label">Product Description</label>
          <textarea
            name="description"
            rows="5"
            placeholder="Enter product description"
            value={data.description}
            onChange={onChangeHandler}
            required
          />
        </div>

        {/* Category & Price */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              name="category"
              value={data.category}
              onChange={onChangeHandler}
            >
              <option value="salad">salad</option>
              <option value="rolls">rolls</option>
              <option value="deserts">deserts</option>
              <option value="sandwich">sandwich</option>
              <option value="cake">cake</option>
              <option value="pure veg">pure veg</option>
              <option value="pasta">pasta</option>
              <option value="noodles">noodles</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Price (₹)</label>
            <input
              type="number"
              name="price"
              placeholder="Enter price"
              value={data.price}
              onChange={onChangeHandler}
              required
            />
          </div>
        </div>

        <button type="submit" className="add-btn">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Add;
