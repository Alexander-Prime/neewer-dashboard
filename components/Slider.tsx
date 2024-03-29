import classNames from "classnames";
import { JSX } from "preact";
import { useCallback, useRef } from "preact/hooks";

type Props = {
  className?: string;
  fillColor?: string;
  label?: string;
  onChange?: (value: number) => void;
  onInput?: (value: number) => void;
  trackBackground?: string;
};

const useDelayedChange = <T extends unknown>(
  onChange: ((value: T) => void) | undefined,
  delayMs: number,
) => {
  const timeout = useRef(0);
  const prevTimeout = useRef(0);

  const setValue = useCallback((value: T) => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      onChange?.(value);
      prevTimeout.current = timeout.current;
    }, delayMs);
  }, [onChange, delayMs]);

  const flush = useCallback((value: T) => {
    clearTimeout(timeout.current);
    if (timeout.current !== prevTimeout.current) {
      onChange?.(value);
    }
  }, [onChange, delayMs]);

  return [setValue, flush];
};

const numericValue = (ev: JSX.TargetedEvent<EventTarget>) =>
  Number((ev.target as HTMLInputElement | null)?.value);

export default (
  {
    className,
    fillColor = "var(--white-a30)",
    label,
    onChange,
    onInput,
    trackBackground = "var(--black-a12)",
  }: Props,
) => {
  const [setValue, flush] = useDelayedChange(onChange, 1000);

  const innerOnInput = useCallback((ev: JSX.TargetedEvent<EventTarget>) => {
    const value = numericValue(ev);
    setValue(value);
    onInput?.(value);
  }, []);

  return (
    <label
      className={classNames("Slider", className)}
    >
      {label}
      <input
        className="Slider-input"
        type="range"
        onInput={innerOnInput}
        onChange={(ev) => flush(numericValue(ev))}
        style={{
          "--fill-color": fillColor,
          "--track-background": trackBackground,
        }}
      />
    </label>
  );
};
