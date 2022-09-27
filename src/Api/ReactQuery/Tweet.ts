import { createTweet, deleteTweet, updateTweet } from "Api/Endpoints";
import { useMutation, useQueryClient } from "react-query";

export const useTweetMutation = () => {
    const queryClient = useQueryClient();

    const update = useMutation(({ id, data }: { id: string, data: any }) => updateTweet(id, data),
        {
            onSuccess: (_data, variables, _context) => {
                queryClient.invalidateQueries(['tweet', variables.id], { active: true })
                queryClient.invalidateQueries('tweets')

            },
        })

    const remove = useMutation(({ id, archived }: { id: string, archived: boolean }) => deleteTweet(id, archived),
        {
            onSuccess: () => {
                queryClient.cancelQueries('tweet', { active: true })
                queryClient.resetQueries('tweets')
            }
        })

    const create = useMutation((tweet) => createTweet(tweet),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('tweets')
            },
        })

    return {
        update: update.mutate,
        updateAsync: update.mutateAsync,
        remove: remove.mutate,
        create: create.mutate,
        createAsync: create.mutateAsync,
    }
}
