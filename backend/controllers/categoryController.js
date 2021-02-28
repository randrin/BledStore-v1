import expressAsyncHander from "express-async-handler";
import Category from "../models/categoryModel.js";

export const getListCategories = expressAsyncHander(async (req, res) => {
  // const listCategories = await Product.find({}).distinct("category");
  const listCategories = await Category.find({});
  res.status(200).send({ listCategories });
});

export const createCategory = expressAsyncHander(async (req, res) => {
  const category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    image: req.body.image,
  });
  const createdCategory = await category.save();
  if (createdCategory) {
    res.status(201).send({
      message: "Category Created successfuly.",
      category: createdCategory,
    });
  } else {
    res.status(500).send({ message: "Error in creating category" });
  }
});

export const getCategoryById = expressAsyncHander(async (req, res) => {
  const category = await Category.findById(req.params.categoryId);
  if (!category) {
    res.status(404).send({ message: "Category not found!!!!" });
  } else {
    res.status(200).send(category);
  }
});

export const updateCategory = expressAsyncHander(async (req, res) => {
  const category = await Category.findById(req.params.categoryId);
  if (category) {
    category.name = req.body.name;
    category.icon = req.body.icon;
    category.image = req.body.image;
    const categoryUpdated = await category.save();
    if (categoryUpdated) {
      res.status(200).send({
        message: "Category Updated successfully.",
        category: categoryUpdated,
      });
    } else {
      res.status(500).send({ message: "Error in updating category" });
    }
  }
});

export const activateCategory = expressAsyncHander(async (req, res) => {
  const category = await Category.findById(req.params.categoryId);
  if (category) {
    category.active = !category.active;
    const categoryUpdated = await category.save();
    if (categoryUpdated) {
      res.status(200).send({
        message: `Category ${
          category.active ? "Disabled" : "activated"
        } successfully.`,
        category: categoryUpdated,
      });
    } else {
      res.status(500).send({ message: "Error in activation category" });
    }
  }
});

export const deleteCategory = expressAsyncHander(async (req, res) => {
  const category = await Category.findById(req.params.categoryId);
  if (category) {
    const categoryDeleted = await category.remove();
    res.status(200).send({
      message: "Category deleted successfully",
      category: categoryDeleted,
    });
  } else {
    res.status(404).send({ message: "Category not Found" });
  }
});
