import React from 'react'
import MyStreams from '../../TwitterStream/Menus/MenuNewMessage/MyStreams'
function MyMedia() {
    return (
      
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
              Media
        
            </p>
           <MyStreams myMedia={true}/>
          </div>
        
    )
}

export default MyMedia
