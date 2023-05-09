import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotos } from "./store/photos";

const Photos = () => {
  const { data } = useSelector((state: any) => state.photos);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchPhotos() as any);
  }, [dispatch]);

  if (!data) return null;

  return (
    <ul>
      {data.map((photo: any) => (
        <li key={photo.id}>{photo.title}</li>
      ))}
    </ul>
  );
};

export default Photos;
