import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listBrands } from "../redux/actions/brandActions";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import Carousel from "./utils/Carousel";

const Brand = () => {
  const dispatch = useDispatch();

  const brandList = useSelector((state) => state.brandsList);
  const { loading, error, brands } = brandList;

  useEffect(() => {
    dispatch(listBrands());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div
          style={{
            maxWidth: "auto",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 50,
          }}
        >
          <Carousel show={6}>
            {brands.map((brand, index) => (
              <div
                style={{
                  maxWidth: "10%",
                }}
                key={index}
              >
                <div style={{ padding: 8 }}>
                  <img
                    src={brand.image}
                    alt={brand.name}
                    style={{ width: "100%" , height: "150px" }}
                  />
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </>
  );
};

export default Brand;
