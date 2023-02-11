import classNames from "classnames";

const PATHS = {
  add: "M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z",
  bulb:
    "M21 11C21 12.4368 20.6633 13.795 20.0645 15H3.93552C3.33671 13.795 3 12.4368 3 11C3 6.02944 7.02944 2 12 2C16.9706 2 21 6.02944 21 11ZM7 19V17H17V19H7ZM9 23V21H15V23H9Z",
  close:
    "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",
} as const;

export type IconName = keyof typeof PATHS;

export type Props = {
  className?: string;
  name: IconName;
};

export default ({ className, name }: Props) => (
  <svg
    className={classNames("Icon", className)}
    viewBox="0 0 24 24"
  >
    <path d={PATHS[name]} />
  </svg>
);
