// We use react-hooks-testing-library for testing custom hooks
// See: https://github.com/testing-library/react-hooks-testing-library

// We can mock time in our tests
// See: https://vitest.dev/guide/mocking.html

import { act, renderHook } from '@testing-library/react-hooks';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import useTimer from './useTimer';

describe('useTimer hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('should set initial value to 0', () => {
    const { result } = renderHook(() => useTimer());
    expect(result.current.time).toBe(0);
  });

  it('should reset timer to updated initial value', () => {
    const { result, rerender } = renderHook(
      ({ initialValue }) => useTimer(initialValue),
      {
        initialProps: { initialValue: 0 },
      }
    );

    rerender({ initialValue: 10 });

    act(() => {
      // act simulates how our hook will act in a browser, allowing us to update the values within it. For more details on act, please see https://reactjs.org/docs/test-utils.html#act
      result.current.reset();
    });

    expect(result.current.time).toBe(10);
  });

  it('should add 1 to timer for each second that passes when start() is called', async () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      result.current.start();
    });

    vi.advanceTimersByTime(3000); // advance the system clock by 3 seconds

    expect(await result.current.time).toBe(3);
  });

  it('should stop the timer when stop() is called', async () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      result.current.start();
    });

    vi.advanceTimersByTime(2000); // advance the system clock by 2 seconds

    act(() => {
      result.current.stop(); // stop the timer
    });

    vi.advanceTimersByTime(3000); // advance the system clock by 3 seconds

    expect(await result.current.time).toBe(2); // because we stopped the timer previously, it should still only be 2 seconds
  });
});
