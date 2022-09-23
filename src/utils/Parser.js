import { getHours, getMinutes } from "date-fns";
import { date } from "yup";

import { getCoachLabel } from "./Data";

export const formatPhoneNumber = (str) => {
	if (!str) return ''

	// console.log(str)

	//Filter only numbers from the input
	let cleaned = ("" + str).replace(/\D/g, "");

	//Check if the input is of correct
	let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);

	if (match) {
		//Remove the matched extension code
		//Change this to format for any country code.
		let intlCode = match[1] ? "+1 " : "";
		return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
	}

	return str;
};

export const constructProperty = (item, def) => {
	if (typeof item == 'string') {
		return item
	}

	if (!def) {
		return null
	}

	if (typeof def == 'string' && def.includes('.')) {
		let parts = def.split('.')

		let tmp = item

		parts.forEach(part => tmp = tmp[part])

		return tmp
	}

	if (typeof def == 'string') {
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

export const getHour = (date) => {
	let h = date.getHours()

	if (h > 12)
		return h - 12
	else if (h == 0)
		return 12
	else
		return h
}

export const getPeriod = (date) => {
	let h = date.getHours()

	if (h > 12)
		return 'PM'
	else
		return 'AM'
}

export const deconstructDate = (date) => {
	return {
		hours: getHour(date),
		minutes: date.getMinutes(),
		period: getPeriod(date)
	}
}

export const getFullName = (contact) => {
	if (!contact)
		return ''

	if (contact.full_name)
		return contact.full_name

	return `${contact.first_name || ''} ${contact.last_name || ''}`
}

// export const getMessageStatusLabel = (status) => {
// 	if(status === 'Pending')
// 		return 'Scheduled'
// 	else
// 		return status
// }
export const getMessageStatusLabel = (status, platform, recipient_count) => {

	const { total, sent, skiped, cancelled, error, pending } = recipient_count.status

	const isTwitterDM = platform === 'Twitter'
	const isPersonalText = platform === 'Personal Text'
	const isSMS = platform === 'Rs Text'

	const isError = status === 'Error'
	const isSent = status === 'Sent'
	const isComplete = status === 'Complete'
	const isInProgress = status === 'In Progress'
	const isCancelled = status === 'Cancelled'
	const isDeleted = status === 'Deleted'
	const isArchived = status === 'Archived'
	const isPending = status === 'Pending'
	const isDraft = status === 'Draft'


	let message = status

	if(isPersonalText && isInProgress)
		message = 'Message Ready to be Sent by Sender'
	else if(isCancelled) {
		if(sent > 0)
			message = 'Completed With Some Skipped Messages'
		else 
			message = 'Cancelled'
	} else if(isDeleted || isArchived) {
		message = 'Message Archived'
	} else if(isDraft)
		message = 'Draft'
	else if(isPending)
		message = 'Message Scheduled'
	else {
		if(isError) {
			if(total === error)
				message = 'Message Failed'
			else if(sent > 0)
				message = 'Complete With Some Errors'
		} else if(isSent || isComplete)
			message = 'Message Completed'
		else if(isInProgress)
			message = 'Message Sending In Progress'
	} 

	return message
}

export const getMessageStatusColor = (status) => {
	let color = null

    switch (status) {
        case 'Message Failed':
        case 'Cancelled':
            color = 'red'
            break
        case 'Complete With Some Errors':
        case 'Message Completed':
        case 'Completed With Some Skipped Messages':
            color = 'green'
            break
        case 'Message Ready to be Sent by Sender':
        case 'Message Sending In Progress':
            color = 'blue'
            break
        case 'Message Archived':
            color = 'grey'
            break
        case 'Draft':
            color = 'orange'
            break
        case 'Message Scheduled':
            color = 'purple'
            break
    }

	return color
}

export const getMessagePlatformLabel = (platform) => {
	if (!platform)
		return '--'

	switch (platform.name) {
		case 'Twitter': return 'Twitter Dm'
		default: return platform.name
	}
}
export const getMessageSenderPlatformLabel = (message) => {
	if (!message.platform)
		return ''

	//console.log(`--${message.platform.name}--`)
	switch (message.platform.name) {
		case 'Twitter': return `(@${message.sender.twitter_profile.screen_name})`
		default: return `(${formatPhoneNumber(message.sender.phone)})`
	}
}

export const getMessageSenderLabel = (message) => {
	let coach = getCoachLabel(message.send_as_coach)
	let sender = `${getFullName(message.sender)} ${getMessageSenderPlatformLabel(message)}`

	if (coach !== '')
		return `${coach} or ${sender}`
	else
		return `${sender}`
}

export const getMessageRecipientsLabel = (recipients) => {
	let list = []
	let label = ''

	if (recipients.filter_list) {
		recipients.filter_list.forEach(filter => {
			list.push(filter.name)
		})
	}

	if (recipients.contact_list) {
		recipients.contact_list.forEach(contact => {
			list.push(getFullName(contact))
		})
	}

	list.forEach((item, index) => {
		label += item

		if (index < list.length - 1)
			label += ', '
	})

	return label
}

export const getMessageRecipientsLabelArray = (recipients) => {
	if (!recipients)
		return ['--']

	let list = []
	let array = []

	if (recipients.filter_list && recipients.filter_list) {
		recipients.filter_list.forEach(filter => {
			list.push(`${filter.name} (${filter.contacts.length})`)
		})
	}

	if (recipients.contact_list && recipients.contact_list) {
		if (recipients.contact_list.length > 5) {
			list.push(`${recipients.contact_list.length} Individual Contacts`)
		} else {
			recipients.contact_list.forEach(contact => {
				list.push(getFullName(contact))
			})
		}
	}

	if (list.length === 0)
		return ['--']

	list.forEach((item, index) => {
		let label = item

		if (index < list.length - 1)
			label += ', '

		array.push(label)
	})

	return array
}

export const getMessageRecipientResponseLabel = (response) => {
	if (response === 'You cannot send messages to this user.')
		return 'You cannot send messages to this user - Check follow status'
	else
		return response
}

export const formatDate = (date, dateStyle, timeStyle) => {
	if (!date)
		return ''

	let d = date

	if (typeof date === 'string')
		d = new Date(date)

	return d.toLocaleString('en-US', { dateStyle, timeStyle })
}

export const formatDateWithoutUTC = (isoDate) => {
	const date = new Date(isoDate)
	return new Date(date.valueOf() + date.getTimezoneOffset() * 60000)
}

export const removeSpaces = (string) => string.replace(/\s/g, '')

export const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1)

const getShortTime = (date) => date.toLocaleTimeString('en-US', { timeStyle: 'short' })

const getDayOfWeek = (date) => {
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
	return days[date.getDay()]
}

const getMonth = (date) => {
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	return months[date.getMonth()]
}

const isToday = (date, now) => {
	return date.getDate() === now.getDate()
		&& date.getMonth() === now.getMonth()
		&& date.getFullYear() === now.getFullYear()
}

const isYesterday = (date, now) => {
	return date.getDate() === now.getDate() - 1
		&& date.getMonth() === now.getMonth()
		&& date.getFullYear() === now.getFullYear()
}

const isThisWeek = (date, now) => {
	return now.getTime() - date.getTime() < 1000 * 60 * 60 * 24 * 7
		//&& now.getDay() > date.getDay() && date.getDay() <= 0
}

const isThisYear = (date, now) => {
	return date.getFullYear() === now.getFullYear()
}

export const getNiceDate = (date, style) => {
	console.log(date)

	// style = 'short' || 'default'

	if (!date || !(date instanceof Date))
		return ''

	let now = new Date(Date.now())

	if(isToday(date, now))
		return getShortTime(date)
	else if(isYesterday(date, now))
		return `Yesterday, ${getShortTime(date)}`
	else if(isThisWeek(date, now))
		return `${getDayOfWeek(date)}, ${getShortTime(date)}`
	else if(isThisYear(date, now))
		return `${getMonth(date)} ${date.getDate()}, ${getShortTime(date)}`
	else
		return style === 'short'
			?	`${getMonth(date)} ${date.getDate()} ${date.getFullYear()}`
			:	`${getMonth(date)} ${date.getDate()} ${date.getFullYear()}, ${getShortTime(date)}`
}
