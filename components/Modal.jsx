function Modal({ children, toggle }) {
  return (
    <div className="modal" onClick={toggle}>
      {children}
    </div>
  );
}

export default Modal;
