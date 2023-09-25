import styles from './UserLogOut.module.css'
import { logOut } from '../../utilities/users-service.js'

export default function UserLogOut ({user, setUser}) {

    //define logout function
    function handleLogOut() {
        logOut()
        setUser(null)
    }

    return (
        <div className={styles.UserLogOut}>
            <div>{user.name}</div>
            <div className={styles.email}>{user.email}</div>
            {/* //No styles. = coming from index.css styling */}
            <button className='btn-sm' onClick={handleLogOut}>Log Out</button>
        </div>
    )
}