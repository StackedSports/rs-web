import React, { useState } from "react";
import { makeStyles, Grid, Checkbox, Snackbar, Badge } from "@material-ui/core";



import "emoji-mart/css/emoji-mart.css";

import { DarkContainer } from "../../../common/Elements/Elements";
import { Divider } from "@material-ui/core";
import MyStreams from "./MyStreams";
import Content from "../../Content/Content";
import MenuStream from "../MenuStream/Menu/MenuStream";
import Button from "@mui/material/Button/Button";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import FilterContent from "../../Content/Message/Filter/Search/FilterContent";
import MenuNewStream from "../MenuStream/Menu/MenuNewStream";
import KeywordRules from "../MenuStream/KeywordContent/KeywordRules";
import KeywordsInclude from "../MenuStream/KeywordContent/KeywordsInclude";
import { Stack } from "@mui/material";
import TweetTypes from "../MenuStream/TweetTypes/TweetTypes"
import MediaContent from "../MenuStream/TweetTypes/MediaContent"
import StreamName from "../MenuStream/Menu/StreamName";
import HashtagRules from "../MenuStream/HashtagContent/HashtagRules";
import HashtagContent from "../MenuStream/HashtagContent/HashtagContent";
import GeographyRules from "../MenuStream/GeographyContent/GeographyRules";
import GeographyContent from "../MenuStream/GeographyContent/GeographyContent";
import AccountContent from "../MenuStream/AccountContent/AccountContent";
import AccountRules from "../MenuStream/AccountContent/AccountRules";
import TagsMenu from "../../Content/Message/Setting/TagMenu";
import Sidebar from "../../../common/sidebar/sidebar"
//import useStyles from'../../../MessageCreate/index'
function MenuNewMessage(props) {
    const [showSideFilters, setshowSideFilters] = useState(true);
   
    
    const [menuStream, setMenuStream] = useState(false);
    const [mediaContent, setMediaContent] = useState(false);
    const [keyword, setKeyword] = useState(false);
    const [hashtagContent, setHashtagContent] = useState(false);
    const [geographyContent, setGeographyContent] = useState(false);
    const [accountContent, setAccountContent] = useState(false);
    const [keywordIncludes,setKeywordIncludes] = useState(false);
    const [searchCriteria, setSearchCriteria] = useState(false);
    const [filter, setFilter] = useState(true);
    const [streamName, setStreamName] = useState(false);
    const [tagMenu, setTagMenu] = useState(false);
    const [selectedItem,setSelecteditem]=React.useState([])
    const [keywordRules, setKeywordRules] = useState(false);
    const [geographyRules, setGeographyRules] = useState(false);
    const [hashtagRules, setHashtagRules] = useState(false);
    const [accountRules, setAccountRules] = useState(false);
    const [ setOpenSnackBar] = React.useState(false);
    const [tweetTypes, setTweetTypes] = useState(false)
    const [streamButton, setStreamButton] = useState(false);
    const [streamButtonColor, setStreamButtonColor] = useState(true);
    const [actionButton, setActionButton] = useState(false);
    const [hideGrid, setHideGrid] = useState(true);
    const [countkeywordrules,setCountKeywordRules]=React.useState(0)
    const [count,setCount]=React.useState(0)
    const [tweet,setTweet]=React.useState([])
    const [keywordAnd,setKeywordAnd]=React.useState([])
    function disableScroll() {
      window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
      window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
      window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
      window.addEventListener('keydown', preventDefaultForScrollKeys, false);
    }
    const border ={
      position: 'absolute',
      left: '50%',
      width: '2px',
      height: '100%',
      background: 'grey',
      right: '-9px'
  }
  const handleTweet=(tweet)=>{
    setTweet(tweet)
  }
  const handleKeywordAnd=(keyword)=>{
    setKeywordAnd(keyword)
  }
  const handleNewStreamGrid=()=>{
    setHideGrid(!hideGrid)
  }
  const handleTagMenu=(tag)=>{
    setTagMenu(tag)
  }
  const handleSelectedItem=(selectedItem)=>{
      setCount(count+1)
    setSelecteditem(selectedItem)
  }
  const handleKeyword=(keyword)=>{
    setKeyword(keyword)
  }
  const handleKeyowrdRules=(rules)=>{
    setKeywordRules(rules)
  }
  const handleGeographyRules=(geo)=>{
    setGeographyRules(geo)
  }
  const handlemenuStream=(rules)=>{
    setMenuStream(rules)
  }
 
  const handleSearchCriteria=(rules)=>{
    setSearchCriteria(rules)
  }
  const handleSideFilters=()=>{
    setshowSideFilters(!showSideFilters)
  }
  const handleFilter=()=>{
    setFilter(!filter)
  }
  const handleKeywordIncludes=(includes)=>{
    setKeywordIncludes(includes)
  }
  const handleMediaContent=(media)=>{
    setMediaContent(media)
  }
  const handleAccountRules=(account)=>{
    setAccountRules(account)
  }
  const handleAccountContent=(account)=>{
    setAccountContent(account)
  }
  const handleGeographyContent=(geo)=>{
    setGeographyContent(geo)
  }
  const handleHashtagContent=(hashtag)=>{
    setHashtagContent(hashtag)
  }
  const handleTweetTypes=(tweet)=>{
    setTweetTypes(tweet)
  }
  const handleHashtagRules=(hashtag)=>{
    setHashtagRules(hashtag)
  }
  const handleStreamButton=(button)=>{
    setStreamButton(button)
  }
  const handleStreamButtonColor=(color)=>{
    setStreamButtonColor(color)
  }
  const handleStreamName=(name)=>{
    setStreamName(name)
  }
  const handleActionButton=()=>{
    setActionButton(!actionButton)
  }
  
  const handleCountKeywordRules=(count)=>{
    setCountKeywordRules(count)
  }
    return (
        <div>
            <DarkContainer contacts style={{ padding: 1, marginLeft: 60,padding:showSideFilters?'10px':'20px' }}>
      
          
      <Grid container direction="row"
      
      >
        <Grid xs={showSideFilters?2:0} style={{display:showSideFilters?'block':'none'}}>
        
            
          <div style={{position:'sticky'}}>
            <p
              style={{
                // padding: 5,
                fontWeight: "bold",
                fontSize: 20,
                paddingBottom: 0,
                marginTop:'15px',
                marginLeft:'10px',
                marginBottom: 0,
                
              }}
            >
              Streams
        
            </p>
           <MyStreams/>
          </div>
        </Grid>
        <Grid  xs={showSideFilters?10:12} style={{backgroundColor:'white'}}
        onClick={(e) => {
         
          setKeyword(false)
          
         e.stopPropagation();
         
         }}
        
        >
          <Grid direction='column'
           
          
          >
            <Grid xs={12}>
              
        <MenuStream criteria={handleSearchCriteria} showNew={handleFilter}
         handleSideFilters={handleSideFilters} streambutton={streamButton}
         checkkeyword={keywordIncludes} checkTypes={mediaContent} 
         streamName={handleStreamName}
         menu={menuStream}
         seasonTicket={handlemenuStream}
         actionbutton={handleActionButton}
         button={actionButton}
         hidegrid={handleNewStreamGrid}
         streamButtonColor={streamButtonColor}
         setStreamButtonColor={handleStreamButtonColor}
      
         />
         
        
       </Grid>
       <Divider style={{marginLeft: '30px'}}/>
       <Grid container xs={12} 
      
       >
     
          
       { keywordIncludes &&      <Grid xs={3.1}>
                 <KeywordsInclude  handleKeywordIncludes={handleKeywordIncludes}
               keywordIncludes={keywordIncludes}
                  selectedItem={selectedItem}
                  count={count}
                  handleSelectedItem={handleSelectedItem}
                  tweet={tweet}
                  countkeywordrules={countkeywordrules}
                  keywordAnd={keywordAnd}
               
                 />
                </Grid>}
                {filter && mediaContent &&    <Grid xs={2.1}>
              <MediaContent mediaContent={handleMediaContent} />
              </Grid >}
              {filter && hashtagContent &&    <Grid xs={2.8}>
             <HashtagContent hashtagContent={handleHashtagContent} />
              </Grid>}
              {filter && geographyContent &&  <Grid xs={4.1}>
               <GeographyContent geographyContent={handleGeographyContent} /> 
              </Grid>    }
              {filter && accountContent && <Grid xs={3.1}>
              <AccountContent accountContent={handleAccountContent}/>
              </Grid>        }
          
              {filter && <Grid xs={3}>   <MenuNewStream xyz={handleKeyowrdRules} tweetTypes={keywordIncludes} 
           tweet={handleTweetTypes}   checkTypes={mediaContent} 
           streambutton={handleStreamButton}  hashtagRules={handleHashtagRules} hashtagContent={hashtagContent}
           geographyRules={handleGeographyRules} geographyContent={geographyContent} 
            hashtagContent={hashtagContent} accountRules={handleAccountRules} accountContent={accountContent}
           setKeyword={handleKeyword} keyword={keyword}
           countkeywordrules={countkeywordrules}
           
           />
           </Grid>
            }
          
             
             </Grid>
       <Divider style={{marginLeft: '30px'}}/>
      
                <div style={{height:hideGrid?'100%':'100%',position:'relative',overflowX:'hidden'}}>
               
       <Grid xs={12} >
         <Grid container direction='row' >
                
           <Grid xs={3} style={{height:'90vh',position:'sticky',top:0}}  >
           
       { searchCriteria &&     <FilterContent />
}    
             </Grid>
             
           
             <Grid xs={6} >
              {keywordRules && <KeywordRules xyz={handleKeyowrdRules} include={handleKeywordIncludes}
              handleSelectedItem={handleSelectedItem} selectedItem={selectedItem}
              handleCountKeywordRules={handleCountKeywordRules}
              keywordIncludes={keywordIncludes}
              handleTweet={handleTweet}
              handleKeywordAnd={handleKeywordAnd}

              />}
            {tweetTypes &&  <TweetTypes  media={handleMediaContent} types={handleTweetTypes}/>}
           
            {hashtagRules && <HashtagRules  hashtagContent={handleHashtagContent}  hashtagRules={handleHashtagRules} /> }
           {geographyRules && <GeographyRules geographyContent={handleGeographyContent} geographyRules={handleGeographyRules} /> }
            
            {accountRules &&   <AccountRules accountRules={handleAccountRules} accountContent={handleAccountContent}/> }
           {tagMenu &&  <TagsMenu  tagMenu={handleTagMenu}/>}
           
              <Content  tagMenu={handleTagMenu} message= {props.message} />
             
          {streamName &&    <StreamName streamName={handleStreamName}
          hideNew={handleFilter}
          streambutton={handleStreamButton}
          filterContent={handleSearchCriteria}
          streamMenu={handlemenuStream}
          mediacontent={handleMediaContent}
          keywordincludes={handleKeywordIncludes}
          actionbutton={handleActionButton}
          hidegrid={handleNewStreamGrid}
          streamButtonColor={handleStreamButtonColor}
          geographyContent={handleGeographyContent}
          hashtagContent={handleHashtagContent}
          accountContent={handleAccountContent}
          />}
               </Grid>
               <Grid xs={3}>
                 </Grid>
      
       </Grid>
              </Grid>
              </div>
       </Grid>
     
             
       
   
    </Grid>
      </Grid>
     
    
      
    </DarkContainer>
        </div>
        
    )
}
export default MenuNewMessage
