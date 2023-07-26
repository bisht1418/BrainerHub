// src/components/ProductList.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Flex,
  Spacer,
  Box,
  Button,
  Input,
  Select,
  Stack,
  Heading,
  Spinner,
  SimpleGrid,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import ProductForm from "../Components/ProductForm";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
}

interface ProductListProps {}

const Product: React.FC<ProductListProps> = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "");
  const [order, setOrder] = useState(searchParams.get("order") || "asc");
  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"));
  const [limit, setLimit] = useState(
    parseInt(searchParams.get("limit") || "10")
  );
  const baseUrl = "http://localhost:8080";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${baseUrl}/api/products?search=${search}&sort=${sort}&order=${order}&page=${page}&limit=${limit}`
        );
        setProducts(response.data.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [search, sort, order, page, limit]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(e.target.value);
  };

  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPage(parseInt(e.target.value));
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(e.target.value));
  };

  const handleAddProduct = () => {};

  return (
    <Flex direction="row">
      <Box
        w={"25%"}
        p={3}
        style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
      >
        <Stack direction="column">
          <Input
            placeholder="Search"
            value={search}
            onChange={handleSearchChange}
            maxWidth="200px"
          />
          <Select value={sort} onChange={handleSortChange} maxWidth="200px">
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </Select>
          <Select value={order} onChange={handleOrderChange} maxWidth="100px">
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </Select>
          <ProductForm onAddProduct={handleAddProduct} />
          <Input
            type="number"
            placeholder="Page"
            value={page}
            onChange={handlePageChange}
            maxWidth="100px"
          />
          <Input
            type="number"
            placeholder="Limit"
            value={limit}
            onChange={handleLimitChange}
            maxWidth="100px"
          />
        </Stack>
      </Box>

      <Box style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }} w={"100%"}>
        <div>
          {loading ? (
            <Spinner size="xl" color="blue.500" thickness="4px" />
          ) : (
            <SimpleGrid columns={4} spacing={4} p={2}>
              {products.map((product) => (
                <Box
                  style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
                  key={product._id}
                  borderWidth="1px"
                  p={4}
                  my={2}
                >
                  <Heading size="md">Name: {product.name}</Heading>
                  <p>Price: {product.price}</p>
                  <p>Description: {product.description}</p>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </div>
      </Box>
    </Flex>
  );
};

export default Product;
