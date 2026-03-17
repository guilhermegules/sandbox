import { VirtualList } from "./VirtualList";

const data = Array.from({ length: 100000 }, (_, i) => ({
  key: i.toString(),
  value: `Item ${i}`,
}));

function App() {
  return (
    <div
      style={{
        margin: "32px",
        display: "grid",
        height: "calc(100vh - 100px)",
        placeItems: "center",
      }}
    >
      <div style={{ width: "100%" }}>
        <VirtualList data={data} direction="center" />
      </div>
    </div>
  );
}

export default App;
