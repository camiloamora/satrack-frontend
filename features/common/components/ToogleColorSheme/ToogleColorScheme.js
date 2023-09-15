import { useState, useEffect } from 'react';
import { Check, Heading } from '@camiloamora/components'
import { handleClick } from './handlers'
import { initialColorSheme  } from './helpers'

const ToogleColorScheme = () => {

  const [isChecked, setIsChecked] = useState(false);

  useEffect(()=> {
    initialColorSheme({ setIsChecked })
  }, [])

  return (
    <div
      style={{
        display:'flex',
        alignItems: 'center',
        cursor: 'pointer'
      }}
     onClick={handleClick({ isChecked, setIsChecked })}
     >
      <Check isChecked={isChecked}/>
      <Heading>Dark Mode</Heading>
    </div>
  );
}

export default ToogleColorScheme;
