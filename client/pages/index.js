import { useContext } from 'react'
import { UserContext } from '../context'
import { useRouter } from 'next/Router'
import styles from '../styles/Index.module.css';

const Index = () => {

    const Router = useRouter();

    const [state] = useContext(UserContext);
    
    if (!state) Router.push("/auth/login");

    return (
        <div className={styles.nav}>
            Home
        </div>
    )
}

export default Index