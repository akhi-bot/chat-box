/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const ListContext = createContext({
  listItem: [],
  // eslint-disable-next-line no-unused-vars
  addNewItem: (item) => {},
});

export const ListProvider = (props) => {
  const [list, setList] = useState([]);
  const addListItemHandler = (item) => {
    setList([...list, item]);
  };

  return (
    <ListContext.Provider
      value={{
        list,
        addNewItem: addListItemHandler,
      }}
    >
      {props.children}
    </ListContext.Provider>
  );
};

export default ListContext;
