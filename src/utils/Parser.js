import { getHours, getMinutes } from "date-fns";

import { getCoachLabel } from "./Data";

export const formatPhoneNumber = (str) => {
	if(!str) return ''

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
	if(typeof item == 'string') {
		return item
	}

	if(!def) {
		return null
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

export const getHour = (date) => {
	let h = date.getHours()
	
	if(h > 12)
		return h - 12
	else if(h == 0)
		return 12
	else
		return h
}

export const getPeriod = (date) => {
	let h = date.getHours()
	
	if(h > 12)
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
	if(!contact)
		return ''

	return `${contact.first_name || ''} ${contact.last_name || ''}`
}

export const getMessageStatusLabel = (status) => {
	if(status === 'Pending')
		return 'Scheduled'
	else
		return status
}
export const getMessagePlatformLabel = (platform) => {
	if(!platform)
		return '--'

	switch(platform.name) {
		case 'Twitter': return 'Twitter Dm'
		default: return platform.name
	}
}
export const getMessageSenderPlatformLabel = (message) => {
	if(!message.platform)
		return ''

	//console.log(`--${message.platform.name}--`)
	switch(message.platform.name) {
		case 'Twitter': return `(@${message.sender.twitter_profile.screen_name})`
		default: return `(${formatPhoneNumber(message.sender.phone)})`
	}
}

export const getMessageSenderLabel = (message) => {
	let coach = getCoachLabel(message.send_as_coach)
	let sender = `${getFullName(message.sender)} ${getMessageSenderPlatformLabel(message)}`

	if(coach !== '')
		return `${coach} or ${sender}`
	else
		return `${sender}`
}

export const getMessageRecipientsLabel = (recipients) => {
	let list = []
	let label = ''

	if(recipients.filter_list) {
		recipients.filter_list.forEach(filter => {
			list.push(filter.name)
		})
	}

	if(recipients.contact_list) {
		recipients.contact_list.forEach(contact => {
			list.push(getFullName(contact))
		})
	}

	list.forEach((item, index) => {
		label += item

		if(index < list.length - 1)
			label += ', '
	})

	return label
}

export const getMessageRecipientsLabelArray = (recipients) => {
	if(!recipients)
		return ['--']

	let list = []
	let array = []

	if(recipients.filter_list && recipients.filter_list) {
		recipients.filter_list.forEach(filter => {
			list.push(`${filter.name} (${filter.contacts.length})`)
		})
	}

	if(recipients.contact_list && recipients.contact_list) {
		if(recipients.contact_list.length > 5) {
			list.push(`${recipients.contact_list.length} Individual Contacts`)
		} else {
			recipients.contact_list.forEach(contact => {
				list.push(getFullName(contact))
			})
		}
	}

	if(list.length === 0)
		return ['--']

	list.forEach((item, index) => {
		let label = item

		if(index < list.length - 1)
			label += ', '

		array.push(label)
	})

	return array
}

export const getMessageRecipientResponseLabel = (response) => {
	if(response === 'You cannot send messages to this user.')
		return 'You cannot send messages to this user - Check follow status'
	else 
		return response
}

export const formatDate = (date, dateStyle, timeStyle) => {
	if(!date)
		return ''

	let d = date

	if(typeof date === 'string')
		d = new Date(date)

	return d.toLocaleString('en-US', { dateStyle, timeStyle })
}

export const removeSpaces = (string) => string.replace(/\s/g, '')

export const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1)
