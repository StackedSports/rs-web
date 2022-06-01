import './OldMediaGrid.css'

import { useState, useRef, useEffect } from 'react';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Grid } from "@mui/material"
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';

import useArray from 'Hooks/ArrayHooks';

import { getters } from './MediaGridHelper'

const MediaGridItem = (props) => (
    <div className="MediaGrid-Item" style={{ width: props.size }}>
        <input 
          className="CheckItem"
          type="checkbox"
          checked={props.selected}
          onChange={props.onSelectChange}
          disabled={props.disabled}/>
        <img style={{ width: props.size - 5, height: props.size - 5 }} src={props.src}/>
        <h2>{props.title}</h2>
        <p>{props.subtitle}</p>
    </div>
)

const MediaGrid = (props) => {
    const grid = useRef(null)
    
    const [cols, setCols] = useState(4)
    const [size, setSize] = useState(200)

    // const [selection, setSelection] = useArray()
    // const [selectionCtrl, setSelectionCtrl] = useState({})
    // const selection = useRef([])
    const [selectedId, setSelectedId] = useState('')

    useEffect(() => {
        if(!grid.current)
            return
        
        // console.log(
        //     `width = ${grid.current.clientWidth}`
        // )

        setSize(grid.current.clientWidth / cols)
    }, [grid.current])

    const onSelectChange = (id) => {
        let selection = id

        if(id === selectedId)
            selection = ''
        
        setSelectedId(selection)
        props.onSelectionChange(selection)
        // let tmpCtrl = Object.assign({}, selectionCtrl)
        // // let tmpSelection = Object.assign([], selection)

        // if(tmpCtrl[id]) {
        //     delete tmpCtrl[id]
        //     // setSelection.removeById(id)
        //     let index = selection.current.findIndex(item => item.id === id)

        //     if(index >= 0) {    
        //         selection.current.splice(index, 1)
        //     }
        // } else {
        //     tmpCtrl[id] = true
        //     selection.current.push(id)
        // }

        // console.log(tmpCtrl)

        // setSelectionCtrl(tmpCtrl)
        // props.onSelectionChange(Object.assign([], selection.current))
    }

    const onPageChange = (e, page) => {
        console.log(page)
        props.pagination.getPage(page)
    }

    const { media, type = 'media' } = props

    

    return (
        <div id="MediaGrid-Container">
            <div className="MediaGrid" ref={grid}>
                {media && media.map(item => (
                    <MediaGridItem key={item.id}
                      size={size}
                      src={getters[type].src(item)}
                      title={item.name}
                      subtitle={getters[type].subtitle(item)}
                      selected={item.id === props.selected}
                    //   selected={selectionCtrl[item.id] ? true : false}
                      onSelectChange={(e) => onSelectChange(item.id)}
                      disabled={props.loading}
                    />
                ))}
            </div>
            <Grid container justifyContent="center" alignItems="center">
                <Pagination
                    count={props.pagination.totalPages}
                    page={props.pagination.currentPage}
                    onChange={onPageChange}
                    disabled={props.loading}/>
            </Grid>
            {props.loading && (
                <div className="LoadingContainer">
                    <CircularProgress/>
                </div>
            )}
        </div>
    )
}

MediaGrid.defaultProps = {
    type: 'media'
}

export default MediaGrid

// export default function MediaGrid(props) {
//     return (
//         <ImageList sx={{ height: 450, width: 885 }} cols="4">
//             {props.media.map((item) => (
//                 <ImageListItem key={item.id} cols="1">
//                     <img
//                       style={{ width: 150, height: 150 }}
//                       src={`${item.urls.thumb}?w=164&h=164&fit=crop&auto=format`}
//                       srcSet={item.urls.thumb}
//                       alt={item.name}
//                       loading="lazy"
//                     />
//                     <ImageListItemBar
//                       title={item.name}
//                       subtitle={<span>by: {`${item.owner.first_name} ${item.owner.last_name}`}</span>}
//                       position="below"
//                     />
//                 </ImageListItem>
//             ))}
//         </ImageList>
//     )
// }
