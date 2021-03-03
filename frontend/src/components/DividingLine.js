import React from "react";

const DividingLine = ({ title }) => {
  return (
    <div className="bledstore-dividing-line-wrapper">
      <div className="bledstore-dividing-line-row">
        <div className="bledstore-dividing-line-col">
          <div className="bledstore-dividing-line-container">
            <div className="bledstore-dividing-line-left">
              <div className="bledstore-left-line"></div>
            </div>
            <div className="bledstore-dividing-line-center">
              <span className="bledstore-center-content">{title}</span>
            </div>
            <div className="bledstore-dividing-line-right">
              <div className="bledstore-right-line"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DividingLine;
