import { useState, useContext } from 'react'
import { UserContext } from '../../context'
import { useRouter } from 'next/Router'
import styles from '../../styles/Auth.module.css'
import AuthForm from '../../components/Forms/AuthForm'
import Alerts from '../../components/Alerts'
import axios from 'axios'

const Register = () => {

    const Router = useRouter();

    const [state, setState] = useContext(UserContext);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [selected, setSelected] = useState(false);
    const [agree, setAgree] = useState(false);

    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    const [loading, setLoading] = useState(false);

    if (state && state.token) Router.push("/");

    const handleChange = (target) => {
        target.name === 'firstName' ? setFirstName(target.value) :
        target.name === 'lastName' ? setLastName(target.value) :
        target.name === 'email' ? setEmail(target.value) : 
        target.name === 'password' ? setPassword(target.value) : 
        target.name === 'role' ? setRole(target.value) : setAgree(target.checked);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const res = await axios.post('/register', { 
                firstName, 
                lastName, 
                email, 
                password, 
                role 
            });
            
            setState({ 
                user: res.data.user, 
                token: res.data.token 
            });

            localStorage.setItem('Strait_User', JSON.stringify({ 
                user: res.data.user, 
                token: res.data.token 
            }));

            setFirstName("")
            setLastName("")
            setEmail("")
            setPassword("")
            setRole("")

            Notify(res.data.message, "success");
        } 
        catch (err) {
            Notify(err?.response?.data?.error || "Something went wrong!", "error");
        }
    }

    const Notify = (message, type) => {
        setMessage(message);
        setType(type);
        setLoading(false);

        setTimeout(() => {
            setMessage("Please login");
        }, 1500);
        
        setTimeout(() => {
            setMessage("");
            setType("");
            Router.push("/auth/login");
        }, 2500);
    }

    return (
        <div className={styles.register}>
            {message && 
                <Alerts 
                    message={message} 
                    type={type}
                />
            }
            <h1 className={styles.heading}>Create Account</h1>
            <AuthForm
                firstName={firstName}
                lastName={lastName}
                email={email}
                password={password}
                role={role}
                selected={selected}
                setSelected={setSelected}
                agree={agree}
                signup={true}
                loading={loading}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}

export default Register