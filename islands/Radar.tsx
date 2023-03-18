import { useSignal } from "@preact/signals";
import classNames from "classnames";
import { useCallback, useRef, useState } from "preact/hooks";

import Light from "~/components/Light.tsx";
import { lights } from "~/signals/lights.ts";
import { hash } from "~/signals/hash.ts";

type Props = {
  className?: string;
};

export default ({ className }: Props) => {
  const pointerTarget = useSignal<null | string>(null);

  const [radarSize, setRadarSize] = useState(0);

  const resizeOberver = useRef<ResizeObserver | null>(null);
  const setRadarWrapper = useCallback((elem: HTMLDivElement | null) => {
    if (!resizeOberver.current) {
      resizeOberver.current = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setRadarSize(
            Math.min(entry.contentRect.width, entry.contentRect.height),
          );
        }
      });
    }
    resizeOberver.current.disconnect();
    if (elem) {
      resizeOberver.current.observe(elem);
    }
  }, []);

  return (
    <div
      ref={setRadarWrapper}
      className={classNames("Radar", className)}
      onPointerUp={() => pointerTarget.value = null}
      onPointerLeave={() => pointerTarget.value = null}
      onPointerMove={(ev) => {
        if (pointerTarget.value) {
          const bounds = ev.currentTarget.getBoundingClientRect();
          const width = bounds.width;
          const height = bounds.height;
          const size = Math.min(width, height);

          const xOffset = (width - size) / 2;
          const yOffset = (height - size) / 2;

          const normX = (ev.clientX - xOffset - bounds.x) / size;
          const normY = (ev.clientY - yOffset - bounds.y) / size;
          lights.value = {
            ...lights.value,
            [pointerTarget.value]: {
              position: { x: (normX * 2) - 1, y: (normY * 2) - 1 },
            },
          };
        }
      }}
    >
      {Object.entries(lights.value).map(([id, { position: { x, y } }]) => (
        <div
          className="Radar-lightPositionWrapper"
          style={{
            left: `calc(${radarSize / 2}px + (${x} * ${
              radarSize / 2
            }px) + (100% - ${radarSize}px) / 2)`,
            top: `calc(${radarSize / 2}px + (${y} * ${
              radarSize / 2
            }px) + (100% - ${radarSize}px) / 2)`,
          }}
          onClick={() => hash.value = id}
          onPointerDown={() => {
            pointerTarget.value = id;
          }}
        >
          <Light id={id} />
        </div>
      ))}
    </div>
  );
};
