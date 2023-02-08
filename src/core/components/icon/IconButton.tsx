import { forwardRef, useState } from "react";

import { IconButton as MUIIconButton, Tooltip } from "@mui/material";
import { linkProps } from "../../utils/router";
import Spinner from "../loading/Spinner";
import Icon, { IconProps } from "./Icon";
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
export const IconButtonWithFeedback = ({ onClick, isLoading, ...props }: IconButtonProps) => {
  const [feedback, setFeedback] = useState(false);

  const handleClick = () => {
    if (!feedback) {
      setFeedback(true);
      setTimeout(() => setFeedback(false), 600);
    }
  };

  return (
    <IconButton
      {...props}
      isLoading={isLoading}
      onClick={(e: any) => {
        handleClick();
        if (onClick) {
          onClick(e);
        }
      }}
    />
  );
};


export interface IconButtonProps extends IconProps {
  isLoading?: boolean;
  onClick?: (o: any) => any
  tooltip?: string;
  href?: string;
  disabled?: boolean;
  component?: any;
  icon: string;
  type?: string;
  color?: any;
  overlay?: boolean;
}
export const IconButton = forwardRef<any, IconButtonProps>(
  ({ color="inherit", overlay, isLoading, onClick, component, tooltip, href, sx, disabled, ...rest }, ref) => {
    const btn = (
      <MUIIconButton
        ref={ref}
        aria-label={rest.icon || "icon button"}
        color={color}
        sx={{
          ...(overlay && {
            bgcolor: "background.overlay",
            color: "text.primary",
            "&.Mui-disabled":{ 
              bgcolor: "background.overlay",
              color: "text.primary",
            }
          }),
          transition: (theme)=> theme.transitions.create("transform", {
            duration: theme.transitions.duration.shorter,
          }),
          "&:hover":{
            // transform: "scale(1.05)",
            boxShadow: (theme)=> theme.shadows[5],
            
          },
          
          ...sx,
        }}
        {...{ disabled, component, onClick }}
        {...(href && { ...linkProps(href) })}
        {...(isLoading && { disabled: true })}
      >
        {isLoading ? <Spinner isLoading={true} /> : <Icon {...rest} />}
      </MUIIconButton>
    );

    if (tooltip && !disabled) {
      return (
        <Tooltip title={tooltip} arrow>
          {btn}
        </Tooltip>
      );
    }
    return btn;
  }
);
