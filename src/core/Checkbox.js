import React, { useState, useEffect } from "react";

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (c) => () => {
    // return the first inder or -1
    const currentCategoryId = checked.indexOf(c);
    const newCheckedCategoryId = [...checked];
    // if currently checked was not already in checked state > push
    // else pull/take off
    if (currentCategoryId === -1) {//if category toggled wasn't in the state we add it
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(checked.indexOf(c), 1); //if was there and now we toggle (uncheck) we remove it
    }
    //console.log(newCheckedCategoryId);
    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  };

  return categories.map((c, i) => (
    <li key={i} className="list-unstyled">
      <input
        onChange={handleToggle(c._id)}
        value={checked.indexOf(c._id) !== -1}
        type="checkbox"
        className="form-check-input"
        id={`checkbox_${i}`}
      />
      <label htmlFor={`checkbox_${i}`} className="form-check-label">
        {c.name}
      </label>
    </li>
  ));
};

export default Checkbox;
