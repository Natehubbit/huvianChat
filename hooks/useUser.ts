import { useSelector } from '../store'

export const useUser = () => useSelector((state) => state.user)
