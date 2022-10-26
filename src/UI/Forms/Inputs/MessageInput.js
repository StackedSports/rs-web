import './MessageInput.css'

import { useState, useRef, useEffect } from 'react'


import CloseIcon from '@mui/icons-material/Close';

import {
    FaPhone,
    FaTwitter,
    FaComment,
    FaPlus,
    FaCalendar,
    FaCalendarAlt,
    FaMagic,
    FaFilePdf,
    FaVideo,
    FaImage,
    FaSlidersH,
    FaBars,
    FaTh,
    FaEnvelope
} from "react-icons/fa";

import 'emoji-mart/css/emoji-mart.css'
import { Picker, Emoji } from 'emoji-mart'

import Dropdown from 'UI/Widgets/Dropdown'
import { SearchableOptionListItem } from 'UI/Forms/Inputs/SearchableOptions'
import MediaPreview from 'UI/Widgets/Media/MediaPreview'

import { constructProperty } from 'utils/Parser'
import { stringSplice } from 'utils/Helper'
import { FileDropZone } from 'UI/Widgets/Media/UploadMediaDialog';
import { Stack, CircularProgress, Popper, Button, IconButton, ClickAwayListener, TextField } from '@mui/material';

const platforms = [
    { name: 'Twitter Dm', icon: FaTwitter },
    { name: 'Personal Text', icon: FaPhone },
    { name: 'SMS/MMS', icon: FaComment }
]

const InputSelector = (props) => {
    const onClick = (e) => {
        if (props.onClick) {
            props.onClick(e)
        }
    }

    return (
        <div style={props.style} className={props.large ? 'Container Large' : 'Container'}
            onClick={onClick}
        >
            <props.icon className='Icon' />
            <div className='Name'>{props.name}</div>
        </div>
    )
}

const InputSelected = (props) => {
    const onClick = (e) => {
        if (props.onClick)
            props.onClick(e)
    }

    if (props.variant === 'media' || props.variant === 'placeholder') {
        const getSrc = {
            media: (media) => media.urls.thumb,
            placeholder: (placeholder) => placeholder.media[0].urls.thumb
        }

        return (
            <div style={props.style} className={'MediaPreview'} onClick={onClick}>
                {/* <img className="MediaSelected" src={getSrc[props.variant](props.item)}/> */}
                <MediaPreview
                    //   mini
                    miniImage={props.miniImage}
                    item={props.item}
                    // loading={loading}
                    type={props.variant}
                />
                <CloseIcon className='Clear ClearSelected' onClick={props.onRemove} />
            </div>
        )
    }

    return (
        <div style={props.style} className={props.large ? 'Container Large' : 'Container'} onClick={onClick}>
            {props.type == 'contact' ?
                props.img ? <img className='Image' src={props.img} /> : <></>
                : (
                    <props.icon className='Icon' />
                )}
            <div className='Name'>{props.name}</div>
            <CloseIcon className='Clear' onClick={props.onRemove} />
        </div>
    )
}

// const platforms = [
//     { name: 'Twitter Dm', icon: FaTwitter },
//     { name: 'Personal Text', icon: FaPhone },
//     { name: 'Rs Text', icon: FaComment }
// ]

const InputPlatform = (props) => {
    const [availablePlatforms, setAvailablePlatforms] = useState([])
    const [selectedPlatform, setSelectedPlatform] = useState(null)

    useEffect(() => {
        let tmp = []

        if (props.platforms) {
            if (props.platforms.twitter) {
                tmp.push(platforms[0])
            }

            if (props.platforms.txt)
                tmp.push(platforms[1])

            if (props.platforms.rs) {
                tmp.push(platforms[2])
            }

            // const platforms = [
            //     { name: 'Twitter Dm', icon: FaTwitter },
            //     { name: 'Personal Text', icon: FaPhone },
            //     { name: 'SMS/MMS', icon: FaComment }
            // ]
        }

        // tmp.push(platforms[2])

        setAvailablePlatforms(tmp)
    }, [props.platforms])

    useEffect(() => {
        if (props.selected) {
            let found = platforms.find(plat => plat.name === props.selected)
            console.log(found)
            setSelectedPlatform(found)
        } else {
            setSelectedPlatform(null)
        }
    }, [props.selected])

    //console.log(props.platforms)
    //console.log(props.selected)
    //console.log(availablePlatforms)

    const header = () => selectedPlatform ? (
        <InputSelected icon={selectedPlatform.icon} name={selectedPlatform.name} onRemove={props.onRemove} />
    ) : (
        <InputSelector icon={FaEnvelope} name='Message Type' />
    )

    const content = () => (
        <Dropdown.List>
            {availablePlatforms.map((platform, index) => (
                <SearchableOptionListItem
                    key={platform.name}
                    item={platform.name}
                    icon={platform.icon}
                    iconSize={18}
                    onSelected={(e) => props.onSelected(platform.name)}
                />
            ))}
        </Dropdown.List>
    )

    return (
        <Dropdown
            header={header}
            content={content}
            contentStyle={{ minHeight: 0, overflowY: 'auto' }}
            disabled={props.selected ? true : false}
        />
    )
}

const InputSenders = (props) => {
    const header = () => <InputSelector icon={FaPlus} name={props.name} />

    const content = () => (
        <Dropdown.List>
            {props.contacts && props.contacts.map((contact, index) => (
                <SearchableOptionListItem
                    key={contact.id || contact}
                    item={contact}
                    imgDef={typeof contact == 'string' ? null : 'twitter_profile.profile_image'}
                    nameDef={['first_name', 'last_name']}
                    onSelected={(e) => props.onSelected(contact)}
                />
            ))}
        </Dropdown.List>
    )

    return (
        <Stack direction={'row'} flexWrap='wrap' alignItems={'center'} gap={1}>
            {props.canAddMore && (
                <Dropdown
                    header={header}
                    content={content}
                    disabled={false}
                    contentStyle={{
                        maxHeight: 335,
                        width: 280
                    }}
                />
            )}
            {props.selected && props.selected.length > 0 && (
                props.selected.map((selection, index) => (
                    <>
                        <InputSelected
                            type='contact'
                            img={typeof selection == 'string' ? null : constructProperty(selection, 'twitter_profile.profile_image')}
                            name={constructProperty(selection, ['first_name', 'last_name'])}
                            onRemove={(e) => props.onRemove(index)} />
                        {index == 0 && props.selected.length > 1 && typeof selection == 'string' && <p className='Or'>OR</p>}
                    </>
                ))
            )}

        </Stack>
    )
}

const ReceiverSelectionGroup = (props) => {
    return (
        <>
            {props.selection && (
                props.selection.length < 4 ? (
                    props.selection.map((item, index) => (
                        <InputSelected key={item.id}
                            type='contact'
                            img={constructProperty(item, props.imgDef)}
                            name={constructProperty(item, props.nameDef)}
                            onClick={(e) => props.onSelectedClick(index, item.id, props.type)}
                            onRemove={(e) => props.onRemove(index, item.id, props.type, e)} />
                    ))
                ) : (
                    <InputSelected
                        type='contact'
                        img={null}
                        name={`${props.selection.length} ${props.label}`}
                        onClick={(e) => props.onSelectedClick('all', 'all', props.type)}
                        onRemove={(e) => props.onRemove('all', 'all', props.type, e)} />
                )
            )}
        </>
    )
}

const InputReceivers = (props) => {

    if (props.selected) {
        let lengths = props.selected.privateBoards.length
            + props.selected.teamBoards.length
            + props.selected.contacts.length
            + props.selected.recipients.length
    }

    return (
        <Stack direction='row' flexWrap='wrap' alignItems='center' gap={1.5}>
            <InputSelector icon={FaPlus} name={props.name} onClick={props.onClick} />
            {props.selected && (
                <ReceiverSelectionGroup
                    selection={props.selected.privateBoards}
                    label='Private Boards'
                    type='privateBoards'
                    imgDef={null}
                    nameDef={'name'}
                    onSelectedClick={props.onSelectedClick}
                    onRemove={props.onRemove}
                />
            )}
            {props.selected && (
                <ReceiverSelectionGroup
                    selection={props.selected.teamBoards}
                    label='Team Boards'
                    type='teamBoards'
                    imgDef={null}
                    nameDef={'name'}
                    onSelectedClick={props.onSelectedClick}
                    onRemove={props.onRemove}
                />
            )}
            {props.selected && (
                <ReceiverSelectionGroup
                    selection={props.selected.contacts}
                    label='Contacts'
                    type='contacts'
                    imgDef={'twitter_profile.profile_image'}
                    nameDef={['first_name', 'last_name']}
                    onSelectedClick={props.onSelectedClick}
                    onRemove={props.onRemove}
                />
            )}
            {props.selected && (
                <ReceiverSelectionGroup
                    selection={props.selected.recipients}
                    label='Message Recipients'
                    type='recipients'
                    imgDef={'profile_image'}
                    nameDef={['first_name', 'last_name']}
                    onSelectedClick={props.onSelectedClick}
                    onRemove={props.onRemove}
                />
            )}
        </Stack>

    )
}

const InputTime = (props) => <InputSelector icon={FaCalendarAlt} name={props.name} onClick={props.onClick} />

// const InputMedia = (props) => {
//     if (props.selected) {
//         return (
//             <InputSelected
//                 variant={props.selected.type}
//                 item={props.selected.item}
//                 onClick={props.onSelectedClick}
//                 onRemove={props.onRemove} />
//         )
//     } else {
//         return (
//             <InputSelector
//                 icon={FaPlus}
//                 name='Add Media'
//                 large
//                 onClick={props.onClick} />
//         )
//     }
// }

const InputMedia = (props) => {
    if (props.selected && Array.isArray(props.selected.item)) {
        return props.selected.item.map((item, index) =>
            <InputSelected
                key={index}
                miniImage
                style={{ width: "300px" }}
                variant={props.selected.type}
                item={item}
                onClick={() => props.onSelectedClick(index)}
                onRemove={(e) => { e.stopPropagation(); props.onRemove(index) }}
            />
        )
    } else if (props.selected) {
        return (
            <InputSelected
                miniImage
                style={{ width: "300px" }}
                variant={props.selected.type}
                item={props.selected.item}
                onClick={props.onSelectedClick}
                onRemove={props.onRemove}
            />
        )
    } else {
        return (
            props.loading ?
                <Stack flex={1} alignItems="center" justifyContent="center">
                    <CircularProgress style={{ margin: "0 auto" }} />
                </Stack>
                :
                <FileDropZone
                    style={{ margin: 0, padding: '50px 0', flex: 1 }}
                    browseAction={props.browseAction}
                    onDrop={props.onDrop}
                />

        )
    }
}

const TextPlaceholders = (props) => {
    const [placeholders, setPlaceholders] = useState([])

    useEffect(() => {
        if (!props.placeholders)
            return

        let tmp = []

        Object.keys(props.placeholders).forEach(key => {
            tmp = tmp.concat(props.placeholders[key])
        })

        setPlaceholders(tmp)

    }, [props.placeholders])

    const header = () => (
        <InputSelector icon={FaPlus} name="Text Placeholders" />
    )

    // console.log(placeholders)

    const content = () => (
        <Dropdown.List>
            {placeholders.map((placeholder, index) => (
                <SearchableOptionListItem
                    key={placeholder}
                    item={placeholder}
                    onSelected={(e) => props.onSelected(placeholder)}
                />
            ))}
        </Dropdown.List>
    )

    return (
        <Dropdown
            header={header}
            content={content}
            dismissOnClick
            dismissDelay={200}
        />
    )
}

const Snippets = ({ snippets, onSelected }) => {


    const header = () => (
        <InputSelector icon={FaPlus} name="Snippets" />
    )

    // console.log(placeholders)

    const content = () => (
        <Dropdown.List>
            {snippets && snippets.map((snippet, index) => (
                <SearchableOptionListItem
                    key={snippet.id}
                    item={snippet.content}
                    onSelected={(e) => onSelected(snippet.content)}
                />
            ))}
        </Dropdown.List>
    )

    return (
        <Dropdown
            header={header}
            content={content}
            dismissOnClick
            dismissDelay={200}
        />
    )
}

export const EmojiPicker = (props) => {
    const buttonRef = useRef()
    const [showPicker, setShowPicker] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);

    const onClick = (e) => {
        setAnchorEl(anchorEl ? null : e.currentTarget);
    }

    const handleClose = (e) => {
        setAnchorEl(null)
    }

    const onSelect = (emoji) => {
        // console.log(emoji)
        setShowPicker(false)
        props.onEmojiSelected(emoji)
    }

    const open = Boolean(anchorEl);

    return (
        <div style={props.style}>
            <IconButton onClick={onClick}>
                <Emoji emoji="grinning" size={28} />
            </IconButton>
            <Popper
                open={open}
                anchorEl={anchorEl}
                placement="bottom-start"
                onMouseLeave={handleClose}
            >
                <ClickAwayListener onClickAway={() => handleClose()}>
                    <Picker
                        showPreview={false}
                        title="Pick your emoji"
                        emoji="grinning"
                        perLine={10}
                        onSelect={onSelect}
                    />
                </ClickAwayListener>
            </Popper>
        </div>
    )
}

const InputText = (props) => {
    const maxLength = props.maxLength || 280
    const textArea = useRef()

    const onChange = (e) => {
        // if(e.target.value.length > maxLength)
        //     return

        props.onChange(e.target.value)
    }

    const replaceSelectionWith = (substring) => {
        let string = `${props.value}`
        let start = textArea.current.selectionStart
        let end = textArea.current.selectionEnd

        props.onChange(stringSplice(string, start, start - end, substring))
    }

    const onPlaceholderSelected = (placeholder) => {
        replaceSelectionWith(`[${placeholder}]`)
    }

    const onSnippetSelected = (snippet) => {
        replaceSelectionWith(snippet)
    }

    const onEmojiSelected = (emoji) => {
        replaceSelectionWith(emoji.native)
    }

    return (
        <>
            <Stack direction='row' gap={1.5} sx={{ maringBottom: 20 }}>
                {!props.hideTextPlaceholders &&
                    <TextPlaceholders
                        placeholders={props.textPlaceholders}
                        onSelected={onPlaceholderSelected}
                    />}
                <Snippets
                    snippets={props.snippets}
                    onSelected={onSnippetSelected}
                />
                <EmojiPicker onEmojiSelected={onEmojiSelected} />
            </Stack>
            <TextField
                multiline
                ref={textArea}
                className='TextArea'
                variant='standard'
                type='text'
                fullWidth
                InputProps={{
                    disableUnderline: true
                }}
                rows='8'
                placeholder={props.placeholder}
                value={props.value}
                onChange={onChange}
            />
            <span
                style={{
                    color: props.value.length >= maxLength ? 'red' : '#bbb',
                    fontSize: 14
                }}
            >
                Message length {props.value.length}/{maxLength}
            </span>
        </>
    )
}

const InputChat = (props) => {
    const textArea = useRef()

    const onChange = (e) => {
        props.onChange(e.target.value)
    }

    const replaceSelectionWith = (substring) => {
        let string = `${props.value}`
        let start = textArea.current.selectionStart
        let end = textArea.current.selectionEnd

        props.onChange(stringSplice(string, start, start - end, substring))
    }

    const onEmojiSelected = (emoji) => {
        replaceSelectionWith(emoji.native)
    }

    return (
        <div style={props.style}>
            <textarea
                ref={textArea}
                className='TextArea-chat'
                type='text'
                rows='5'
                placeholder={props.placeholder}
                value={props.value}
                onChange={onChange}
            />
            <EmojiPicker
                onEmojiSelected={onEmojiSelected}
            />
            <span
                style={{
                    // color: props.value.length >= maxLength ? 'red' : '#bbb',
                    marginTop: "20px",
                    fontSize: 12,
                    color: "#dadada",
                }}
            >
                {props.footerText}
            </span>
        </div>
    )
}


const Input = (props) => {
    // console.log('type = ' + props.type)
    switch (props.type) {
        case 'platform': return <InputPlatform {...props} />
        case 'sender': return <InputSenders {...props} />
        case 'receiver': return <InputReceivers {...props} />
        case 'time': return <InputTime {...props} />
        case 'media': return <InputMedia {...props} />
        case 'chat': return <InputChat {...props} />
        case 'text':
        default: return <InputText {...props} />
    }
}

export default function MessageInput(props) {
    // console.log('a type = ' + props.a)
    // console.log('a placeholder = ' + props.placeholder)

    let containerClass = 'MessageInput'
    let inputClass = 'Input'

    if (props.type === 'media' || props.type === 'text' || props.type === 'chat') {
        containerClass += ' Large'
        inputClass += ' Flex1'
    }

    if (props.type === 'media') {
        inputClass += ' Flex'
    }

    return (
        <div className={containerClass} style={props.style}>
            {!props.hideLabel &&
                <div className='Label'>
                    <p>{props.label}</p>
                </div>
            }
            <div className={inputClass}>
                <Input type={props.type} {...props} />
            </div>
        </div>
    )
}