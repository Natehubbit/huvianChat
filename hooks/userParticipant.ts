import { useSelector } from '../store'

export const useParticipant = (id:string) => useSelector((state) => {
  const thread = state.threads.filter(thread => thread.id === id)[0]
  return thread ? thread.participant : { id: '', name: '' }
})
