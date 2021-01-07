import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import styled from "styled-components";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
const useStyles = makeStyles((theme) => ({
  modal: {},
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    position: "fixed",
    top: 300,
    right: 550,

    borderRadius: 5,
    [theme.breakpoints.down("sm")]: {
      top: 100,
      right: 50,
    },
  },
}));

const Container = styled.div`
  display: flex;
  @media screen and (max-width: 1000px) {
    display: block;
  }
`;

const ListCol = styled.div`
  margin-right: 3rem;
  @media screen and (max-width: 1000px) {
    margin-top: 1rem;
  }
`;

const ListTopContainer = styled.div``;

const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Heading = styled.p`
  color: #222222;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 17px;
`;

const Heading2 = styled.p`
  color: #222222;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 17px;
  margin: 0;
  padding: 0;
`;

const Option = styled.p`
  color: #222222;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 17px;
  cursor: pointer;
`;

export default function TransitionsModal({ filterOpen, setFilterOpen }) {
  const classes = useStyles();

  const handleClose = () => {
    setFilterOpen(false);
  };

  return (
    <div>
      <Modal
        disableEnforceFocus
        disableAutoFocus
        open={filterOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={filterOpen}>
          <div className={classes.paper}>
            <Container>
              <ListCol>
                <Heading>Message Type</Heading>
                <HeadingContainer>
                  <CheckCircleIcon
                    fontSize='inherit'
                    style={{ color: "#006644", marginRight: 5 }}
                  />
                  <ListCol>
                    <Heading2>All types</Heading2>
                    <Option>Personal Text</Option>
                    <Option>Twitter DM’s</Option>
                    <Option>Tweets</Option>
                  </ListCol>
                </HeadingContainer>
              </ListCol>

              <ListCol>
                <Heading>Sender</Heading>
                <HeadingContainer>
                  <CheckCircleIcon
                    fontSize='inherit'
                    style={{ color: "#006644", marginRight: 5 }}
                  />
                  <ListCol>
                    <Heading2>All Team Members</Heading2>
                    <Option>Personal Text</Option>
                    <Option>Twitter DM’s</Option>
                    <Option>Tweets</Option>
                  </ListCol>
                </HeadingContainer>
              </ListCol>

              <ListCol>
                <Heading>Message Status</Heading>
                <HeadingContainer>
                  <CheckCircleIcon
                    fontSize='inherit'
                    style={{ color: "#006644", marginRight: 5 }}
                  />
                  <ListCol>
                    <Heading2>All status (Excluding Draft)</Heading2>
                    <Option>Personal Text</Option>
                    <Option>Twitter DM’s</Option>
                    <Option>Tweets</Option>
                  </ListCol>
                </HeadingContainer>
              </ListCol>
            </Container>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
