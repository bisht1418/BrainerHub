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
  Image,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import ProductForm from "../Components/ProductForm";

interface Product {
  _id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
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
  const totalPages = Math.floor(products.length / limit);

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

  const handleNextPage = () => {
    if (products.length < limit) {
      return;
    } else {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <Flex id="product" direction="row">
      <Box
        w={"25%"}
        p={3}
        style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
      >
        <ProductForm onAddProduct={handleAddProduct} />
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

          <Input
            type="number"
            placeholder="Limit"
            value={limit}
            onChange={handleLimitChange}
            maxWidth="100px"
          />
          <Box mt={"3"} style={{ display: "flex" }}>
            <Button
              size="xs"
              colorScheme={page == 1 ? "red" : "blue"}
              onClick={handlePrevPage}
              disabled={page === 1}
            >
              Prev Page
            </Button>
            <p
              style={{
                // margin: "10px",

                padding: "10px",
                display: "flex",
                position: "relative",
                top: "-10px",
                fontWeight: "bold",
              }}
            >
              {page}
            </p>
            <Button
              size="xs"
              colorScheme={page * limit > products.length ? "red" : "blue"}
              onClick={handleNextPage}
              disabled={page * limit > products.length}
            >
              Next Page
            </Button>
          </Box>
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
                  textAlign={"center"}
                >
                  <Image
                    w={"100px"}
                    objectFit="cover"
                    src={product.image}
                    alt={product.name}
                  />

                  <Heading size="md">Name: {product.name}</Heading>
                  <p>Price: {product.price}</p>
                  <p>Quantity: {product.quantity}</p>
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
