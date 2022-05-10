
import { useState } from 'react';
import axios from 'axios';

import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, Divider, Typography } from '@material-ui/core';
import { Stack } from '@mui/material';
import Button from 'UI/Widgets/Buttons/Button';
import Collapse from '@mui/material/Collapse';

import SearchBar from 'UI/Widgets/SearchBar';
import TweetPage from './TweetPage';

const TweetRankingPage = (props) => {

  const [input, setInput] = useState('')
  const [tweet, setTweet] = useState({})
  const [openTweet, setOpenTweet] = useState(false)

  const onTopActionClick = () => {
    console.log("onTopActionClick")
  }

  const onTweetSearch = async () => {
    console.log("onTweetSearch")
    console.log(input)
    setOpenTweet(!openTweet)
    // let response = await axios.get(input)

    // console.log(response)
    // setTweet(response.data)
  }

  const onClear = () => {
    console.log("onClear")
    setInput("")
  }

  const onAddAnotherTweet = () => {
    console.log("onAddAnotherTweet")

  }

  const onSaveTweet = () => {
    console.log("onSaveTweet")

  }

  console.log(input)

  return (
    <TweetPage
      title="Post Deep Dive"
      topActionName="+ New Search"
      onTopActionClick={onTopActionClick}
    >
      <Stack spacing={3}>

        <Stack spacing={3}>
          <Divider />

          <SearchBar
            style={{
              width: "100%",
              // border: '1px solid #ddd'
            }}
            searchOnChange
            onClear={onClear}
            cursorClearIcon="pointer"
            placeholder="Search Tweet"
            onSearch={(value) => setInput(value)}
          />
          <Button
            variant="contained"
            name="Analyze Tweet"
            onClick={onTweetSearch}
            style={{
              alignSelf: "end",
              width: "max-content",
            }}
          // startIcon={}
          />

          {!openTweet && <Divider />}
        </Stack>

        <Button
          name="+ Add Another"
          onClick={onAddAnotherTweet}
          style={{
            alignSelf: "end",
            width: "max-content",
          }}
        />

        <Collapse
          in={openTweet}
          style={{
            border: '1px solid #ddd'
          }}>

          <Stack ml={10} direction="row">

            <Stack
              sx={{
                borderLeft: "1px solid #ddd",
                borderRight: "1px solid #ddd",
              }}
              p={5}
              flex={1}
              spacing={4}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography
                  variant="subtitle1"
                  style={{ textAlign: "center" }}
                >
                  Tweet Details
                </Typography>

                <Button
                  variant="contained"
                  name="+ Save"
                  onClick={onSaveTweet}
                  style={{
                    width: "max-content",
                  }}
                />
              </Stack>
              {/* 
              <Stack sx={{ maxWidth: 345 }}>
                <Stack direction="row" spacing={2}>
                  <Avatar sx={{ width: "76px" }} aria-label="recipe">
                    R
                  </Avatar>
                  <Stack>
                    <Typography variant="body2" color="text.secondary">
                      Geaorgia Football
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      @GeorgiaFootball
                    </Typography>
                  </Stack>

                </Stack>

                <Stack>

                </Stack>

                <Stack>
                  <Typography variant="body2" color="text.secondary">
                    Lorem
                  </Typography>
                </Stack>
              </Stack> */}

            </Stack>

            <Box
              flex={.5}
              sx={{
                display: "grid",
                gridGap: "20px",
                alignItems: "center",
                justifyItems: "center",
                gridTemplateRows: "1fr 2fr 1fr",
              }}
            >
              <Box sx={{ width: "100%" }}>
                <Typography
                  variant="subtitle1"
                  style={{ width: "100%", textAlign: "center" }}
                >
                  Contact Engagment Stats
                </Typography>
                <Divider />
              </Box>

              <Stack spacing={3}>
                <Box>
                  <Typography
                    variant="h6"
                    style={{ width: "100%", textAlign: "center" }}
                  >
                    35%
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    style={{ width: "100%", textAlign: "center" }}
                  >
                    Retweet Rate (10/86)
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    style={{ width: "100%", textAlign: "center" }}
                  >
                    8%
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    style={{ width: "100%", textAlign: "center" }}
                  >
                    Quote Tweet Rate (1/7)
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    style={{ width: "100%", textAlign: "center" }}
                  >
                    84%
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    style={{ width: "100%", textAlign: "center" }}
                  >
                    Likes Rate (598/746)
                  </Typography>
                </Box>
              </Stack>

              <Box sx={{ width: "100%" }}>
                <Divider />
                <Typography
                  variant="subtitle1"
                  style={{ width: "100%", textAlign: "center" }}
                >
                  Board Engagment Status
                </Typography>
                <Divider />
              </Box>

            </Box>
          </Stack>

        </Collapse>

      </Stack >
    </TweetPage >
  )
}

export default TweetRankingPage;