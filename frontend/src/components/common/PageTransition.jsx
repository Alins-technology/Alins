import { motion } from 'framer-motion'
import { EASE } from '../../lib/motion'

const variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE.standard } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.3, ease: EASE.final } },
}

export default function PageTransition({ children }) {
  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={variants}>
      {children}
    </motion.div>
  )
}
