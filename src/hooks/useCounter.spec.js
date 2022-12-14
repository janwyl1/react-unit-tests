// We use the renderHook method for testing custom hooks
// See: https://testing-library.com/docs/react-testing-library/api/#renderhook

// act() simulates how our hook will act in a browser, allowing us to update the values within it. We need to use act when testing custom hooks 
// See: https://reactjs.org/docs/test-utils.html#act

import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import useCounter from './useCounter';

describe('useCounter hook', () => {
  it('should set initial value to 0', () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);
  });

  it('should reset counter to updated initial value', () => {
    const { result, rerender } = renderHook(
      ({ initialValue }) => useCounter(initialValue),
      {
        initialProps: { initialValue: 0 },
      }
    );

    rerender({ initialValue: 10 });

    act(() => {
      result.current.reset();
    });

    expect(result.current.count).toBe(10);
  });

  it('should add 1 to counter when increment function is called', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    })
    
    expect(result.current.count).toBe(1);
  });

  it('should subtract 1 to counter when increment function is called', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.decrement();
    })
  
    expect(result.current.count).toBe(-1);
  });
});
