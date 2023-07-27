import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../Redux/action";
import { ThunkDispatch } from "redux-thunk";
import { RootState, ProductActionTypes } from "../Redux/actionType";

interface Product {
  image: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
}

interface ProductFormProps {
  onAddProduct: (product: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onAddProduct }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [productData, setProductData] = React.useState<Product>({
    image: "",
    name: "",
    price: 0,
    description: "",
    quantity: 0,
  });
  const dispatch: ThunkDispatch<RootState, null, ProductActionTypes> =
    useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    await dispatch(addProduct(productData));
    onClose();
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Button w={"100%"} mb={"3"} onClick={onOpen}>
        Add Product
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl id="name" isRequired>
                <FormLabel>Product Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter product name"
                  name="name"
                  value={productData.name}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="price" isRequired>
                <FormLabel>Product Price</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter product price"
                  name="price"
                  value={productData.price}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="description" isRequired>
                <FormLabel>Product Description</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter product description"
                  name="description"
                  value={productData.description}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="quantity" isRequired>
                <FormLabel>Product Quantity</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter product quantity"
                  name="quantity"
                  value={productData.quantity}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="image" isRequired>
                <FormLabel>Product Image</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter product image Url"
                  name="image"
                  value={productData.image}
                  onChange={handleChange}
                />
              </FormControl>
              <Button w="100%" type="submit" colorScheme="blue" mt={4}>
                Add
              </Button>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button w="100%" colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductForm;
