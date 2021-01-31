import expressAsyncHander from "express-async-handler";

export const uploadProductImage = expressAsyncHander(async (req, res) => {
  res.status(201).send({ image: `/${req.file.path}` });
});
