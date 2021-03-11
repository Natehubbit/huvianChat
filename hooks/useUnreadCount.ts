import { useSelector } from '../store'

/**
 * @param id thread id
 * @param uid user id
 */
export const useUnreadCount = (id:string, uid:string|undefined) => useSelector((state) => {
  if (!uid) return 0
  const thread = state.threads.filter(thread => thread.id === id)[0]
  if (thread) {
    const { party1, party2 } = thread
    const data = (party1?.id && party2?.id && [party1, party2]) || []
    return (data.length > 0 && data.filter(d => d.id === uid)[0].count) || 0
  }
  return 0
})
