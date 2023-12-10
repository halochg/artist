import React from "react";
import "./App.css";
import ArtlistSection from "./components/ArtistSection";
import queryString from "query-string";
import SingeArtist from "./components/SingleArtist";

function App() {
  const parsed = queryString.parse(window.location.search);
  console.log(parsed);
  const singleView = parsed.singleView;
  const artistId = Number(parsed.artistId) || 0;

  return (
    <div className="App">
      {singleView === "true" ? (
        <SingeArtist id={artistId} />
      ) : (
        <ArtlistSection />
      )}
    </div>
  );
}

export default App;
