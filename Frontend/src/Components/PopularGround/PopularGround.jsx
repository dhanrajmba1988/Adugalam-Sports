import React, { useEffect, useState } from "react";
import "./PopularGround.css";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PopularGround = () => {
  const navigate = useNavigate();
  const [turfs, setTurfs] = useState([]);
  const [viewAll, setViewAll] = useState(false);

  const gameIcons = {
    football: "⚽",
    cricket: "🏏",
    badminton: "🏸",
    tennis: "🎾",
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/turfs/")
      .then((res) => setTurfs(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="pg-section1">
      <div className="pg-header1">
        <h3>Popular ground</h3>
        <span
          className="view-all1"
          onClick={() => setViewAll(!viewAll)}
        >
          {viewAll ? "Show less" : "View all"}
        </span>
      </div>

      <div className={`pg-container1 ${viewAll ? "grid-view1" : ""}`}>
        {turfs.map((turf) => (
          <div
            className="turf-card"
            key={turf.id}
            onClick={() => navigate(`/book?turf_id=${turf.id}`)}
          >
            <img src={turf.image} alt={turf.name} />

            <h4>{turf.name}</h4>

            <div className="loc1">
              <FaMapMarkerAlt size={12} /> {turf.location}
            </div>

            <div className="icons1">
              {Object.keys(gameIcons).map((game) => (
                <span
                  key={game}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/book?turf_id=${turf.id}&game=${game}`);
                  }}
                >
                  {gameIcons[game]}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularGround;
