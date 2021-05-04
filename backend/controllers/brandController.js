import expressAsyncHander from "express-async-handler";
import Brand from "../models/brandModel.js";

export const getListBrands = expressAsyncHander(async (req, res) => {
  const listBrands = await Brand.find({});
  res.status(200).send({ listBrands });
});

export const createBrand = expressAsyncHander(async (req, res) => {
  const brand = new Brand({
    name: req.body.name,
    image: req.body.image,
  });
  const createdBrand = await brand.save();
  if (createdBrand) {
    res.status(201).send({
      message: "Brand Created successfuly.",
      brand: createdBrand,
    });
  } else {
    res.status(500).send({ message: "Error in creating brand" });
  }
});

export const getBrandById = expressAsyncHander(async (req, res) => {
  const brand = await Brand.findById(req.params.brandId);
  if (!brand) {
    res.status(404).send({ message: "Brand not found!!!!" });
  } else {
    res.status(200).send(brand);
  }
});

export const updateBrand = expressAsyncHander(async (req, res) => {
  const brand = await Brand.findById(req.params.brandId);
  if (brand) {
    brand.name = req.body.name;
    brand.image = req.body.image;
    const brandUpdated = await brand.save();
    if (brandUpdated) {
      res.status(200).send({
        message: "Brand Updated successfully.",
        brand: brandUpdated,
      });
    } else {
      res.status(500).send({ message: "Error in updating brand" });
    }
  }
});

export const activateBrand = expressAsyncHander(async (req, res) => {
  const brand = await Brand.findById(req.params.brandId);
  if (brand) {
    brand.active = !brand.active;
    const brandUpdated = await brand.save();
    if (brandUpdated) {
      res.status(200).send({
        message: `Brand ${
          brand.active ? "Disabled" : "activated"
        } successfully.`,
        brand: brandUpdated,
      });
    } else {
      res.status(500).send({ message: "Error in activation brand" });
    }
  }
});

export const deleteBrand = expressAsyncHander(async (req, res) => {
  const brand = await Brand.findById(req.params.brandId);
  if (brand) {
    const brandDeleted = await brand.remove();
    res.status(200).send({
      message: "Brand deleted successfully",
      brand: brandDeleted,
    });
  } else {
    res.status(404).send({ message: "Brand not Found" });
  }
});
