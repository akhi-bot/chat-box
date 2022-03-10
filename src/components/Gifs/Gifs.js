import "./gif.css";
import { SearchRounded } from "@mui/icons-material";
import { useContext, useEffect, useRef, useState } from "react";
import ListContext from "../../store/list-context";

const api = {
  // eslint-disable-next-line no-undef
  key: process.env.REACT_APP_API_KEY,
  base: "https://api.giphy.com/v1/gifs/search",
};

const Gifs = (props) => {
  // eslint-disable-next-line react/prop-types
  const { showGif } = props;
  const inputRef = useRef();
  const listContext = useContext(ListContext);
  const [gifs, setGifs] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${api.base}?q=${inputRef.current.value}&api_key=${api.key}&limit=10`
        );
        const data = await res.json();
        setGifs(data.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
    inputRef.current.value = "";
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const addIntoList = (item) => (e) => {
    console.log(showGif);
    listContext.addNewItem({ type: "url", value: item });
    showGif(e);
  };

  return (
    <div className="gif_container">
      <form className="gif_form">
        <input type="text" placeholder="Find Gif..." ref={inputRef} />
        <button type="submit" onClick={handleSubmit}>
          <SearchRounded size={20} />
        </button>
      </form>{" "}
      <div className="img_container">
        {gifs.length ? (
          gifs.map((item) => (
            <img
              onClick={addIntoList(item.images.downsized_medium.url)}
              className="gif_img"
              key={`${item.id}`}
              src={`${item.images.downsized_medium.url}`}
              alt=""
            />
          ))
        ) : (
          <p>Add Gif here</p>
        )}
      </div>
    </div>
  );
};

export default Gifs;
