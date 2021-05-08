import React, { useState } from "react";

const ShowMoreAndLess = ({ name, lgt }) => {
  const [readMore, setReadMore] = useState(false);

  const readLessHandler = () => {
    setReadMore(false);
  };

  const readMoreHandler = () => {
    setReadMore(true);
  };

  return (
    <div>
      {readMore && name}
      {!readMore ? name.length > lgt ? name.substring(0, lgt) : name : ""}
       {name.length > lgt ? (
        readMore ? (
          <a href="#" onClick={readLessHandler}> ...Read Less</a>
        ) : (
          <a href="#" onClick={readMoreHandler}> ...Read More</a>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default ShowMoreAndLess;
