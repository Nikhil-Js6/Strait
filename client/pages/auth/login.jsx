import { useState, useContext } from 'react'
import { UserContext } from '../../context'
import { useRouter } from 'next/Router'
import styles from '../../styles/Auth.module.css'
import AuthForm from '../../components/Forms/AuthForm'
import Alerts from '../../components/Alerts'
import axios from 'axios'

const Login = () => {

    const Router = useRouter();

    const [state, setState] = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    const [loading, setLoading] = useState(false);
    
    if (state && state.token) Router.push("/");

    const handleChange = (target) => {
        target.name === 'email' ? setEmail(target.value) : 
        target.name === 'password' ? setPassword(target.value) 
        : setAgree(target.checked);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const res = await axios.post('/login', { 
                email, password 
            });
            
            setState({ 
                user: res.data.user, 
                token: res.data.token 
            });
            
            localStorage.setItem('Strait_User', JSON.stringify({ 
                user: res.data.user, 
                token: res.data.token 
            }));
            
            Notify(res.data.message, "success");
        } 
        catch (err) {
            console.log(err);
            Notify(err?.response?.data?.error || "Something went wrong!", "error");
        }
    }

    const Notify = (message, type) => {
        setMessage(message);
        setType(type);
        setLoading(false);

        setTimeout(() => {
            setMessage("");
            setType("");
        }, 3000);
    }

    return (
        <div className={styles.login}>
            {message && 
                <Alerts 
                    message={message} 
                    type={type}
                />
            }
            <h1 className={styles.heading}>Log In</h1>
            <AuthForm
                email={email}
                password={password}
                signup={false}
                loading={loading}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}

export default Login
