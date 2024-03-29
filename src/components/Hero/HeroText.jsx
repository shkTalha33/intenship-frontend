import React from 'react'
import { Button } from 'antd'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';

export default function HeroText({ bg, text1, text2, text3 }) {

    const navigate =  useNavigate()
  const curoselVarrient = {
    hidden: { y: 100, opacity: 0 },
    view: {
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        delay: .1,
        duration: 1,
      },
    },
  };

  return (
    <motion.div key={text1}>
      <img src={bg} />
      <motion.div  className="text-overlay text-white font-serif"  >
         <motion.div variants={curoselVarrient} initial="hidden" whileInView="view" viewport={{amount:0.25}}>
        <motion.h2 className=" text-5xl font-bold" >{text1}</motion.h2>
        <motion.p className="text-4xl font-thin">
          <span>{text2}</span>
        </motion.p>
        <motion.p className="text-4xl font-thin">
          <span>{text3}</span>
        </motion.p>
        <motion.p className="text-2xl font-thin text-gray-400">
          New trending shoes
        </motion.p>
        <Button type="submit" onClick={()=>navigate("/products")}  style={{background:"#285850"}} className="text-sm  text-white border-0 m-3 h-10 rounded-lg hover:text-white hover:bg-slate-600 transition-all ease-in duration-200">
          Shop Collection
        </Button>
         </motion.div>
      </motion.div>
    </motion.div>
  );
}