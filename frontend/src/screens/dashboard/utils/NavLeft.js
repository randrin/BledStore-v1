import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import data from "../../../data";

const NavLeft = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [items, setItems] = useState([]);
  const [navOpen, setNavOpen] = useState("");

  const activeLink = "/" + window.location.href.split("/")[3];

  useEffect(() => {
    let arrayItems = [];
    data.dashboard.map((item, index) => {
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
    if (element.children && element._id === index) {
      setOpenMenu(!openMenu);
      setNavOpen(element.name.toLowerCase());
      console.log("navOpen: ", navOpen);
    } else {
      window.location.href = element.link;
    }
  };

  return (
    <div className="bledstore-dashboard-left-wrapper">
      {items.map((elt, index) => (
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
            <span className="bledstore-dashboard-left-name">{elt.name}</span>
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
  );
};

export default NavLeft;
