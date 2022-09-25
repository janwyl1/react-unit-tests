import React, { useState } from 'react';

const ColorContext = React.createContext({
  color: false,
  updateColor: () => {},
});

export const ColorContextProvider = (props) => {
  const [color, setColor] = useState(false);

  const updateColor = (color) => {
    setColor(color);
  };

  return (
    <ColorContext.Provider
      value={{
        color: color,
        updateColor: updateColor,
      }}
    >
      {props.children}
    </ColorContext.Provider>
  );
};

export default ColorContext;
