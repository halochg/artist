import React, { useState } from "react";
import new_tap_icon from "../icons/new_tap_icon.png";

export interface SongDetail {
  id: number;
  title: string;
  lyrics: string;
  composer?: string;
  producer?: string;
  production_date?: string;
  awards?: string;
}

interface DetailProps {
  songList: SongDetail[];
  artistId: number;
}

function DetailSection({ songList, artistId }: DetailProps) {
  const [songIndex, setSongIndex] = useState(0);

  const handleSelectChange = (event: any) => {
    setSongIndex(event.target.value);
  };

  return (
    <>
      <div className="detailSection menu" data-title="Artist Details Section">
        <a href={`?singleView=true&artistId=${artistId}`} target="_blank">
          <img className="new_tap_icon" src={new_tap_icon} />
        </a>
        <select
          className="select-song"
          value={songIndex}
          onChange={handleSelectChange}
        >
          {songList.length > 0 &&
            songList.map((item, index) => {
              return <option value={index}>{item.title}</option>;
            })}
        </select>
        <br />
        {songList.length > 0 && (
          <div>
            <div
              className="lyrics-block block-inactive"
              data-title={songList[songIndex].title + " lyrics"}
            >
              {songList.length > 0 && songList[songIndex].lyrics}
            </div>

            <div
              className="song-detail-block block-inactive"
              data-title={songList[songIndex].title + " details"}
            >
              Composer: {songList[songIndex].composer} <br />
              Producer: {songList[songIndex].producer} <br />
              Production Date: {songList[songIndex].production_date} <br />
              Awards: {songList[songIndex].awards}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default DetailSection;
