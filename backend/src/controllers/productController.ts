import { Request, Response } from "express";
import  ProductModel, {IProduct}  from "../models/Product";


// import multer from "multer";
// import path from "path";

// // Multer configuration for handling image uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Destination folder for storing images
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)); // Rename the image file with a timestamp
//   },
// });

// const upload = multer({ storage });

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { search, sort, order, page, limit } = req.query;

    // Handle search query
    let query: any = {};
    if (search) {
      query = {
        $or: [
          { name: { $regex: search as string, $options: "i" } },
          { description: { $regex: search as string, $options: "i" } },
        ],
      };
    }

    // Handle sort query
    let sortQuery: any = {};
    if (sort && order) {
      sortQuery[sort as string] = order === "asc" ? 1 : -1;
    } else {
      // If sort or order is not provided, set default sorting by name in ascending order
      sortQuery["name"] = 1;
    }

    // Handle pagination
    const pageNumber = parseInt(page as string) || 1;
    const itemsPerPage = parseInt(limit as string) || 10;
    const skipItems = (pageNumber - 1) * itemsPerPage;

    const totalProducts = await ProductModel.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    // Fetch products based on search, sort, and pagination
    const products = await ProductModel.aggregate([
      { $match: query },
      { $sort: sortQuery },
      { $skip: skipItems },
      { $limit: itemsPerPage },
    ]);

    res.json({
      status: 1,
      data: products,
      pagination: {
        totalPages,
        currentPage: pageNumber,
        hasNextPage: pageNumber < totalPages,
        hasPrevPage: pageNumber > 1,
      },
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ status: 0, message: "Internal server error" });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({ status: 0, message: "Product not found" });
    }
    res.json({ status: 1, data: product });
  } catch (error) {
    res.status(500).json({ status: 0, message: "Internal server error" });
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const { image, name, price, description, quantity } = req.body;

    // Create and save the product
    const newProduct: IProduct = new ProductModel({
      image,
      name,
      price,
      description,
      quantity,
    });
    await newProduct.save();

    res.json({
      status: 1,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({ status: 0, message: "Internal server error" });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, description, quantity } = req.body;

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      { name, price, description, quantity },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ status: 0, message: "Product not found" });
    }

    res.json({
      status: 1,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ status: 0, message: "Internal server error" });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedProduct = await ProductModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ status: 0, message: "Product not found" });
    }

    res.json({ status: 1, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: 0, message: "Internal server error" });
  }
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
