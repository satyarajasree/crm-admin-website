import React, { useState } from "react";
import "../pages/PlotLayout.css";
import Swal from "sweetalert2";

const PlotLayout = () => {
  // Temporary plots with phases added
  const plots = [
    {
      id: 5,
      number: "2A",
      status: "available",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "sold",
      direction: "South",
      phase: "Phase 1",
    },

    {
      id: 5,
      number: "2A",
      status: "available",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "sold",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "available",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "sold",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "available",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "sold",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "available",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "sold",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "available",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "sold",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "available",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "sold",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "available",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "sold",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "available",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "sold",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "available",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "sold",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "available",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "sold",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "available",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "sold",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "available",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "sold",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "available",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "sold",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "available",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "sold",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "available",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "sold",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "available",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "sold",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "available",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "sold",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "available",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "sold",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "available",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "sold",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "available",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "sold",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "available",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "sold",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "available",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "sold",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "available",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "sold",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "available",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "sold",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "available",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "sold",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "available",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "sold",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "available",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "sold",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "available",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "sold",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "available",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "sold",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "3A",
      status: "available",
      direction: "North",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "sold",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "available",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "sold",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "available",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "sold",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "available",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "sold",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "available",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "3A",
      status: "available",
      direction: "North",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "available",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "sold",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "available",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "sold",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "available",
      direction: "South",
      phase: "Phase 1",
    },
    {
      id: 5,
      number: "2A",
      status: "available",
      direction: "South",
      phase: "Phase 2",
    },
    {
      id: 5,
      number: "2A",
      status: "sold",
      direction: "South",
      phase: "Phase 2",
    },
    {
      id: 5,
      number: "3A",
      status: "available",
      direction: "South",
      phase: "Phase 3",
    },
    {
      id: 5,
      number: "3A",
      status: "sold",
      direction: "South",
      phase: "Phase 3",
    },
    {
      id: 5,
      number: "4A",
      status: "available",
      direction: "South",
      phase: "Phase 4",
    },
    {
      id: 5,
      number: "4B",
      status: "sold",
      direction: "South",
      phase: "Phase 4",
    },
  ];

  // Temporary prices based on direction
  const directionPricing = {
    North: 500000,
    East: 600000,
    West: 450000,
    South: 400000,
  };

  const [selectedPhase, setSelectedPhase] = useState("Phase 1");
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handlePlotSelection = (plot) => {
    if (plot.status === "sold") return;
    setSelectedPlot(plot);
  };

  const handleBooking = () => {
    if (!termsAccepted) {
      alert("Please accept the terms and conditions to proceed.");
      return;
    }

    // Send booking request to admin
    console.log("Booking details:", selectedPlot);
    Swal.fire({
      icon: "success",
      title: "Booking request sent to admin!",
      text: "Admin will discuss for more details",
      confirmButtonText: "OK",
    })
  };

  // Filter plots by selected phase
  const filteredPlots = plots.filter((plot) => plot.phase === selectedPhase);

  return (
    <div>
      <div className="plot_layout">
        <div className="phase-selection">
          <label htmlFor="phase">Select Phase </label>
          <select
            id="phase"
            value={selectedPhase}
            onChange={(e) => setSelectedPhase(e.target.value)}
          >
            <option value="Phase 1">Phase 1</option>
            <option value="Phase 2">Phase 2</option>
            <option value="Phase 3">Phase 3</option>
            <option value="Phase 4">Phase 4</option>
          </select>
        </div>

        <div className="plot-grid">
          {filteredPlots.map((plot) => (
            <div
              key={plot.id}
              className={`plot ${plot.status}`}
              onClick={() => handlePlotSelection(plot)}
              style={{
                backgroundColor: plot.status === "available" ? "green" : "red",
              }}
            >
              {plot.number}
            </div>
          ))}
        </div>
      </div>
      {selectedPlot && (
        <div className="plot_text">
          <h4>Plot Details</h4>
          <p className="pg_text">Plot Number: {selectedPlot.number}</p>
          <p className="pg_text">Direction: {selectedPlot.direction}</p>
          <p className="pg_text">Total Price: ₹{directionPricing[selectedPlot.direction]}</p>

          <label>
            <input
              type="checkbox"
              checked={termsAccepted}
              className="check_box"
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            I agree to the terms and conditions
          </label>

          <button
            onClick={handleBooking}
            style={{
              backgroundColor: termsAccepted ? "green" : "gray",
              color: "white",
            }}
            disabled={!termsAccepted}
            className="book_now_button"
          >
            Book Now
          </button>
        </div>
      )}
    </div>
  );
};

export default PlotLayout;
