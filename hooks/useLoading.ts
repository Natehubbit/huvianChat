import { useSelector } from '../store'

export const useLoading = () => useSelector((state) => state.loading)
