import { useState, useContext } from 'react'
import { UserContext } from '../context'
import { useRouter } from 'next/Router'
import { categories } from '../data/categories'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Alerts from './Alerts'
import styles from '../styles/Navbar.module.css'
import axios from 'axios'

const Navbar = () => {

    const Router = useRouter();
    const page = Router.route;

    const [state, setState] = useContext(UserContext);

    const [options, setOptions] = useState([]);
    const [categ, setCateg] = useState(false);
    const [subCateg, setSubCateg] = useState(false);

    const [message, setMessage] = useState("");
    const [type, setType] = useState("");

    const logout = async () => {
        try {
            const res = await axios.get('/logout');

            localStorage.removeItem("Strait_User");
            setState(null);

            Notify(res.data.message, "success");
            Router.push("/auth/login");
        } 
        catch (err) {
            console.log(err);
            Notify(err?.response?.data?.error || "Something went wrong!", "error");
        }
    }

    const Notify = (message, type) => {
        setMessage(message);
        setType(type);
        
        setTimeout(() => {
            setMessage("");
            setType("");
        }, 3000);
    }
    
    return (
        <div className={styles.nav}>
            <div className={styles.navbar}>
            { message && <Alerts message={message} type={type} /> }
                <span className={styles.brand} onClick={() => Router.push('/')}>
                    <span className={styles.tagWrapper}>
                        <img className={styles.navImg} src='/logo2.png' alt='error' />
                        <span className={styles.tag}>Simplified Learning!</span>
                    </span>
                </span>

            { page !== '/auth/login' && page !== '/auth/register' &&
                <span 
                    className={styles.navCategories} 
                    onClick={() => setCateg(!categ)} 
                    onMouseEnter={() => setCateg(true)}>
                    <a>Categories</a>
                { categ &&
                    <span 
                        className={styles.categTab} 
                        onMouseEnter={() => {
                            setCateg(true) 
                            setSubCateg(true)
                        }}
                        onMouseLeave={() => setCateg(false)}
                    >
                        { categories.map(categ => { 
                            return (
                                <span 
                                    className={styles.category} 
                                    id={categ.id}
                                    onMouseEnter={() => {
                                        setOptions(categ.sub)
                                    }}
                                >
                                    <a>{categ.name}</a>
                                    <ArrowForwardIosIcon className={styles.arrow} />
                                </span>
                            )})
                        }
                    </span>
                }
                { categ && subCateg && 
                    <span 
                        className={styles.subCategTab}
                        onMouseEnter={() => setCateg(true)}
                        onMouseLeave={() => {
                            setCateg(false)
                            setSubCateg(false)
                            setOptions([])
                        }
                    }>
                    { options.map(c => { 
                        return (
                            <a 
                                className={styles.category} 
                                href={`/category/${c.replace(/\s+/g, '-').toLowerCase()}`}
                            >
                                <span>{c}</span>
                            </a>
                        )})
                    }
                    </span>
                }
                </span>
            }

                <span className={styles.searchWrapper}>
                    <SearchIcon />
                    <input 
                        type='text' 
                        placeholder="Search for anything!" 
                        className={styles.searchInput} 
                    />
                </span>
            </div>

            <div className={styles.authWrapper}>
                <ShoppingCartIcon />
            { state && state.token 
               ? <span className={styles.authOptions}>
                    <span 
                        className={`
                            ${styles.authOption} 
                            ${page === '/courses' && styles.active}`
                        } 
                        onClick={() => Router.push('/courses')}
                    >
                        Courses
                    </span>
                    <span 
                        className={`
                            ${styles.authOption} 
                            ${page === '/profile' && styles.active}`
                        } 
                        onClick={() => Router.push('/profile')}
                    >
                        Profile
                    </span>
                    <span className={styles.authOption} onClick={() => logout()}>
                        Logout
                    </span>
                    <span className={styles.menuWrapper}>
                        <MenuIcon className={styles.menuIcon} />
                    </span>
                </span>   
               : <span className={styles.authOptions}>
                    <span 
                        className={`
                            ${styles.authOption} 
                            ${page === '/auth/login' && styles.active}`
                        } 
                        onClick={() => Router.push('/auth/login')}
                    >
                        Log In
                    </span>
                    <span 
                        className={`
                            ${styles.authOption} 
                            ${page === '/auth/register' && styles.active}`
                        } 
                        onClick={() => Router.push('/auth/register')}
                    >
                        Sign Up
                    </span>
                </span>
            }
            </div>
        </div>
    )
}

export default Navbar