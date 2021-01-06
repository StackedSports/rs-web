import styled from "styled-components";
import FilterListIcon from "@material-ui/icons/FilterList";

export const DashboardContainer = styled.div`
  margin-left: 270px;
  background: rgb(233, 234, 239);
  margin-top: 70px;
  height: 100%;
  @media screen and (max-width: 1000px) {
    margin-left: 0px;
  }
`;

export const Title = styled.div`
  margin: 2rem;
  margin-left: 1rem;
`;

export const Titleheading = styled.h1`
  color: #222222;
  font-size: 26px;
  font-family: ProximaNovaBold;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 31px;
`;

export const Titleparagrapg = styled.p`
  color: #222222;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 19px;
`;

export const TableSection = styled.div`
  margin: 2rem;
  margin-left: 1rem;
  background: white;
  padding: 1rem;
  border-radius: 5px;
  height: 330px;

  @media screen and (max-width: 1000px) {
    height: auto;
  }
`;

export const TableHeaderCol1Heading = styled.h1`
  color: #222222;
  font-family: ProximaNovaBold;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: -0.1px;
  line-height: 22px;
`;

export const TableHeaderCol2P = styled.p`
  color: #000000;
  font-family: ProximaNovaBold;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 16px;
`;

export const TableHeaderRight = styled.div`
  display: flex;
`;

export const DateField = styled.div`
  border-width: 1px;
  border-style: solid;
  border-color: #d8d8d8;
  display: flex;
  padding: 5px;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 130px;
  height: 30px;
  border-radius: 5px;
  margin: 1rem;
  align-items: center;

  @media screen and (max-width: 1000px) {
    padding-left: 0rem;
    margin-left: 0px;
  }
`;

export const FilterField = styled.div`
  border-width: 1px;
  border-style: solid;
  border-color: #d8d8d8;
  padding: 5px;
  padding-left: 1rem;
  padding-right: 1rem;
  height: 30px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem;
  width: 130px;
`;

export const FilterIcon = styled(FilterListIcon)``;

export const FilterText = styled.p`
  font-size: 14px;
  font-family: ProximaNovaBold;
`;

export const TableFooter = styled.div`
  display: flex;
  justify-content: center;
`;

export const TableFooterText = styled.h1`
  color: #3871da;
  font-family: ProximaNovaBold;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 19px;
  cursor: pointer;
`;

export const ChartSection = styled.div`
  margin: 2rem;
  margin-left: 1rem;
`;

export const ChartDiv = styled.div`
  border-radius: 5px;
  background: white;
`;
export const ChartDiv2 = styled.div`
  border-radius: 5px;
  background: white;

  /* margin-left: 1rem; */
`;

export const ChartTop = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;
export const ChartTop2 = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

export const MM = styled.div``;
export const MM2 = styled.div``;
export const MMH = styled.h2`
  color: #222222;
  font-size: 18px;
  font-family: ProximaNovaBold;
  font-weight: bold;
  letter-spacing: -0.1px;
  line-height: 22px;
`;
export const MMH2 = styled.h2`
  color: #222222;
  font-size: 18px;
  font-family: ProximaNovaBold;
  font-weight: bold;
  letter-spacing: -0.1px;
  line-height: 22px;
`;

export const MonthField = styled.div`
  border-width: 1px;
  border-style: solid;
  border-color: #d8d8d8;
  width: 130px;
  height: 30px;
  border-radius: 5px;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  width: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const MonthField2 = styled.div`
  border-width: 1px;
  border-style: solid;
  border-color: #d8d8d8;
  width: 130px;
  height: 30px;
  border-radius: 5px;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  width: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Count = styled.h1`
  color: #222222;
  font-family: ProximaNovaRegular;
  font-size: 25px;
  font-weight: bold;
  margin: 0;
  padding: 0;
`;

export const ChartFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding: 1rem;
`;

export const ChartFooterButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: 40.8px;
  width: 116.8px;
  border: 0.8px solid #e1e1e1;
  border-radius: 4px;
`;

export const ChartFooterContent = styled.div`
  display: flex;
  justify-content: center;
  height: 14px;
  width: 90px;
  color: #222222;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 14px;
`;

export const ChartFooterButton2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: 40.8px;
  width: 112px;
  border: 0.8px solid #e1e1e1;
  border-radius: 4px;
`;

export const ChartFooterButton3 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: 40.8px;
  width: 87px;
  border: 0.8px solid #e1e1e1;
  border-radius: 4px;
`;

export const ChartDivS = styled.div`
  display: flex;
  justify-content: center;
`;
