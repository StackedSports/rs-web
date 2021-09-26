import styled from "styled-components";
import { FaSlidersH } from "react-icons/fa";

export const ChatContainer = styled.div`
  background: white;
  width: 100%;
  margin-top: 70px;
  border-radius: 10px;
  border-left: 6px solid rgb(233, 234, 239);

  border-top: 6px solid rgb(233, 234, 239);
`;
export const MessageStat = styled.div`
  background: white;
  width: 100%;
  margin-top: 77px;

  border-left: 1px solid rgb(117, 117, 117);
`;

export const DarkContainer = styled.div`
  margin-left: 270px;
  background: rgb(233, 234, 239);
  margin-top: 70px;
  height: 100%;
  @media screen and (max-width: 1000px) {
    margin-left: 0px;
  }
`;

export const FilterField = styled.div`
  border-width: 1px;
  border-style: solid;
  border-color: #d8d8d8;
  // padding: 5px;
  padding-left: 1rem;
  padding-right: 1rem;
  height: 40px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem;
  width: 130px;
  background: ${({ filterOpen }) => (filterOpen ? "#1DA1F2" : "white")};
`;

export const FilterIcon = styled(FaSlidersH)`
  color: ${({ filterOpen }) => (filterOpen ? "white" : "#222222")};
`;
