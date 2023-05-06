import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhoto } from "./store/photo";
import { autoLogin } from "./store/user";

function App() {
  const photo = useSelector<any, any>((state) => state.photo);
  const dispatch = useDispatch();
  const [pagination, setPagination] = React.useState({ page: 1, total: 3 });

  React.useEffect(() => {
    dispatch(autoLogin() as any);
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(fetchPhoto(pagination) as any);
  }, [dispatch, pagination]);

  const onNextPage = () => {
    setPagination((p) => ({ ...p, page: p.page + 1 }));
  };

  const onPreviousPage = () => {
    if (pagination.page === 1) return;
    setPagination((p) => ({ ...p, page: p.page - 1 }));
  };

  const onLogout = () => {
    window.localStorage.removeItem("token");
  };

  return (
    <div>
      <ul
        style={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
        }}
      >
        {photo.data?.map((p: any) => (
          <div
            key={p.id}
            style={{
              border: "1px solid black",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2>{p.title}</h2>
            <img src={p.src} alt={p.title} style={{ width: "100px" }} />
            <p>{p.author}</p>
            <p>{p.idade}</p>
            <p>{p.date}</p>
          </div>
        ))}
      </ul>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <button onClick={onPreviousPage}>Previous page</button>
        <button onClick={onNextPage}>Next page</button>
        <input
          type="text"
          placeholder="Pagination total items"
          value={pagination.total}
          onChange={(event) => {
            setPagination((p) => ({ ...p, total: Number(event.target.value) }));
          }}
        />
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}

export default App;
