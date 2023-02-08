
import { AnimatePresence, m } from "framer-motion";
import { IconButton, IconButtonProps } from "./IconButton";
// import { Props } from "../../interfaces";
/**
 * Icon button showing spinner every time its clicked
 *
 * @param {function} onClick - function to be executed on click
 * @param {boolean} isLoading
 * @param {object} rest - IconButton props
 *
 * @returns {*}
 */

const IconButtonFade = ({ children, isLoading, ...rest }: IconButtonProps) => {
  return (
    
    <AnimatePresence mode='wait'>
      <m.span 
        key={`${isLoading}-${rest?.icon}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
          
      >
        <IconButton
          {...rest}
        />
      </m.span>
    </AnimatePresence>
  );
};

export default IconButtonFade