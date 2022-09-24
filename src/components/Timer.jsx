import useTimer from '../hooks/useTimer';

const Timer = () => {
  const timer = useTimer();

  return (
    <div>
      <h2>Example 5 - Custom hook with mocked timers</h2>
      <p>The time is {timer.time}</p>
      <button onClick={timer.start}>Start</button>
      <button onClick={timer.stop}>Stop</button>
      <button onClick={timer.reset}>Reset</button>
    </div>
  );
};

export default Timer;
