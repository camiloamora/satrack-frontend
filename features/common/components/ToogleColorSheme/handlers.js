import { setColorSheme } from './helpers'

export const handleClick = ({ isChecked, setIsChecked }) => () => {
  setColorSheme({ isDarkMode: !isChecked, setIsChecked })
  //isChecked ? setLightMode({ setIsChecked }) : setDarkMode({ setIsChecked })
}
