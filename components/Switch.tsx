import classNames from "classnames";
import { useState } from "preact/hooks";

type Props = {
  className?: string;
  checked?: boolean;
  label?: string;
};

export default ({ className, label }: Props) => {
  const [isChecked, setChecked] = useState(false);
  return (
    <label
      className={classNames("Switch", className)}
    >
      {label}
      <div
        className={classNames("Switch-track", {
          "is-checked": isChecked,
        })}
      >
        <div
          className={classNames("Switch-track-button", {
            "is-checked": isChecked,
          })}
        />
      </div>
      <input
        className="Switch-checkbox"
        type="checkbox"
        onChange={(ev) =>
          setChecked(!!(ev.target as HTMLInputElement | null)?.checked)}
      />
    </label>
  );
};
