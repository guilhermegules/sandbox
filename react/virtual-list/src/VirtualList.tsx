import { useMemo, useState } from "react";

const TOTAL_ITEMS = 10000;
const ITEM_HEIGHT = 50;
const CONTAINER_HEIGHT = 400;
const OVERSCAN = 5;

type VirtualListProps = {
    data: { key: string, value: string }[];
    direction?: "left" | "right" | "center";
}

export function VirtualList({ data, direction = "left" }: VirtualListProps) {
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.max(
    0,
    Math.floor(scrollTop / ITEM_HEIGHT) - OVERSCAN,
  );
  const visibleCount = Math.ceil(CONTAINER_HEIGHT / ITEM_HEIGHT);

  const endIndex = startIndex + visibleCount + OVERSCAN * 2;
  const visibleItems = useMemo(
    () => data.slice(startIndex, endIndex),
    [startIndex, endIndex],
  );

  return (
    <div
      style={{
        height: CONTAINER_HEIGHT,
        overflowY: "auto",
        border: "1px solid black",
        width: "100%",
        position: "relative"
      }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: TOTAL_ITEMS * ITEM_HEIGHT, position: "relative" }}>
        {visibleItems.map((item, i) => {
          const index = startIndex + i;

          return (
            <div
              key={item.key}
              style={{
                position: "absolute",
                top: index * ITEM_HEIGHT,
                height: ITEM_HEIGHT,
                width: "100%",
                borderBottom: "1px solid #ccc",
                padding: "10px",
                boxSizing: "border-box",
                textAlign: direction
              }}
            >
              {item.value}
            </div>
          );
        })}
      </div>
    </div>
  );
}
