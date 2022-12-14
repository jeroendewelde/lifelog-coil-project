import React from 'react'
import styled from 'styled-components';
import { Colors, Breakpoint, Transition } from '../../variables';

interface ButtonIconProps {
    children: React.ReactNode,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
    background?: string
}

interface StyledButtonProps {
    backgroundColor?: string
}

const StyledButton = styled.button<StyledButtonProps>`
    background: ${(StyledButtonProps) => (StyledButtonProps.backgroundColor !== undefined ? StyledButtonProps.backgroundColor : Colors.secondary)};
    padding: 0.3125rem 0.625rem;
    border-radius: 50%;
    transition: ${Transition.normal};
    color: ${Colors.primary};
    border: 4px solid transparent;
    
    @media (min-width: ${Breakpoint.small}) {
        padding: 0.375rem 0.75rem;
    }
    @media (min-width: ${Breakpoint.medium}) {
        padding: 0.52rem 1rem;
    }
    @media (min-width: ${Breakpoint.large}) {
        padding: 0.375rem 0.75rem;
    }

    &:hover {
        border-color: ${(StyledButtonProps) => (StyledButtonProps.backgroundColor !== undefined ? StyledButtonProps.backgroundColor : Colors.secondary)};
        background: ${(StyledButtonProps) => (StyledButtonProps.backgroundColor !== undefined ? Colors.primary : Colors.primary)};
        color: ${(StyledButtonProps) => (StyledButtonProps.backgroundColor !== undefined ? StyledButtonProps.backgroundColor : Colors.secondary)};
    }

    svg {
        width: 1.3rem !important;
        height: auto;
        @media (min-width: ${Breakpoint.small}) {
            width: 1.5rem !important;
        }
        @media (min-width: ${Breakpoint.medium}) {
            width: 2rem !important;
        }
        @media (min-width: ${Breakpoint.large}) {
            width: 1.5rem !important;
        }
    }
`

const ButtonIcon: React.FC<ButtonIconProps> = ({ children, onClick, background }) => {
    return (
        <StyledButton backgroundColor={background} onClick={onClick}>
            {children}
        </StyledButton>
    )
}

export default ButtonIcon;
