import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import TemplatePage from "./TemplatePage";
// import {
//   useHistory,
//   useLocation,
//   useParams,
//   withRouter,
// } from "react-router-dom";
const TemplateContainer = () => {
  //React Router
  // const history = useHistory();

  //React Redux
  // const dispatch = useDispatch();

  //React States

  //React Events

  const handleClick = () => {};

  const handleClickNextPage = () => {};

  return (
    <div>
      <TemplatePage
        handleClick={handleClick}
        handleClickNextPage={handleClickNextPage}
      />
    </div>
  );
};

export default TemplateContainer;
