import React from "react";
import styled from "styled-components";

const StyledButton = styled.button<ButtonProps>`
  cursor: pointer;
  border: 0;
  padding: 8px 14px;
  transition: 0.3s;
  ${({ theme, variant }) => {
    return {
      backgroundColor: theme.colors[variant].main,
      color: theme.colors[variant].text,
      "&:hover": {
        backgroundColor: theme.colors[variant].light,
      },
      "&:focus": {
        backgroundColor: theme.colors[variant].dark,
      },
    };
  }}
`;

type ButtonProps = {
  children: React.ReactNode;
  /**
   * Define the disabled state
   */
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * This prop is used based on the variants of themes
   */
  variant?: "primary" | "accent";
};

export default function Button({ children, ...props }: ButtonProps) {
  return <StyledButton {...props}>{children}</StyledButton>;
}

Button.defaultProps = {
  disabled: false,
  variant: "primary",
};
