import Modal from "./Modal";
import useModal from "@/app/hooks/useModal";

function Card({ card }) {
  const { isShowing, toggle } = useModal();

  return (
    <>
      <div className="card-container" onClick={toggle}>
        <h2 className="win-rate">
          <p className="label">GIHWR</p>
          {(card.ever_drawn_win_rate * 100).toFixed(2)}%
        </h2>
        <img className="card-img" src={card.url} alt="card" />
      </div>
      {isShowing && (
        <Modal toggle={toggle}>
          <img className="card-img" src={card.url} alt="card" />
        </Modal>
      )}
    </>
  );
}

export default Card;
