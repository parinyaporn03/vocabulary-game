import { useState } from "react";
import Data from "./data/words.json";
import Box from "./components/Box";
import "./App.css";
import TH from "./assets/Thai.png";
import ENG from "./assets/ENG.png";
import { motion } from "framer-motion";
type WordType = {
  lang: string;
  word: string;
};
function App() {
  const [allWord, setAllWord] = useState<WordType[]>(Data);
  const [thaiWord, setThaiWord] = useState<WordType[]>([]);
  const [engWord, setEngWord] = useState<WordType[]>([]);
  const handleClick = (word: string, lang: string) => {
    if (lang === "TH") {
      setThaiWord((prev) => [...prev, { lang: lang, word: word }]);
    } else if (lang === "EN") {
      setEngWord((prev) => [...prev, { lang: lang, word: word }]);
    }
    setAllWord((prev) => prev.filter((item) => item.word !== word));
  };
  const handleBack = (word: string, lang: string) => {
    if (lang === "TH") {
      setThaiWord((prev) => prev.filter((item) => item.word !== word));
    } else if (lang === "EN") {
      setEngWord((prev) => prev.filter((item) => item.word !== word));
    }
    setAllWord((prev) => [...prev, { word: word, lang: lang }]);
  };

  return (
    <>
      <div className="h-screen flex flex-col justify-evenly items-center px-2  sm:flex-col lg:flex-row select-none">
        <div className="flex flex-col justify-center items-center ">
          <div className="h-[4rem] mb-5"></div>
          <Box listWord={allWord} handle={handleClick} />
        </div>
        <div className="flex flex-col justify-center items-center">
          <motion.button
            className="button mb-5"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <img src={TH} width={50} className="rounded-md " />
            <div className="active_line"></div>
            <span className="text">TH</span>
          </motion.button>
          <Box listWord={thaiWord} handle={handleBack} canLock />
        </div>
        <div className="flex flex-col justify-center items-center">
          <motion.button
            className="button mb-5"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            style={{ boxShadow: "0px 0px 20px 3px gray" }}
          >
            <img src={ENG} width={50} className="rounded-md" />
            <div className="active_line"></div>
            <span className="text">ENG</span>
          </motion.button>
          <Box listWord={engWord} handle={handleBack} canLock />
        </div>
      </div>
    </>
  );
}

export default App;
