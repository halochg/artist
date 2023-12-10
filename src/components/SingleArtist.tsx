import React, { useEffect, useState } from "react";
import DetailSection from "./DetailSection";
import Modal from "react-modal";
import { useForm } from "react-hook-form";

interface SingeArtistProps {
  id: number;
}

function SingeArtist({ id }: SingeArtistProps) {
  const [songList, setSongList] = useState([]);

  const fetchSingleData = (id: number) => {
    fetch(`/artist/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSongList(data.songs);
      });
  };

  useEffect(() => {
    fetchSingleData(id);
  }, []);

  return (
    <>
      <div className="wireFrame singleView">
        <DetailSection songList={songList} artistId={id} />
      </div>
    </>
  );
}

export default SingeArtist;
