import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <h2>Example 1 - Simple Counter</h2>
      <p>Simple example that checks the count has incremented each time we click the button</p>
      <p>See: Counter.jsx / Counter.spec.jsx</p>
      <button type="button" onClick={() => setCount((count) => count + 1)}>
        count is: {count}
      </button>
    </>
  );
};

export default Counter;
