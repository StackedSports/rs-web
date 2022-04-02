export const getters = {
    placeholder: {
        src: (placeholder) => {
            let srcs = []
    
            for(let i = 0; i < 4; i++) {
                if(!placeholder.media[i])
                    break
                
                srcs.push(placeholder.media[i].urls)
            }
    
            return srcs
        },
        subtitle: (placeholder) => new Date(placeholder.created_at).toLocaleString('en-US', { dateStyle: 'short' , timeStyle: 'short'})
    },
    media: {
        src: (media) => media.urls.thumb,
        subtitle: (media) => `by ${media.owner.first_name} ${media.owner.last_name}`
    }
}