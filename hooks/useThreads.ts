import { useSelector } from '../store'

export const useThreads = () => useSelector((state) => state.threads)
