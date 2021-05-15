import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import routes from "../../../routes/dashboardRoutes";

const NavLeft = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [items, setItems] = useState([]);
  const [navOpen, setNavOpen] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  console.log("userInfo: ", userInfo);

  const activeLink = "/" + window.location.href.split("/")[3];

  useEffect(() => {
    let arrayItems = [];
    routes.dashboard.map((item, index) => {
      let obj = {
        _id: index,
        ...item,
      };
      arrayItems.push(obj);
      setItems(arrayItems);
    });
  }, []);

  console.log("items: ", items);

  const onClickHandler = (element, index) => {
    console.log("element: ", element, index);
    if (element.children) {
      setOpenMenu(!openMenu);
      setNavOpen(element.name.toLowerCase());
      console.log("navOpen: ", navOpen);
    } else {
      window.location.href = element.link;
    }
  };

  return (
    <div className="bledstore-dashboard-left-wrapper">
      <div className="bledstore-dashboard-left-profile">
        <div className="bledstore-dashboard-left-profile-img">
          <img src="../assets/images/avatar.jpg" alt={userInfo.name} />
        </div>
        <div className="bledstore-dashboard-left-profile-infos">
          <span className="info-name">{userInfo.pseudo}</span>
          {userInfo.isAdmin && (
            <span className="info-admin">
              <i className="fas fa-users"></i> Admin
            </span>
          )}
          {userInfo.isSeller && (
            <span className="info-seller">
              <i className="fas fa-user-check"></i> Seller
            </span>
          )}
        </div>
      </div>
      {items.map((item, index) => (
        <div key={index} className="bledstore-dashboard-left-container">
          <span className="bledstore-dashboard-left-section">
            {item.section}
          </span>
          {item.items.map((elt, index) => (
            <div
              key={index}
              className="bledstore-dashboard-left-item"
              onClick={() => onClickHandler(elt, index)}
            >
              <Link
                to="#"
                className={`bledstore-dashboard-left-link ${
                  activeLink === elt.link ? "active" : ""
                }`}
              >
                <i className={`bledstore-dashboard-left-icon ${elt.icon}`}></i>
                <span className="bledstore-dashboard-left-name">
                  {elt.name}
                </span>
              </Link>
              {elt.children && (
                <i
                  className={`bledstore-dashboard-left-children fas fa-angle-${
                    openMenu ? "down" : "left"
                  }`}
                ></i>
              )}
              {elt.children && openMenu && (
                <>
                  {navOpen === elt.name.toLowerCase() && (
                    <ul className="bledstore-dashboard-left-children-menu">
                      {elt.children.map((child, index) => (
                        <li
                          key={index}
                          className="bledstore-dashboard-left-children-item"
                        >
                          <Link
                            to={child.link}
                            className="bledstore-dashboard-left-children-link"
                          >
                            <span className="bledstore-dashboard-left-children-name">
                              {child.name}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default NavLeft;
