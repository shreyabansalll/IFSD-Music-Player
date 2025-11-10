import React, { useEffect, useState } from "react";
import api from "../services/api";
import axios from "axios";

const genreGradients = {
  Pop: "linear-gradient(135deg, #ff758c, #ff7eb3)",
  Rock: "linear-gradient(135deg, #28313B, #485461)",
  Jazz: "linear-gradient(135deg, #4facfe, #00f2fe)",
  Melancholic: "linear-gradient(135deg, #355C7D, #6C5B7B, #C06C84)",
  Energetic: "linear-gradient(135deg, #F7971E, #FFD200)",
  Romantic: "linear-gradient(135deg, #e96443, #904e95)",
};

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/api/songs");
        setSongs(data);
      } catch (err) {
        console.error("Error fetching songs:", err);
      }
    };
    fetchSongs();
  }, []);

  const backgroundStyle = {
    minHeight: "100vh",
    background: currentSong
      ? genreGradients[currentSong.genre] ||
        "linear-gradient(135deg, #667eea, #764ba2)"
      : "linear-gradient(135deg, #667eea, #764ba2)",
    transition: "background 0.8s ease-in-out",
  };

  return (
    <div style={backgroundStyle} className="text-center text-light p-5">
      <h1 className="mb-4">🎧 Mood-Based Music Player</h1>

      <div className="d-flex flex-wrap justify-content-center">
        {songs.map((song) => (
          <div
            key={song._id}
            className="card bg-dark text-light m-3 p-3 shadow"
            style={{ width: "18rem", cursor: "pointer" }}
            onClick={() => setCurrentSong(song)}
          >
            <h4>{song.title}</h4>
            <p>{song.artist}</p>
            <p>
              <em>{song.genre}</em>
            </p>
          </div>
        ))}
      </div>

      {currentSong && (
        <div className="mt-5">
          <h3>Now Playing: {currentSong.title}</h3>
          <audio controls autoPlay className="mt-3" src={currentSong.url}>
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default Home;
