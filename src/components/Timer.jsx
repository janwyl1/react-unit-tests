import useTimer from '../hooks/useTimer';

const Timer = () => {
  const timer = useTimer();

  return (
    <div>
      <h2>Example 5 - Custom hook with mocked timers</h2>
      <p>Uses renderHook and act to test a custom hook</p>
      <p>We mock the system clock using vi.useFakeTimers() and vi.advanceTimersByTime() so that we don't have to wait for the actual time to pass.</p>
      <p>As a general rule, we should avoid explicity waiting during automated tests.</p>
      <p>See: Timer.jsx / useTimer.js / useTimer.spec.js</p>
      <h3>Seconds elapsed: {timer.time}</h3>
      <button onClick={timer.start}>Start</button>
      <button onClick={timer.stop}>Stop</button>
      <button onClick={timer.reset}>Reset</button>
    </div>
  );
};

export default Timer;
