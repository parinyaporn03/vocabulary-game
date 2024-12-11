import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BiSolidLockAlt, BiSolidLockOpenAlt } from "react-icons/bi";
import { Switch } from "antd";
import "../styles/Switch.css";
type WordType = {
  lang: string;
  word: string;
  index: number;
  handle: (word: string, lang: string) => void;
  canLock?: boolean;
};
function Word({ word, lang, index, handle, canLock }: WordType) {
  const [isLock, setIsLock] = useState(false);
  const [count, setCount] = useState(5);
  const interval = useRef<number>();

  useEffect(() => {
    if (!canLock) return;
    let countdown = 5;

    if (!isLock) {
      interval.current = setInterval(() => {
        countdown--;
        setCount(countdown);
        if (countdown === 0) {
          countdown = 5;
          handle(word, lang);
          clearInterval(interval.current);
        }
      }, 1000);
    } else {
      clearInterval(interval.current);
      setCount(5);
    }
    return () => clearInterval(interval.current);
  }, [isLock]);

  const handleSwitch = (
    checked: boolean,
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setIsLock(!checked);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.3 + index * 0.07,
      }}
      className="p-1"
    >
      <div
        className="border-2 border-black rounded-xl h-[35px] flex p-1 px-2 justify-between items-center cursor-pointer hover:bg-gray-200"
        onClick={(e) => {
          if (isLock) {
            e.preventDefault();
          } else {
            handle(word, lang);
          }
        }}
      >
        <AnimatePresence>
          <div className="flex justify-between w-full  ">
            {word}
            {canLock ? <div className="mr-2 text-lg">{count}</div> : null}
          </div>
        </AnimatePresence>

        {canLock ? (
          <Switch
            checkedChildren={
              <BiSolidLockOpenAlt className="mt-[3.5px]  text-[15px]" />
            }
            unCheckedChildren={<BiSolidLockAlt className="text-[15px]" />}
            defaultChecked
            onClick={(checked, e) => {
              handleSwitch(checked, e);
            }}
          />
        ) : null}
      </div>
    </motion.div>
  );
}
export default Word;
