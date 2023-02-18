import classNames from "classnames";
import { useEffect, useState } from "preact/hooks";

type Props = {
  className?: string;
  label?: string;
  onChange?: (checked: boolean) => void;
};

export default ({ className, label, onChange }: Props) => {
  const [isChecked, setChecked] = useState(false);

  useEffect(() => onChange?.(isChecked), [isChecked]);

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
