import styled from "styled-components";
import { FaTrash } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  font-weight: 600;
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
`;

interface WaypointProps {
  marker: L.Marker;
  index: number;
  onDeleteMarkerClicked: (index: number) => void;
}

export function Waypoint({
  marker,
  index,
  onDeleteMarkerClicked,
}: WaypointProps) {
  const markerLabel = marker.options.title;

  return (
    <Wrapper>
      <LeftIcon>
        <GiHamburgerMenu size={20} />
      </LeftIcon>
      <Label>{markerLabel || `Waypoint ${index + 1}`}</Label>
      <RightIcon>
        <FaTrash size={20} onClick={() => onDeleteMarkerClicked(index)} />
      </RightIcon>
    </Wrapper>
  );
}
