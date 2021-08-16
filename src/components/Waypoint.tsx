import React from "react";
import styled from "styled-components";
import { FaTrash } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Waypoint as IWaypoint } from "../App";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  font-weight: 600;
  cursor: move;
`;

const LeftIcon = styled.div`
  color: #7a7a7a;
  margin-right: 5px;
`;

const Label = styled.div`
  color: #f0f0f0;
`;

const RightIcon = styled.div`
  color: #7a7a7a;
  margin-left: auto;
  cursor: pointer;
`;

interface WaypointProps {
  waypoint: IWaypoint;
  index: number;
  onDeleteMarkerClicked: (index: number) => void;
  onDragStart: (index: number) => void;
  onDragEnter: (index: number) => void;
}

export function Waypoint({
  waypoint,
  index,
  onDeleteMarkerClicked,
  onDragStart,
  onDragEnter,
}: WaypointProps) {
  return (
    <>
      <Wrapper
        draggable
        onDragStart={() => onDragStart(index)}
        onDragEnter={() => onDragEnter(index)}
        onDragOver={(e) => e.preventDefault()}
      >
        <LeftIcon>
          <GiHamburgerMenu size={20} />
        </LeftIcon>
        <Label>{waypoint.label || `Waypoint ${index + 1}`}</Label>
        <RightIcon>
          <FaTrash size={20} onClick={() => onDeleteMarkerClicked(index)} />
        </RightIcon>
      </Wrapper>
    </>
  );
}
