import React from "react";
import Image from "images/login.png";
import { Stack } from "@mui/material";
import { Typography } from "@material-ui/core";
import TwitterIcon from '@mui/icons-material/Twitter';
import Button from "UI/Widgets/Buttons/Button";

export default function Signup() {

  const onSignInWithTwitter = () => {
    console.log("onSignInWithTwitter")
  }

  return (
    <Stack flex={1}
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${Image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        direction="row"
        flexWrap="nowrap"
        sx={{
          width: "700px",
          height: "590px",
        }}
      >
        <Stack flex={2}
          sx={{
            borderRadius: "47px 0 0 47px",
            backgroundColor: "#fff",
          }}
          spacing={5}
          justifyContent="center"
          alignItems="center"
        >
          <Typography align="center" component="h2" variant="h3" >
            Sign in to your account
          </Typography>
          <Typography style={{ color: '#ccc', fontWeight: 500 }} component="span" >
            Complete login details to continue
          </Typography>

          <Button /* twitter */
            sx={{
              width: "378px",
              padding: "10px 20px",
              border: "#dadada solid 1px",
              borderRadius: "5px",
              justifyContent: "space-between",
              color: "#000"
            }}
            onClick={onSignInWithTwitter}
            name="Sign in with Twitter"
            endIcon={<TwitterIcon style={{ fontSize: 30, color: "#00acee", }} />}
          />

          <Typography style={{ color: '#ccc', marginTop: "20px", fontWeight: 500 }} component="span" >
            Or
          </Typography>

          {/* form */}

        </Stack >

        <Stack flex={1}
          sx={{
            borderRadius: "0 47px 47px 0",
            backgroundColor: "#373D4A",
          }}
        >

        </Stack >

      </Stack >

    </Stack >
  );
}