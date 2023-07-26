import React from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Badge,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  description: string;
  rating: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  price,
  description,
  rating,
}) => {
  const cardBgColor = useColorModeValue("white", "gray.800");
  const cardBorderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={cardBgColor}
      borderColor={cardBorderColor}
      boxShadow="md"
    >
      <Image src={image} alt={name} h="200px" objectFit="cover" />

      <Box p="4">
        <Flex align="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {rating} <StarIcon color="teal.500" />
          </Box>
        </Flex>

        <Text
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {name}
        </Text>

        <Text mt="1" color="gray.600">
          {description}
        </Text>

        <Box>
          <Box as="span" color="gray.600" fontSize="sm">
            ${price}
          </Box>
        </Box>

        <Flex mt="2" align="center">
          <IconButton
            aria-label="Add to cart"
            icon={<i className="fas fa-cart-plus" />}
            colorScheme="teal"
            size="sm"
          />
          <IconButton
            aria-label="Favorite"
            icon={<i className="far fa-heart" />}
            colorScheme="teal"
            size="sm"
            ml={2}
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default ProductCard;
