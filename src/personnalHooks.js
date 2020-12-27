import { useState } from "react"


export const useHandleHeight = (initialValue = true ,ref, addHeight = 0) => {
   const [isShow, setIsShow] = useState(initialValue);

   const manageValue = () => {
       if (isShow) {
        const height = ref.current.scrollHeight + addHeight;
        ref.current.style.height = `${height}px`;
      } else {
        ref.current.style.height = `0px`;
      }
        setIsShow((value) => (!value));
   }

  return [isShow, manageValue];
}