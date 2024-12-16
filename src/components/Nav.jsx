import walletIcon from '../assets/images/wallet-icon.svg'
import depositIcon from '../assets/images/deposit-icon.svg'
import withdrawIcon from '../assets/images/withdraw-icon.svg'
import { Link } from 'react-router-dom'

export default function Nav() {
    return (
        <nav>
            <ul>
                <Link to={'/'}>
                    <li>
                        <img src={walletIcon} />
                        <span>Account</span>
                    </li>
                </Link>

                <Link to={'/deposit'}>
                    <li>
                        <img src={depositIcon} />
                        <span>Deposit</span>
                    </li>
                </Link>
                
                <Link to={'/withdraw'}>
                    <li>
                        <img src={withdrawIcon} />
                        <span>Withdraw</span>
                    </li>
                </Link>
            </ul>
        </nav>
    )
}
