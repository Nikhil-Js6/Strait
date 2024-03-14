import styles from '../styles/Footer.module.css'

const Footer = () => {
    return (
        <div className={styles.copyright}>
            <p>Made with ❤️ by 
                <span className={styles.colored}>
                   <a href="https://nikhil-js6.netlify.app/" target="blank">Nikhil</a>
                </span>
                <span className={styles.brand}>@Strait</span> 
            </p>
        </div>
    )
}

export default Footer