import classNames from "classnames";

const PATHS = {
  bulb:
    "M21 11C21 12.4368 20.6633 13.795 20.0645 15H3.93552C3.33671 13.795 3 12.4368 3 11C3 6.02944 7.02944 2 12 2C16.9706 2 21 6.02944 21 11ZM7 19V17H17V19H7ZM9 23V21H15V23H9Z",
} as const;

export type Props = {
  className?: string;
  name: keyof typeof PATHS;
};

export default ({ className, name }: Props) => (
  <svg
    className={classNames("Icon", className)}
    width={24}
    height={24}
    viewBox="0 0 24 24"
  >
    <path d={PATHS[name]} />
  </svg>
);
