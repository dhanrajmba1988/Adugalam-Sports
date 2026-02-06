import React, { useEffect, useState } from "react";
import "./Book.css";
import GroundFacilities from "./Facilities";
import Gallery from "./Gallery";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const GroundDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const turfId = searchParams.get("turf_id");
  const game = searchParams.get("game");

  const [turf, setTurf] = useState(null);

  useEffect(() => {
    if (turfId) {
      axios
        .get(`http://127.0.0.1:8000/api/turfs/${turfId}/`)
        .then((res) => setTurf(res.data))
        .catch((err) => console.error(err));
    }
  }, [turfId]);

  if (!turf) return <p style={{ padding: 20 }}>Loading...</p>;

  return (
    <div className="ground-pagee">
      {/* TOP BAR */}
      <div className="gp-headerr">
        <button className="back-btnn" onClick={() => navigate(-1)}>
          &lt;
        </button>
      </div>

      {/* IMAGE SECTION */}
      <div className="gp-image-wrapperr">
        <img
          src={turf.image}
          alt={turf.name}
          className="gp-imagee"
        />
        <div className="gp-image-overlayy">
          <span className="gp-image-counterr">1/3</span>
          <span className="gp-pricee">
            ₹{turf.price || 0}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="gp-contentt">
        <div>
          <span className="gp-tagg">
            {game ? game : "Ground"}
          </span>

          <div
            className="gp-location-ratingg"
            style={{ marginTop: 30 }}
          >
            <span className="gp-location-dott">
              <FaLocationDot size={18} />
            </span>
            <span className="gp-location-textt">
              {turf.location}
            </span>
            <span className="gp-starr">⭐</span>
            <span className="gp-ratingg">
              {turf.rating || 4.2}
            </span>
          </div>
        </div>

        <h2 className="gp-titlee">{turf.name}</h2>

        <div className="gp-sectionn">
          <h3 className="gp-section-titlee">Description</h3>
          <p className="gp-descriptionn">
            {turf.description ||
              "Best ground available for sports booking."}
          </p>
        </div>
      </div>

      <GroundFacilities />
      <Gallery />

      {/* FOOTER */}
      <div className="gp-footerrr">
        <a
          href="./BookingGround"
          className="gp-buy-btnnm"
          style={{ display: "block", textAlign: "center" }}
        >
          Book now
        </a>
      </div>
    </div>
  );
};

export default GroundDetails;
