import { LazyMotion, domAnimation} from 'motion/react'
import { Link } from 'react-router';
import { AppBackground } from './AppBackground';
import './Profile.css';
export function Profile () {

    const testName = "hp";
    return(
        <>
        <AppBackground />
            <section className="profile-page">
                <h2 className="profile-name">How's it going {testName}?</h2>
                <Link to='/' className="nav-links">Home</Link>
            </section>
        </>
    )
}