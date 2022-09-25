// We use the renderHook method for testing custom hooks
// See: https://testing-library.com/docs/react-testing-library/api/#renderhook

// We can mock time in our tests
// E.g. we use vi.advanceTimersByTime(2000) to advance the system clock by 2 seconds
// See: https://vitest.dev/guide/mocking.html

// act() simulates how our hook will act in a browser, allowing us to update the values within it. 
// See: https://reactjs.org/docs/test-utils.html#act

import { act, renderHook } from '@testing-library/react';
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
      result.current.reset();
    });

    expect(result.current.time).toBe(10);
  });

  it('should add 1 to timer for each second that passes when start() is called', async () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      result.current.start();
      vi.advanceTimersByTime(3000); // advance the system clock by 3 seconds

    });
    
    expect(await result.current.time).toBe(3);
  });

  it('should stop the timer when stop() is called', async () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      result.current.start();
      vi.advanceTimersByTime(2000); // advance the system clock by 2 seconds
    });

    act(() => {
      result.current.stop(); // stop the timer
      vi.advanceTimersByTime(3000); // advance the system clock by 3 seconds
    });

    expect(await result.current.time).toBe(2); // because we stopped the timer previously, it should still only be 2 seconds
  });
});
