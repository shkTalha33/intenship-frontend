import React from 'react'
import {motion,AnimatePresence} from "framer-motion"

export default function AuthAnimation({children,initial={opacity:0},animate={opacity:1},transition={duration:1}}) {
  return (
    <AnimatePresence>
       <motion.div  initial={initial} animate={animate} transition={transition}>
            {children}
       </motion.div>
    </AnimatePresence>
  )
}
