import Modal from "./Modal";
import useModal from "@/app/hooks/useModal";
import { useState } from "react";
import { MdFlipCameraAndroid } from "react-icons/md";

function Card({ card }) {
  const { isShowing, toggle } = useModal();
  const [isShowFront, setShowFront] = useState(true);

  const isDoubleFace = card.url_back !== "";

  const handleFlip = () => {
    setShowFront((prevState) => !prevState);
  };

  return (
    <>
      <div className="card-container" onClick={toggle}>
        <h2 className="win-rate">
          <p className="label">GIHWR</p>
          {(card.ever_drawn_win_rate * 100).toFixed(2)}%
        </h2>
        <img
          className="card-img"
          src={isShowFront ? card.url : card.url_back}
          alt="card"
        />
        {isDoubleFace && (
          <button
            className="flip--btn"
            onClick={(e) => {
              handleFlip();
              e.stopPropagation();
            }}
          >
            {" "}
            <MdFlipCameraAndroid />
          </button>
        )}
      </div>
      {isShowing && (
        <Modal toggle={toggle}>
          <img
            className="card-img"
            src={isShowFront ? card.url : card.url_back}
            alt="card"
          />
          {isDoubleFace && (
            <button
              className="flip--btn"
              onClick={(e) => {
                handleFlip();
                e.stopPropagation();
              }}
            >
              {" "}
              <MdFlipCameraAndroid />
            </button>
          )}
        </Modal>
      )}
    </>
  );
}

export default Card;
