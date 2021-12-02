import React from 'react'
import styled from 'styled-components'
import { Colors, Shadow, Transition, Breakpoint } from '../../variables'
import { InWishListItem, WishListItemType } from '../../interfaces';
import { Link } from 'react-router-dom';

interface WishListItemContentProps {
    clicked: boolean,
    wish: WishListItemType
}

interface StyledDivProps {
    expand: boolean
}

const StyledDiv = styled.div<StyledDivProps>`
    display: ${(StyledDivProps) => (StyledDivProps.expand ? 'block' : 'none')};
    padding: 1rem;
    font-size: 1.3rem;
    font-weight: 600;
    @media (min-width: ${Breakpoint.small}) {
        padding: 1.5rem;
        font-size: 1.5rem;
    }
    @media (min-width: ${Breakpoint.medium}) {
        padding: 2rem;
        font-size: 2rem;
    }
    @media (min-width: ${Breakpoint.large}) {
        padding: 1.5rem;
        font-size: 1.5rem;
    }


    span {
        font-weight: 900;
        font-size: 2rem;
        display: block;
        margin: 1rem 0;
        @media (min-width: ${Breakpoint.small}) {
            font-size: 2.5rem;
            margin: 1.2rem 0;
        }
        @media (min-width: ${Breakpoint.medium}) {
            font-size: 3rem;
            margin: 1.5rem 0;
        }
        @media (min-width: ${Breakpoint.large}) {
            font-size: 2.5rem;
            margin: 1.2rem 0;
        }


        &:last-of-type {
            margin-bottom: 1.5rem;
            @media (min-width: ${Breakpoint.small}) {
                margin-bottom: 2rem;
            }
            @media (min-width: ${Breakpoint.medium}) {
                margin-bottom: 3rem;
            }
            @media (min-width: ${Breakpoint.large}) {
                margin-bottom: 2rem;
            }
        }
    }

    div {
        display: flex;
        width: 100%;

        a {
            background: ${Colors.ternary};
            color: ${Colors.primary};
            box-shadow: ${Shadow.small};
            border-radius: 10px;
            border: none;
            font-size: 1.2rem;
            font-weight: 900;
            padding: 0.75rem 1.25rem;
            cursor: pointer;
            transition: ${Transition.normal};
            width: 100%;
            text-align: center;
            margin-right: 0.5rem;
            @media (min-width: ${Breakpoint.small}) {
                padding: 1rem 2rem;
                font-size: 1.5rem;
                margin-right: 0.75rem;
            }
            @media (min-width: ${Breakpoint.medium}) {
                padding: 1.5rem 2.5rem;
                font-size: 2rem;
                margin-right: 1rem;
            }
            @media (min-width: ${Breakpoint.large}) {
                padding: 1rem 2rem;
                font-size: 1.5rem;
                margin-right: 0.75rem;
            }
            
            &:last-of-type {
                background: ${Colors.accent5};
                margin-right: 0;
                margin-left: 0.5rem;
                @media (min-width: ${Breakpoint.small}) {
                    margin-left: 0.75rem;
                }
                @media (min-width: ${Breakpoint.medium}) {
                    margin-left: 1rem;
                }
                @media (min-width: ${Breakpoint.large}) {
                    margin-left: 0.75rem;
                }

                &:hover {
                    transform: translateY(-5px);
                    background: ${Colors.primary};
                    color: ${Colors.accent5};
                }
            }
            
            &:hover {
                transform: translateY(-5px);
                background: ${Colors.primary};
                color: ${Colors.secondary};
            }
        }
    }
`

const WishListItemContent: React.FC<WishListItemContentProps> = ({ clicked, wish }) => {
    //TODO: add completed yes/no?

    let visitDate = '';
    if(wish.dueDate !== null) {
        visitDate = 'on the: ' +  wish.dueDate;
    } else {
        visitDate = 'next time';
    }

    // create list of involved familymembers
    let inWishList:string = '';
    if(wish.inWishListItem.length > 0) {
        inWishList = wish.inWishListItem.map(inWish => inWish.familyMember.firstname).join(' or ');
    }
    
    const handleClicking = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
    }

    const beautifyDob = (dobMember?: any) => {
        var split = dobMember?.split('on the: ');
        var newDob = split.join('');
        var dob = new Date(`${newDob}`);  
        const date = `${dob.getUTCDay()}/${dob.getUTCMonth()}/${dob.getUTCFullYear()}`;
        return date;
    }

    return (
        <StyledDiv expand={clicked}>
            I want
            <span>{inWishList}</span>
            to bring me
            <span>{wish.content}</span>
            when they visit me
            <span>{beautifyDob(visitDate)}</span>

            <div>
                <a onClick={handleClicking} title="Delete wishlist item" href="/">
                    Delete
                </a>
                <Link to={"my-wishlist/edit"} title={"Edit wishlist item"}>
                    Edit
                </Link>
            </div>
        </StyledDiv>
    )
}

export default WishListItemContent
