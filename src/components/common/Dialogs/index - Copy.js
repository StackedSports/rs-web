import React from "react";
import { IconButton, Button } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const DialogForm = ({
  title,
  open,
  message,
  applyForm,
  cancelForm,
  hideActions,
  backAction,
  skipAction,
  continueNext,
  PaperProps,
  maxWidth,
  scroll,
}) => {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={open}
        onClose={cancelForm}
        fullWidth={true}
        scroll={scroll || "body"}
        maxWidth={maxWidth || "sm"}
        // disableBackdropClick
        PaperProps={PaperProps || ""}
        PaperProps={{
          style: {
            borderRadius: 10,
            padding: 0,
          },
        }}
      >
        <>
          <DialogActions
            className={skipAction ? classes.buttonSkip : classes.buttonClose}
          >
            {/* {cancelForm && (
              <IconButton onClick={applyForm} aria-label="delete">
                <CloseIcon />
              </IconButton>
            )} */}
            {backAction && (
              <IconButton onClick={applyForm} aria-label="delete">
                <ArrowBackIcon />
              </IconButton>
            )}
            {skipAction && (
              <IconButton
                onClick={applyForm}
                aria-label="delete"
                className={classes.skipText}
              >
                Skip
              </IconButton>
            )}
            {continueNext && (
              <IconButton
                onClick={applyForm}
                aria-label="delete"
                className={classes.skipText}
              >
                Continue
              </IconButton>
            )}
          </DialogActions>
        </>
        <DialogTitle className={classes.title} id="form-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent className={classes.content}>
          <DialogContentText component={"div"}>{message}</DialogContentText>
        </DialogContent>
        {hideActions ? null : (
          <>
            <DialogActions>
              {applyForm && (
                <Button onClick={applyForm} color="primary" type="submit">
                  Save
                </Button>
              )}
              {cancelForm && (
                <Button onClick={cancelForm} color="secondary" type="submit">
                  Cancel
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default DialogForm;

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      textAlign: "center",
    },
    content: {
      padding: "1rem 2rem",
    },
    buttonClose: {
      position: "absolute",
    },
    buttonSkip: {
      position: "absolute",
      right: 0,
    },
    skipText: {
      fontWeight: 600,
      fontSize: "1rem",
    },
  })
);
