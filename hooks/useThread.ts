import { useSelector } from '../store'

export const useThread = (id:string) => useSelector((state) => {
  return state.threads.filter(thread => thread.id === id)[0]
})
