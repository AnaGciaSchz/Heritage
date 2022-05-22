import styles from './logout.module.scss'
import { userService } from '../../services/userService'
import { useIntl } from "react-intl"
import { useState, useEffect } from "react";
import { useRouter } from "next/router"

export default function Logout() {
    const {formatMessage} = useIntl();
    const f = id => formatMessage({ id })
    const [logout, setLogout] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if(localStorage != null && localStorage.getItem('user') != null){
           setLogout( <button onClick={userService.logout} className={styles.button}>Logout</button>)
        }else{
            setLogout(null)
        }
        
    }, [router.locale, router.asPath]);
        return (logout)
    
}