import React, { useRef } from "react";
import styled from "styled-components";
import { buildGPX, GarminBuilder } from "gpx-builder";
import { Waypoint as IWaypoint } from "../App";
import { Waypoint } from "./Waypoint";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #4a4a4a;
  padding: 15px;
  box-sizing: border-box;
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
  height: 100%;
  overflow-y: auto;
`;

const NoWaypointsMessage = styled.div`
  font-weight: 600;
  color: #f0f0f0;
`;

const DownloadSection = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DownloadButton = styled.button`
  background-color: #b8de50;
  width: 100%;
  height: 50px;
  border-radius: 8px;
  border-width: 0;
  color: #4a4a4a;
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  :hover {
    background-color: #a4cc35;
  }
  :disabled {
    background-color: #7a7a7a;
    cursor: not-allowed;
  }
  :active {
    background-color: #7b9928;
  }
`;

interface RouteBuilderProps {
  waypoints: IWaypoint[];
  onDeleteMarkerClicked: (index: number) => void;
  onSwapWaypoints: (indexA: number, indexB: number) => void;
}

export function RouteBuilder({
  waypoints,
  onDeleteMarkerClicked,
  onSwapWaypoints,
}: RouteBuilderProps) {
  const draggingItemIndexRef = useRef<number>();
  const targetItemIndexRef = useRef<number>();

  const handleDragStarted = (index: number) => {
    draggingItemIndexRef.current = index;
  };

  const handleDragEntered = (index: number) => {
    targetItemIndexRef.current = index;

    if (draggingItemIndexRef.current !== undefined) {
      onSwapWaypoints(draggingItemIndexRef.current, targetItemIndexRef.current);
      draggingItemIndexRef.current = targetItemIndexRef.current;
      targetItemIndexRef.current = undefined;
    }
  };

  const handleDownloadButtonClicked = () => {
    const { Point } = GarminBuilder.MODELS;

    const points = waypoints.map(
      (waypoint) => new Point(waypoint.lat, waypoint.lng)
    );

    const gpxData = new GarminBuilder();

    gpxData.setSegmentPoints(points);

    const blob = new Blob([buildGPX(gpxData.toObject())], { type: "text/gpx" });
    const url = URL.createObjectURL(blob);

    const tempLink = document.createElement("a");
    tempLink.href = url;
    tempLink.download = "route.gpx";
    tempLink.click();
  };

  return (
    <Wrapper>
      <TitleSection>Route Builder</TitleSection>
      <WaypointsWrapper>
        {waypoints.length ? (
          waypoints.map((waypoint, index) => (
            <Waypoint
              onDeleteMarkerClicked={onDeleteMarkerClicked}
              onDragEnter={handleDragEntered}
              onDragStart={handleDragStarted}
              key={index}
              waypoint={waypoint}
              index={index}
            />
          ))
        ) : (
          <NoWaypointsMessage>
            Click on the Map to create your first Waypoint.
          </NoWaypointsMessage>
        )}
      </WaypointsWrapper>
      <DownloadSection>
        <DownloadButton
          disabled={waypoints.length === 0}
          onClick={handleDownloadButtonClicked}
        >
          Download your Route
        </DownloadButton>
      </DownloadSection>
    </Wrapper>
  );
}
