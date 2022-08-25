import { useState } from 'react'

import { Stack } from '@mui/material'

import {
    Grid,
    Dialog,
    Snackbar,
    makeStyles,
    withStyles,
    Slider,
    Backdrop,
} from "@material-ui/core";

import ClearIcon from "@mui/icons-material/Clear"; // ----



const useStyles = makeStyles({
    tags: {
      border: "1px solid #d8d8d8",
      height: 50,
      width: "max-content",
      fontWeight: 600,
      borderRadius: 4,
      paddingLeft: 16,
      paddingRight: 16,
      margin: 8,
    },
    dropdownHidden: {
      display: "none",
      position: "absolute",
      backgroundColor: "white",
      minWidth: 230,
      boxShadow: "0px 8px 16px 0px rgba(0, 0, 0, 0.2)",
      border: "1px solid #d5d5d5",
      borderRadius: 4,
      // padding: 5,
      zIndex: 1,
      maxHeight: 200,
      overflowY: "scroll",
      overflowX: "hidden",
      zIndex: 200000000,
    },
    hoverGrid: {
      height: 50,
      marginLeft: 0,
      // marginTop: -12,
      cursor: "pointer",
      color: "#3871da",
      "&>p": {
        color: "black",
      },
      "&:hover": {
        background: "#3871da",
        color: "white",
        "&>p": {
          color: "white",
        },
		"&>svg": {
			color: "white"
		}
      },
    },
    tableP: { margin: 0, marginLeft: 12, fontSize: 16, fontWeight: 600 },
    uploadCSVSpan: { color: "#989482", marginLeft: 8, marginRight: 16 },
    uploadCSVGrid: {
      height: 30,
      width: 30,
      borderRadius: 50,
      border: "1px solid #989482",
      color: "#989482",
    },
    CSVDetails: {
      color: "#62614e",
      width: "70%",
      textAlign: "justify",
      fontWeight: 600,
      fontSize: 13,
      marginTop: 10,
    },
    uploadCSVGridActive: {
      height: 30,
      width: 30,
      borderRadius: 50,
      border: "1px solid #3871da",
      background: "#3871da",
      color: "white",
    },
  
    uploadCSVGridDone: {
      height: 30,
      width: 30,
      borderRadius: 50,
      border: "1px solid #3871da",
      background: "#006644",
      color: "white",
    },
  
    deleteForverIcon: {
      "&:hover": {
        cursor: "pointer"
      },
    }
});


export const constructProperty = (item, def) => {
	if(typeof item == 'string' || !def) {
		return item
	}

	if(typeof def == 'string' && def.includes('.')) {
		let parts = def.split('.')

		let tmp = item

		parts.forEach(part => tmp = tmp[part])

		return tmp
	}

	if(typeof def == 'string') {
		return item[def]
	}

	let name = ''

	//onsole.log(item)

	def.forEach((d, index) => {
		name += item[d] + (index == def.length - 1 ? '' : ' ')
		//console.log(item[d])
	})

	//console.log(name)

	return name
}

export const SearchableOptionListItem = (props) => {
    const classes = useStyles();

	//console.log(constructProperty(props.item, props.imgDef))

	return (
		<Grid
		  tabIndex="0" // set this so we can get relatedTarget from on Blur event
		  id={`searchable-option-list-item-${props.id}`}
		  container
		  alignItems="center"
		  style={{
			height: 60,
			marginLeft: 0,
			paddingInline: '4px',
			// marginTop: -12,
			cursor: "pointer",
		  }}
		  className={classes.hoverGrid}
		  onClick={props.onSelected}
		>
			{props.imgDef && !props.icon &&
				<img
				  style={{
					width: 30,
					height: 30,
					borderRadius: 20,
					marginLeft: 12,
				  }}
				  src={constructProperty(props.item, props.imgDef)}
				/>
			}

			{!props.imgDef && props.icon &&
				<props.icon
				  style={{
					width: props.iconSize ? props.iconSize : 30,
					height: props.iconSize ? props.iconSize : 30,
					marginLeft: 12,
					// color: props.iconColor ? props.iconColor : '#3871da' 
				  }}
				/>
			}

			<p
			  style={{
				margin: 0,
				fontWeight: 600,
				marginLeft: 12,
				overflow: 'hidden',
      			textOverflow: 'ellipsis',
      			display: '-webkit-box',
      			WebkitLineClamp: '2',
      			WebkitBoxOrient: 'vertical',
			  }}
			>
				{constructProperty(props.item, props.nameDef)}
			</p>
		</Grid>
	)
}

export const SearchableOptionDropdown = (props) => {
	const classes = useStyles()
	
	const [input, setInput] = useState("")
	// const [displayDropdown, setDisplayDropdown] = useState(false)

	const onInputChange = (e) => {
		setInput(e.target.value)
		props.onInputChange(e.target.value)
	}

	const onInputKeyPress = (e) => {
		if(e.key === "Enter") {
			// let newItem = {
			// 	id: "new-" + Date.now(),
			// 	name: input
			// }
			// setInput("")
			props.onInputPressEnter(input)
			setInput("")
		}
	}

	const onBlur = (e) => {
		if(props.onBlur && e.relatedTarget && e.relatedTarget.id.includes('searchable-option-list-item-')) {
			setTimeout(() => {
				console.log('timed out')
				props.onBlur(e)
			}, 200)
		} else if (props.onBlur) {
			console.log('on blur')
			props.onBlur(e)
		}
		// if(props.onBlur && !e.currentTarget.contains(e.relatedTarget)) {
		// 	console.log('on blur')
		// 	//console.log(e)
		// 	setTimeout(() => {
		// 		console.log('timed out')
		// 		props.onBlur(e)
		// 	}, 200)
		// }
		// if(!e.currentTarget.contains(e.relatedTarget)) {
		// 	console.log('bbbbbbbbbbbbbbbbb')
		// 	console.log(e.relatedTarget?.id)
		// }
		//console.log(e.relatedTarget)
	}

	const onOptionSelected = (option, index) => {
		console.log('option selected')
		setInput("")
		props.onOptionSelected(option, index)
	}

	const options = props.search?.length > 0 ? props.search : props.options

	return (
		<div class="dropdownMedia" 
			onClick={(e) => e.stopPropagation()}
		>
			<input
			  type="text"
				style={{
				height: 60,
				flex: "auto",
				border: "none",
				padding: 16,
			  }}
			  name='input'
			  value={input}
			  onChange={onInputChange}
			  onKeyPress={onInputKeyPress}
			  onClick={(e) => {
				e.stopPropagation()
				props.onShowDropDown()
			  }}
			  onBlur={onBlur}
			  placeholder={props.placeholder/*"+ Add Owner"*/}
			/>

			<div
				className={classes.dropdownHidden}
				style={{
				display: props.showDropDown ? "block" : "none",
				}}
			>
				{/* <Grid container direction="row" justify="center">
                    <input
                      type="text"
                      style={{
                        width: "90%",
                        border: "1px solid #ebebeb",
                        borderRadius: 4,
                        marginTop: 8,
                      }}
                      id="searchtags"
                      placeholder="Search Tags"
                      value={searchTags}
                      onChange={(e) => {
                        setSearchTags(e.target.value);
                        setDisplayTags(true);
                      }}
                      onClick={(e) => {
                        setDisplayTags(true);
                      }}
                    ></input>
                </Grid> */}

				{options && options.map((option, index) => {
					return (
						<SearchableOptionListItem
						  id={option.id ? option.id : index}
							item={option}
							imgDef={props.imgDef}
							nameDef={props.nameDef}
							onSelected={() => onOptionSelected(option, index)}
						/>
					);
				})}
			</div>{" "}
		</div>
	)
}

export const SearchableOptionSelected = props => {
	const classes = useStyles()

	return (
		<div
			className={classes.tags}
			style={props.style}
		>
			<Stack
				style={{ height: 50 }}
				direction="row"
				alignItems="center"
			>
				{props.imgDef &&
					<img
					  style={{
						width: 30,
						height: 30,
						borderRadius: 20,
						marginLeft: 12,
					  }}
					  src={constructProperty(props.item, props.imgDef)}
					/>
				}

				{constructProperty(props.item, props.nameDef)}

				{!props.disabled && (
					<ClearIcon
						onClick={props.onRemove}
						style={{
						color: "red",
						fontSize: 17,
						cursor: "pointer",
						marginLeft: 8,
						}}
					/>
				)}

				
			</Stack>
		</div>
	)
}

export default function SearchableOptions(props) {
    const classes = useStyles();

	const [displayDropdown, setDisplayDropdown] = useState(false)
	//console.log(props.selection)

	const onShowDropDown = (e) => {
		if(props.onShowDropDown) 
			return props.onShowDropDown(e)

		setDisplayDropdown(true)

		if(props.onDropDownVisibilityChange)
			props.onDropDownVisibilityChange(true)
	}

	const onBlur = (e) => {
		if(typeof props.showDropDown !== 'undefined') {
			if(props.onBlur)
				props.onBlur(e)
		} else {
			setDisplayDropdown(false)

			if(props.onDropDownVisibilityChange)
				props.onDropDownVisibilityChange(false)
		}
	}

	const showDropDown = typeof props.showDropDown !== 'undefined' ? props.showDropDown : displayDropdown
	
	let border = '1px solid #b5bccd'

	if(props.selection.length > 0 && props.noBorderOnSelected)
		border = '1px solid transparent'

    return (
        <Grid
          container
          direction="row"
          alignItems="center"
          style={{ border: border, borderRadius: 4 }}
        >
            {props.selection.length != 0 &&
                props.selection.map((item, index) => {
					//console.log(item)
					return (
						<SearchableOptionSelected key={item.id}
						  item={item}
						  nameDef={props.selectedNameDef}
						  imgDef={props.selectedImgDef}
						  name={constructProperty(item, props.selectedNameDef)}
						  onRemove={() => props.onRemoveSelected(item, index)}
						/>
					)
				}
            )}
            {props.canSelectMoreOptions &&
                <SearchableOptionDropdown
				  placeholder={props.placeholder}
				  options={props.options}
				  search={props.search}
				  imgDef={props.optionImgDef}
				  nameDef={props.optionNameDef}
				  showDropDown={showDropDown}
				  onOptionSelected={props.onOptionSelected}
				  onInputChange={props.onInputChange}
				  onInputPressEnter={props.onInputPressEnter}
				  onBlur={onBlur}
				  onShowDropDown={onShowDropDown}
				/>
            }
            
        </Grid>
    )
}