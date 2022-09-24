import React, { useEffect, useState } from 'react';

const ColorContext = React.createContext({
  color: 'red',
  updateColor: () => {},
});

export const ColorContextProvider = (props) => {
  const [color, setColor] = useState(false);

  useEffect(() => {
    setColor('red');
  }, []);

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
