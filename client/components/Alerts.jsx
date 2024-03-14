import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import styles from '../styles/Alert.module.css';

const Alerts = ({ message, type }) => {

    const setIcon = () => {
        return ( 
            type === 'success' ? <DoneOutlinedIcon /> :
            type === 'error' ? <ErrorOutlineOutlinedIcon /> :
            type === 'info' ? <InfoOutlinedIcon /> : <WarningAmberOutlinedIcon />
        )
    }

    const setClass = () => {
        return ( 
            type === 'success' ? styles.success : 
            type === 'error' ? styles.error :
            type === 'info' ? styles.info : styles.warning
        )
    }

    return (
        <div className={`${styles.alert} ${setClass()}`}>
            {setIcon()}
            <span>{message}</span>
        </div>
    )
}

export default Alerts