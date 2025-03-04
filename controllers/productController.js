import Product from "../models/Product.js";

export const addProduct = async (req, res) => {
    try {
      console.log("Received request:", req.method, req.path);
      console.log("Request Body:", req.body);
      console.log("Uploaded Files:", req.files);
  
      const {
        name, description, price, discountPrice, stock, unit, deliveryTime,
        category, subcategory, returnPolicy, paymentMode, sellerName,
        contact, location
      } = req.body;
  
      if (!name || !description || !price || !stock || !category || !subcategory || !contact || !location) {
        return res.status(400).json({ message: "Required fields are missing" });
      }
  
      // Ensure images are correctly saved
      const images = req.files.map(file => file.path);
  
      const newProduct = new Product({
        name, description, price, discountPrice, stock, unit, deliveryTime,
        category, subcategory, returnPolicy, paymentMode, sellerName,
        contact, location, images
      });
  
      await newProduct.save();
      res.status(201).json({ message: "Product added successfully!", product: newProduct });
  
    } catch (error) {
      console.error("Error in addProduct:", error);
      res.status(500).json({ message: "Server error", error });
    }
  };
  