import { useState } from "react";
import { IconContext } from "react-icons";
import styled from "styled-components";
import L from "leaflet";
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

  const handleMapClicked = ({ lat, lng }: { lat: number; lng: number }) => {
    setWaypoints((prevWaypoints) => [...prevWaypoints, { lat, lng }]);
  };

  const handleDeleteMarker = (index: number) => {
    setWaypoints(waypoints.filter((_, i) => i !== index));
  };

  const coordinates = waypoints.map((waypoint) =>
    L.latLng(waypoint.lat, waypoint.lng)
  );

  const polylines = [L.polyline(coordinates, { color: "#055ff0" })];

  const markers = waypoints.map((waypoint, i) =>
    L.marker(L.latLng(waypoint.lat, waypoint.lng), {
      icon: L.divIcon({
        className: "map-marker",
        html: `<span>${i + 1}</span>`,
      }),
    })
  );

  return (
    <IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
      <StyledApp>
        <StyledSidebar>
          <RouteBuilder
            markers={markers}
            onDeleteMarkerClicked={handleDeleteMarker}
          />
        </StyledSidebar>

        <StyledContent>
          <Map
            initialGeolocation={initialGeolocation}
            markers={markers}
            polylines={polylines}
            onMapClicked={handleMapClicked}
          />
        </StyledContent>
      </StyledApp>
    </IconContext.Provider>
  );
}

export default App;
