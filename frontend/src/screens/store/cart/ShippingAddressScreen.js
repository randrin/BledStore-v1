import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../../../components/CheckoutStep";
import HelmetSite from "../../../components/HelmetSite";
import { saveShippingAddress } from "../../../redux/actions/shippingActions";

const ShippingAddressScreen = (props) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userSignin);
  const { userInfo } = user;

  const addressShipping = useSelector((state) => state.shippingAddress);
  const { shippingAddress } = addressShipping;

  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [lat, setLat] = useState(shippingAddress.lat);
  const [lng, setLng] = useState(shippingAddress.lng);

  const userAddressMap = useSelector((state) => state.userAddressMap);
  const { address: shippingAddressMap } = userAddressMap;

  if (!userInfo) {
    props.history.push("/signin");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const newLat = shippingAddressMap ? shippingAddressMap.lat : lat;
    const newLng = shippingAddressMap ? shippingAddressMap.lng : lng;
    if (shippingAddressMap) {
      setLat(shippingAddressMap.lat);
      setLng(shippingAddressMap.lng);
    }
    let moveOn = true;
    if (!newLat || !newLng) {
      moveOn = window.confirm(
        "You did not set your location on map. Continue?"
      );
    }
    if (moveOn) {
      dispatch(
        saveShippingAddress({
          fullName,
          address,
          city,
          postalCode,
          country,
          lat: newLat,
          lng: newLng,
        })
      );
      props.history.push("/payment");
    }
  };

  const chooseOnMap = () => {
    dispatch(
      saveShippingAddress({
        fullName,
        address,
        city,
        postalCode,
        country,
        lat,
        lng,
      })
    );
    props.history.push("/map");
  };

  return (
    <>
      <HelmetSite title={"Shipping Address"} />
      <div className="shipping-wrapper">
        <CheckoutSteps step1 step2></CheckoutSteps>
        <form className="form" onSubmit={submitHandler}>
          <div className="bledstore-shipping-title">
            <i className="bledstore-shipping-title-icon fas fa-map-marker-alt"></i>
            <h1>Shipping Address</h1>
          </div>
          <div>
            <label htmlFor="fullName">
              Full Name <span className="form-required">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label htmlFor="address">
              Address <span className="form-required">*</span>
            </label>
            <input
              type="text"
              id="address"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label htmlFor="city">
              City <span className="form-required">*</span>
            </label>
            <input
              type="text"
              id="city"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label htmlFor="postalCode">
              Postal Code <span className="form-required">*</span>
            </label>
            <input
              type="text"
              id="postalCode"
              placeholder="Enter postal code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label htmlFor="country">
              Country <span className="form-required">*</span>
            </label>
            <input
              type="text"
              id="country"
              placeholder="Enter country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            ></input>
          </div>
          {/* <div>
          <label htmlFor="chooseOnMap">Location</label>
          <button type="button" onClick={chooseOnMap}>
            Choose On Map
          </button>
        </div> */}
          <div>
            <label />
            <button className="bledstore-btn-submit primary" type="submit">
              Continue <i className="fas fa-angle-double-right"></i>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ShippingAddressScreen;
