// @ts-nocheck
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Avatar, Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { formatPhoneNumber, getFullName } from 'utils/Parser';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

interface IMessagingPlatform {
	id: TMessagingPlatformID,
	label: string
}

enum EPlatformType {
	TwitterDm = 'twitter-dm',
	RsText = 'rs-text',
	PersonalText = 'personal-text'
}

type TMessagingPlatformID = EPlatformType.TwitterDm | EPlatformType.RsText | EPlatformType.PersonalText

const PLATFORM_LABEL = {
	[EPlatformType.TwitterDm]: 'Twitter DM',
	[EPlatformType.RsText]: 'SMS/MMS Text',
	[EPlatformType.PersonalText]: 'Personal Text',
}

const TWITTER_DM = {
	id: EPlatformType.TwitterDm,
	label: PLATFORM_LABEL[EPlatformType.TwitterDm]
}

const RS_TEXT = {
	id: EPlatformType.RsText,
	label: PLATFORM_LABEL[EPlatformType.RsText]
}

const PERSONAL_TEXT = {
	id: EPlatformType.PersonalText,
	label: PLATFORM_LABEL[EPlatformType.PersonalText]
}

const ContactChatHeader = (props) => {

	const fullName = props.contact ? getFullName(props.contact) : "Loading..."
	const profileImage = props.contact?.twitter_profile.profile_image
	const phone = props.contact ? props.contact.phone : "Loading..."

	const [open, setOpen] = useState(false);
	const anchorRef = useRef<HTMLButtonElement>(null);

	const [availablePlatforms, setAvailablePlatforms] = useState<IMessagingPlatform[] | null>(null)
	const [platformSelectedId, setPlatformSelectedId] = useState<TMessagingPlatformID | null>(null)

	/* console.log(props.contact) */

	useEffect(() => {
		if (!props.contact)
			return

		let availablePlatforms = []

		if (props.contact.twitter_profile && props.contact.twitter_profile.screen_name)
			availablePlatforms.push(TWITTER_DM)
		if (props.contact.phone) {
			availablePlatforms.push(RS_TEXT)
			availablePlatforms.push(PERSONAL_TEXT)
		}

		setAvailablePlatforms(availablePlatforms)

		if (availablePlatforms.length > 0)
			setPlatformSelectedId(availablePlatforms[0].id)

	}, [props.contact])

	const platformLabel = useMemo(() => {
		if (!props.contact)
			return 'Loading...'
		switch (platformSelectedId) {
			case EPlatformType.TwitterDm:
				return `@${props.contact.twitter_profile.screen_name}`
			case EPlatformType.RsText:
				return formatPhoneNumber(props.contact.phone)
			case EPlatformType.PersonalText:
				return formatPhoneNumber(props.contact.phone)
		}
	}, [props.contact, platformSelectedId])

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event: MouseEvent | TouchEvent) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	function handleListKeyDown(event: React.KeyboardEvent) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		} else if (event.key === 'Escape') {
			setOpen(false);
		}
	}

	const onPlatformSelected = (platformId: TMessagingPlatformID) => {
		setPlatformSelectedId(platformId)
		setOpen(false)
	}

	return (
		<Stack spacing={1} direction="row" justifyContent="start" alignItems="center">
			<Button
				variant="outlined"
				aria-controls={open ? 'fade-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				ref={anchorRef}
				onClick={handleToggle}
				startIcon={<Avatar sx={{ width: 36, height: 36 }} alt={fullName} src={profileImage} />}
				endIcon={open ? <ExpandLess /> : <ExpandMore />}
				size="large"
			>
				{fullName}
				{phone && <Typography variant="body2" sx={{ pl: 2 }}>{platformLabel}</Typography>}
			</Button>
			<Popper
				open={open}
				anchorEl={anchorRef.current}
				placement="bottom-start"
				transition
				disablePortal
				sx={{ zIndex: 'fab' }}
			>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin:
								placement === 'bottom-start' ? 'left top' : 'left bottom',
						}}
					>
						<Paper
							sx={{
								minWidth: anchorRef.current?.offsetWidth || 'fit-content',
							}}
						>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList
									autoFocusItem={open}
									id="composition-menu"
									aria-labelledby="composition-button"
									onKeyDown={handleListKeyDown}
								>
									{availablePlatforms && availablePlatforms.map(platform => (
										<MenuItem key={platform.id} onClick={() => onPlatformSelected(platform.id)}>
											{platform.label}
										</MenuItem>
									))}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</Stack>
	)
}

export default ContactChatHeader;