import { useState } from "react";

function useModal() {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => {
    setIsShowing((prevState) => !prevState);
  };

  return { toggle, isShowing };
}

export default useModal;
