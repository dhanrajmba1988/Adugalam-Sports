import React, { useEffect, useState } from "react";
import "./VendorRequest.css";

const VendorRequest = () => {
  const [requests, setRequests] = useState([]);

  /* -------- Fetch Vendor Requests -------- */
  const fetchRequests = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/vendors/requests"
      );
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error("Failed to load requests", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  /* -------- Approve -------- */
  const handleApprove = async (id) => {
    try {
      await fetch(
        `http://localhost:5000/api/vendors/approve/${id}`,
        { method: "PUT" }
      );
      fetchRequests();
    } catch (err) {
      console.error("Approve failed", err);
    }
  };

  /* -------- Reject -------- */
  const handleReject = async (id) => {
    try {
      await fetch(
        `http://localhost:5000/api/vendors/reject/${id}`,
        { method: "PUT" }
      );
      fetchRequests();
    } catch (err) {
      console.error("Reject failed", err);
    }
  };

  return (
    <div className="vendor-request-page">
      <h2>Vendor Requests</h2>

      <table className="vendor-table">
        <thead>
          <tr>
            <th>Vendor ID</th>
            <th>Venue</th>
            <th>Owner</th>
            <th>Phone</th>
            <th>District</th>
            <th>Total Turf</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((v) => (
            <tr key={v._id}>
              <td className="vendor-id">
                {v.vendorId || v._id.slice(-6)}
              </td>

              <td>{v.venuename}</td>
              <td>{v.ownername}</td>
              <td>{v.phone}</td>
              <td>{v.location}</td>
              <td>{v.totalturf}</td>

              <td className={`status-${v.status?.toLowerCase()}`}>
                {v.status}
              </td>

              <td>
                {v.status === "Pending" && (
                  <>
                    <button
                      className="approve-btn"
                      onClick={() => handleApprove(v._id)}
                    >
                      Approve
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() => handleReject(v._id)}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}

          {requests.length === 0 && (
            <tr>
              <td colSpan="8">No vendor requests found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VendorRequest;
