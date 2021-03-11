import { Alert } from 'react-native'

export default function alert (status:string, msg:string) {
  Alert.alert(status, msg)
}
