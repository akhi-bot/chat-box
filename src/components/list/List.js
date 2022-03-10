import "./list.css";
import ListContext from "../../store/list-context";
import { useContext } from "react";

const List = () => {
  const listContext = useContext(ListContext);
  return (
    <ul className="list_container">
      {listContext.list.length ? (
        listContext.list.map((item, i) => (
          <li key={i}>
            {item.type === "text" ? (
              <p className="list_item">{item.value}</p>
            ) : (
              <img className="list_img" src={`${item.value}`} alt="" />
            )}
          </li>
        ))
      ) : (
        <p>Please Add Some Text Or Gif</p>
      )}
    </ul>
  );
};

export default List;
