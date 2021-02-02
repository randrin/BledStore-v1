import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

export const createReview = expressAsyncHandler(async (req, res) => {
  console.log('req.body: ', req.body)
  const product = await Product.findById(req.params.productId);
  if (product) {
    if (product.reviews.find((x) => x.name === req.user.name)) {
      return res
        .status(400)
        .send({ message: 'You already submitted a review' });
    }
    const review = {
      name: req.user.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((a, c) => a + c.rating, 0) / product.numReviews;

    const productUpdated = await product.save();
    res.status(201).send({
      message: "Review Updated successfully.",
      review: productUpdated.reviews[productUpdated.reviews.length - 1],
    });
  } else {
    res.status(404).send({ message: "Product not Found for the review" });
  }
});
