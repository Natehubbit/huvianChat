import firebase from '../config/firebase'
import alert from '../helper/alert'
export const Users = firebase.db.collection('users')

export default class UserService {
  static async getUser (id:string):Promise<User|null> {
    try {
      const data = (await Users.doc(id).get()).data()
      const user:User = { id, ...data }
      return user || null
    } catch (e) {
      alert('Error', e)
      return null
    }
  }

  static async addUser (user:User):Promise<User | null> {
    try {
      const { id } = await Users.add(user)
      return { ...user, id }
    } catch (e) {
      alert('Error', e)
      return null
    }
  }

  /**
   *
   * @param id user id
   */
  static userListener = (id:string, dispatch:any, action:any) => {
    return Users.doc(id).onSnapshot(snapshot => {
      const data:User = { ...snapshot.data() }
      dispatch(action({ ...data, id }))
    })
  }
}

export interface User {
  id?: string,
  name?: string,
  status?: 'online'|'offline',
  image?: string,
  count?: number,
}
