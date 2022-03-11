import { useState, useContext, useEffect, useRef } from "react";
import "./input.css";
import { IconButton } from "@mui/material";
import ListContext from "../../store/list-context";
import { ArrowDropUpTwoTone, GifBoxRounded, Send } from "@mui/icons-material";
import Gifs from "../Gifs/Gifs";

const Inputs = () => {
  const inputRef = useRef();
  const [toggleGifContainer, setToggleGifContainer] = useState(false);
  const listContext = useContext(ListContext);
  const [scrollPosition, setScrollPosition] = useState(
    window.scrollY + window.innerHeight
  );

  const scrollToBottom = () => {
    console.log(scrollPosition);
    setScrollPosition(window.scrollY + window.outerHeight);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const input = inputRef.current.value;
    if (input !== "") {
      listContext.addNewItem({ type: "text", value: input });
    }
    console.log(window.scrollY, window.outerHeight);
    inputRef.current.value = "";
    window.scrollBy(0, 10);
    scrollToBottom();
  };

  useEffect(() => {
    console.log("changed");
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const searchGif = (e) => {
    e.preventDefault();
    setToggleGifContainer((state) => !state);
  };

  return (
    <div className="input_container">
      <div className="input_form">
        <form id="form">
          <input
            type="text"
            placeholder="Add some text here..."
            ref={inputRef}
          />
          <button onClick={sendMessage} type="submit" className="submit_btn">
            Send a message
          </button>
        </form>
        <div className="gif">
          <IconButton onClick={searchGif} type="submit" form="my-form">
            <GifBoxRounded className="" />
          </IconButton>
          {toggleGifContainer && (
            <>
              {" "}
              <ArrowDropUpTwoTone className="gif_dropdown" />
              <Gifs showGif={searchGif} scrollToBottom={scrollToBottom} />
            </>
          )}
        </div>
      </div>
      {
        <IconButton onClick={sendMessage} type="submit" form="my-form">
          <Send />
        </IconButton>
      }
    </div>
  );
};

export default Inputs;
