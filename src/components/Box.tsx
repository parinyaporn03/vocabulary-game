import React, { useEffect, useState } from "react";
import { SignalFilled, WifiOutlined } from "@ant-design/icons";
import Battery from "../assets/low-battery.png";
import Word from "../components/Word";
import WordType from "../App";

type WordType = {
  lang: string;
  word: string;
};
type PropType = {
  listWord: WordType[];
  handle: (word: string, lang: string) => void;
  canLock?: boolean;
};

const Box = ({ listWord, handle, canLock }: PropType) => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return clearInterval(interval);
  }, []);

  return (
    <div
      className="max-h-auto h-[520px] w-[280px] border-2 border-gray-700 rounded-[2rem] p-[5px]  bg-black relative mb-14 lg:mb-0"
      style={{ boxShadow: "0px 0px 20px 3px gray" }}
    >
      <div className=" border-2 border-black rounded-[2rem] h-[505px] bg-white p-[10px] ">
        <div className="flex justify-around items-center ">
          <div className="text-[13px] w-[32px]">
            {time.getHours()}:{time.getMinutes()}
          </div>

          <div className="w-full px-11 pr-6">
            <div className="bg-black p-[6px] rounded-3xl">
              <div className="flex justify-end">
                <div className="bg-gray-600 p-[3px] rounded-full border-2 border-gray-700 "></div>
              </div>
            </div>
          </div>

          <div className="flex">
            <SignalFilled
              style={{
                width: "15px",
                paddingLeft: "2px",
                paddingRight: "2px",
              }}
            ></SignalFilled>
            <WifiOutlined
              style={{
                width: "17px",
                paddingLeft: "2px",
                paddingRight: "2px",
              }}
            ></WifiOutlined>
          </div>

          <img
            src={Battery}
            style={{
              width: "19px",
              paddingLeft: "2px",
              paddingRight: "2px",
            }}
          ></img>
        </div>

        <div
          className="scollbar py-2 px-[3px] h-[448px] overflow-auto"
          style={{
            scrollbarWidth: "none",
          }}
        >
          {listWord.map((item, index) => (
            <Word
              word={item.word}
              lang={item.lang}
              index={index}
              handle={handle}
              key={item.word}
              canLock={canLock}
            ></Word>
          ))}
        </div>

        <div className="px-14  pt-3">
          <div className="bg-black p-[1.5px] rounded-3xl "></div>
        </div>
      </div>
    </div>
  );
};

export default Box;
