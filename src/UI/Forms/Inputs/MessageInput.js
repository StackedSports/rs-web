import './MessageInput.css'

import { useState, useRef, useEffect } from 'react'

import Grid from '@mui/material/Grid';
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
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
    let selectedPlatform = {}

    const [availablePlatforms, setAvailablePlatforms] = useState([])

    useEffect(() => {
        let tmp = []

        if (props.platforms) {
            if (props.platforms.twitter) {
                tmp.push(platforms[0])
            }

            tmp.push(platforms[1])

            if (props.platforms.rs) {
                tmp.push(platforms[2])
            }
        }

        // tmp.push(platforms[2])

        setAvailablePlatforms(tmp)
    }, [props.platforms])

    if (props.selected) {
        selectedPlatform = platforms.find(plat => plat.name === props.selected)
    }

    const header = () => props.selected ? (
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
                    key={contact.id}
                    item={contact}
                    imgDef={typeof contact == 'string' ? null : 'twitter_profile.profile_image'}
                    nameDef={['first_name', 'last_name']}
                    onSelected={(e) => props.onSelected(contact)}
                />
            ))}
        </Dropdown.List>
    )

    return (
        <div className='Row'>
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
                    <div className='Row'>
                        <InputSelected
                            type='contact'
                            img={typeof selection == 'string' ? null : constructProperty(selection, 'twitter_profile.profile_image')}
                            name={constructProperty(selection, ['first_name', 'last_name'])}
                            onRemove={(e) => props.onRemove(index)} />
                        {index == 0 && props.selected.length > 1 && typeof selection == 'string' && <p className='Or'>OR</p>}
                    </div>
                ))
            )}

        </div>
    )
}

const ReceiverSelectionGroup = (props) => {
    return (
        <div className='Row'>
            {props.selection && (
                props.selection.length < 4 ? (
                    props.selection.map((item, index) => (
                        <InputSelected key={item.id} style={{ marginBottom: 10 }}
                            type='contact'
                            img={constructProperty(item, props.imgDef)}
                            name={constructProperty(item, props.nameDef)}
                            onClick={(e) => props.onSelectedClick(index, item.id, props.type)}
                            onRemove={(e) => props.onRemove(index, item.id, props.type, e)} />
                    ))
                ) : (
                    <InputSelected style={{ marginBottom: 10 }}
                        type='contact'
                        img={null}
                        name={`${props.selection.length} ${props.label}`}
                        onClick={(e) => props.onSelectedClick('all', 'all', props.type)}
                        onRemove={(e) => props.onRemove('all', 'all', props.type, e)} />
                )
            )}
        </div>
    )
}

const InputReceivers = (props) => {

    // selected
    let showMargin = false

    if (props.selected) {
        let lengths = props.selected.privateBoards.length
            + props.selected.teamBoards.length
            + props.selected.contacts.length
            + props.selected.recipients.length

        if (lengths > 0)
            showMargin = true
    }

    return (
        <div className='Row'>
            <InputSelector style={{ marginBottom: showMargin ? 10 : 0 }} icon={FaPlus} name={props.name} onClick={props.onClick} />
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
        </div>

    )
}

const InputTime = (props) => <InputSelector icon={FaCalendarAlt} name={props.name} onClick={props.onClick} />

const InputMedia = (props) => {
    if (props.selected) {
        return (
            <InputSelected
                variant={props.selected.type}
                item={props.selected.item}
                onClick={props.onSelectedClick}
                onRemove={props.onRemove} />
        )
    } else {
        return (
            <InputSelector
                icon={FaPlus}
                name='Add Media'
                large
                onClick={props.onClick} />
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

const EmojiPicker = (props) => {
    const [showPicker, setShowPicker] = useState(false)

    const onClick = (e) => {
        setShowPicker(true)
    }

    const onMouseLeave = (e) => {
        setShowPicker(false)
    }

    const onSelect = (emoji) => {
        // console.log(emoji)
        setShowPicker(false)
        props.onEmojiSelected(emoji)
    }

    return (
        <div className="EmojiPicker-Container" style={props.style}>
            <Emoji emoji="grinning" size={28} onClick={onClick} />
            {showPicker && (
                <div
                    style={{ position: 'absolute', top: '40px', left: '0px' }}
                    onMouseLeave={onMouseLeave}>
                    <Picker
                        showPreview={false}
                        //   useButton={false}
                        title="Pick your emoji"
                        emoji="grinning"
                        perLine={10}
                        onSelect={onSelect}
                    />
                </div>
            )}
        </div>
    )
}

const InputText = (props) => {
    const maxLength = 280
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
        <div>
            <div className="Row" style={{ maringBottom: 20 }}>
                <TextPlaceholders
                    placeholders={props.textPlaceholders}
                    onSelected={onPlaceholderSelected}
                />
                <Snippets
                    snippets={props.snippets}
                    onSelected={onSnippetSelected}
                />
                <EmojiPicker onEmojiSelected={onEmojiSelected} />
            </div>
            <textarea
                ref={textArea}
                className='TextArea'
                type='text'
                rows='10'
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
        </div>
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
            <EmojiPicker style={{
                position: "absolute",
                top: 0,
                right: 0,
            }}
                onEmojiSelected={onEmojiSelected}
            />
            <textarea
                ref={textArea}
                className='TextArea-chat'
                type='text'
                rows='10'
                placeholder={props.placeholder}
                value={props.value}
                onChange={onChange}
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

    return (
        <div className={containerClass}>
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