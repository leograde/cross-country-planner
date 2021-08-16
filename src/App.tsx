import React, { useState } from "react";
import { IconContext } from "react-icons";
import styled from "styled-components";
import { Map, RouteBuilder } from "./components";

const StyledApp = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const StyledSidebar = styled.div`
  width: 500px;
  height: 100%;
`;

const StyledContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: blue;
`;

export interface Waypoint {
  label?: string;
  lat: number;
  lng: number;
}

const initialGeolocation = {
  lat: 13.836687559660044,
  lng: 46.37799438996954,
};

function App() {
  const [waypoints, setWaypoints] = useState<Waypoint[]>([]);

  const handleSwapWaypoints = (indexA: number, indexB: number) => {
    const waypointsCopy = [...waypoints];
    const waypointA = waypointsCopy[indexA];
    waypointsCopy.splice(indexA, 1);
    waypointsCopy.splice(indexB, 0, waypointA);

    setWaypoints(waypointsCopy);
  };

  const handleMapClicked = (waypoint: Waypoint) => {
    setWaypoints((prevWaypoints) => [...prevWaypoints, waypoint]);
  };

  const handleDeleteMarker = (index: number) => {
    setWaypoints(waypoints.filter((_, i) => i !== index));
  };

  return (
    <IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
      <StyledApp>
        <StyledSidebar>
          <RouteBuilder
            waypoints={waypoints}
            onSwapWaypoints={handleSwapWaypoints}
            onDeleteMarkerClicked={handleDeleteMarker}
          />
        </StyledSidebar>

        <StyledContent>
          <Map
            initialGeolocation={initialGeolocation}
            waypoints={waypoints}
            onMapClicked={handleMapClicked}
          />
        </StyledContent>
      </StyledApp>
    </IconContext.Provider>
  );
}

export default App;
