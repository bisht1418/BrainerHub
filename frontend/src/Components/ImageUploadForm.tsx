import React, { useState } from "react";
import axios from "axios";

const ImageUploadForm: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [productData, setProductData] = useState({
    name: "",
    price: 0,
    description: "",
    quantity: 0,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);

      // Add product data to the formData
      formData.append("name", productData.name);
      formData.append("price", productData.price.toString());
      formData.append("description", productData.description);
      formData.append("quantity", productData.quantity.toString());

      try {
        const response = await axios.post(
          "https://brainerhub-backend.onrender.com/api/products",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Handle the response from the server after successful upload
        console.log("Image uploaded successfully:", response.data);
      } catch (error) {
        // Handle error during image upload
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <input
        type="text"
        placeholder="Enter product name"
        name="name"
        value={productData.name}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Enter product price"
        name="price"
        value={productData.price}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Enter product description"
        name="description"
        value={productData.description}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Enter product quantity"
        name="quantity"
        value={productData.quantity}
        onChange={handleChange}
      />
      <button onClick={handleImageUpload}>Upload Image</button>
    </div>
  );
};

export default ImageUploadForm;
