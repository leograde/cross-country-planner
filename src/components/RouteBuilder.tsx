import styled from "styled-components";
import { Waypoint } from "./Waypoint";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #4a4a4a;
  padding: 15px;
  box-sizing: border-box;
  overflow-y: auto;
`;

const TitleSection = styled.div`
  font-size: 24px;
  font-weight: 700;
  padding-bottom: 15px;
  color: #f0f0f0;
  border-bottom: 3px solid #5e5e5e;
`;

const WaypointsWrapper = styled.div`
  margin-top: 40px;
`;

const NoWaypointsMessage = styled.div`
  font-weight: 600;
  color: #f0f0f0;
`;

interface RouteBuilderProps {
  markers: L.Marker[];
  onDeleteMarkerClicked: (index: number) => void;
}

export function RouteBuilder({
  markers,
  onDeleteMarkerClicked,
}: RouteBuilderProps) {
  return (
    <Wrapper>
      <TitleSection>Route Builder</TitleSection>
      <WaypointsWrapper>
        {markers.length ? (
          markers.map((marker, index) => (
            <Waypoint
              onDeleteMarkerClicked={onDeleteMarkerClicked}
              key={index}
              marker={marker}
              index={index}
            />
          ))
        ) : (
          <NoWaypointsMessage>
            Click on the Map to create your first Waypoint.
          </NoWaypointsMessage>
        )}
      </WaypointsWrapper>
    </Wrapper>
  );
}
