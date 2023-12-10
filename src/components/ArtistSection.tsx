import React, { useEffect, useState } from "react";
import DetailSection from "./DetailSection";
import Modal from "react-modal";
import { useForm } from "react-hook-form";

function ArtistSection() {
  const [artistList, setArtistList] = useState([]);
  const [songList, setSongList] = useState([]);
  const [artistIndex, setArtistIndex] = useState(0);
  const [artistId, setArtistId] = useState(0);

  const [indexes, setIndexes] = React.useState<number[] | []>([]);
  const [counter, setCounter] = React.useState(0);
  const { register, reset, handleSubmit } = useForm();

  const addFriend = () => {
    setIndexes((prevIndexes) => [...prevIndexes, counter]);
    setCounter((prevCounter) => prevCounter + 1);
  };

  const removeFriend = (index: number) => () => {
    setIndexes((prevIndexes) => [
      ...prevIndexes.filter((item) => item !== index),
    ]);
    setCounter((prevCounter) => prevCounter - 1);
  };

  let subtitle: any;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const fetchData = () => {
    fetch("/artist")
      .then((res) => res.json())
      .then((data) => {
        setArtistList(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleArtistSelect = (index: number) => {
    console.log(index);

    let artist_selected: any = artistList[index];

    setArtistIndex(index);
    setArtistId(artist_selected.id);

    artist_selected.songs && setSongList(artist_selected.songs);
  };

  const handleRemoveArtist = (index: number) => {
    fetch(`/artist/${index}`, { method: "DELETE" }).then((res) => {
      console.log(res);
      fetchData();
    });
  };

  const onSubmit = (data: any) => {
    console.log(data);

    let postData = data;

    fetch("/artist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then((res) => {
      console.log(res);
      setIndexes([]);
      setCounter(0);
      reset({
      });
      setIsOpen(false);
      fetchData();
    });
  };


  return (
    <>
      <div className="wireFrame">
        <div className="artistSection menu" data-title="Artist List Section">
          {artistList.map((item: any, index) => {
            return (
              <div
                className="artist-block block"
                data-title="Artist Section"
                key={index}
                tabIndex={index === 0 ? 1 : -1}
                onClick={() => {
                  handleArtistSelect(index);
                }}
              >
                <div>Name: {item.name}</div>
                <div>Nationality: {item.nationality}</div>
                <div>Age: {item.age}</div>
              </div>
            );
          })}

          <div className="artist-action-buttons">
            <button onClick={openModal}>Add Artist</button>
            <button
              onClick={(e) => {
                handleRemoveArtist(artistId);
              }}
            >
              Remove Artist
            </button>
          </div>
        </div>
        <DetailSection songList={songList} artistId={artistId}/>

        <div>
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
          >
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Add an artist </h2>

            <form className="artist-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="artist-form-field">
                <label>Name: </label> <input id="name" {...register("name")} />
              </div>

              <div className="artist-form-field">
                <label>Nationality: </label>{" "}
                <input id="nationality" {...register("nationality")} />
              </div>

              <div className="artist-form-field">
                <label>Age:</label> <input id="age" {...register("age")} />
              </div>

              <br />
              

              {indexes.map((index) => {
                
                const fieldName = `songs[${index}]`;
                return (
                  <div className="artist-form-songs">
                    
                    <fieldset name={fieldName} key={fieldName}>
                    <h3 >Add a song </h3>
                    <div className="artist-form-field"><label>
                        Title:
                        <input
                          type="text"
                          {...register(`${fieldName}.title`)}
                        />
                      </label>
                      </div>
                      
                      <div className="artist-form-field">
                      <label>
                        Lyrics:</label>
                        <textarea style={{ display: "block", width: '90%', height: '500px', padding: 2 }}  {...register(`${fieldName}.lyrics`)} />
                      
                      </div>

                      <div className="artist-form-field">
                      <label>
                      Composer:</label>
                        <input
                          type="text"
                          {...register(`${fieldName}.composer`)}
                        />
                      
                      </div>

                      <div className="artist-form-field">
                      <label>
                      Composer :</label>
                        <input
                          type="text"
                          {...register(`${fieldName}.composer`)}
                        />
                      
                      </div>

                      <div className="artist-form-field">
                      <label>
                      Producer:</label>
                        <input
                          type="text"
                          {...register(`${fieldName}.producer`)}
                        />
                      
                      </div>

                      <div className="artist-form-field">
                      <label>
                      Production Date:</label>
                        <input
                          type="text"
                          {...register(`${fieldName}.production_date`)}
                        />
                      
                      </div>
                      
                      <div className="artist-form-field">
                      <label>
                      Awards:</label>
                        <input
                          type="text"
                          {...register(`${fieldName}.awards`)}
                        />
                      
                      </div>

                      <button type="button" onClick={removeFriend(index)}>
                        Remove
                      </button>
                    </fieldset>
                  </div>
                );
              })}
              
              <div className="add-song">
              
                <button type="button" onClick={addFriend}>
                  Add Song
                </button>
                <hr/>
              </div>

              <div className="action-button">
                <button type="submit">submit</button>
                <button onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default ArtistSection;
