import { Link } from 'react-router-dom'
import logo from '../../assets/alins-logo-transparent.png'

export default function Logo({ className = '' }) {
  return (
    <Link to="/" className={`group flex items-center ${className}`}>
      <img
        src={logo}
        alt="Alins Technologies"
        className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105 sm:h-9"
      />
    </Link>
  )
}
