import React from 'react'
import { Button } from 'antd'
import { motion } from 'framer-motion'

export default function HeroText({ bg, text1, text2, text3 }) {

  const curoselVarrient = {
    hidden: { y: 100, opacity: 0 },
    view: {
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        delay: 1,
        duration: 1,
      },
    },
  };

  return (
    <>
      <img src={bg} />
      <div className="text-overlay text-white font-serif">
        <motion.h2 className=" text-5xl font-bold" variants={curoselVarrient} initial="hidden" whileInView="view">{text1}</motion.h2>
        <motion.p className="text-4xl font-thin" variants={curoselVarrient} initial="hidden" whileInView="view">
          <span>{text2}</span>
        </motion.p>
        <motion.p className="text-4xl font-thin" variants={curoselVarrient} initial="hidden" whileInView="view">
          <span>{text3}</span>
        </motion.p>
        <motion.p className="text-2xl font-thin text-gray-400" variants={curoselVarrient} initial="hidden" whileInView="view">
          New trending shoes
        </motion.p>
        <Button type="submit" variants={curoselVarrient} initial="hidden" whileInView="view" className="text-sm bg-gray-500 text-white border-0 m-3 h-10 rounded-lg hover:text-white hover:bg-slate-600 transition-all ease-in duration-200">
          Shop Collection
        </Button>
      </div>
    </>
  );
}