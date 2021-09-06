import { createContext, useEffect, useState } from "react";

export const CardContext = createContext();

export const CardProvider = (props) => {
  const [cardId, setCardId] = useState({
    id: localStorage.getItem("userID"),
  });

  return (
    <CardContext.Provider value={{ cardId: cardId, setCardId }}>
      {props.children}
    </CardContext.Provider>
  );
};
