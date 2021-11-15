import React from 'react'
import styled from 'styled-components'
import fallback from '../../assets/images/anna_boloise.jpg'
import { Colors, Shadow } from '../../variables'

interface AboutMeProps {
    profile: any
}

const StyledDiv = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 2rem;
    }
`

const StyledImg = styled.div`
    overflow: hidden;
    width: 16rem;
    height: 16rem;
    border-radius: 10px;
    box-shadow: ${Shadow.small};
    margin-bottom: 2rem;

    img {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
`

const StyledUl = styled.ul`
    /* display: flex;
    flex-direction: column; */
    width: 100%;

    li {
        background: ${Colors.secondary};
        box-shadow: ${Shadow.small};
        border-radius: 10px;
        margin-bottom: 1.5rem;
        padding: 1.5rem;
        
        &:last-of-type {
            margin-bottom: 0;
        }
        
        p:first-of-type {
            font-size: 1.5rem;
            font-weight: 500;
            margin-bottom: 1rem;
        }
        
        p:last-of-type {
            font-size: 2.5rem;
            font-weight: 700;
        }
    }
    `

const SpecialLi = styled.li`
    padding: 0 !important;
    display: flex;
    background: ${Colors.white} !important;
    box-shadow: none !important;
    
    div {
        border-radius: 10px;
        padding: 1.5rem;
        background: ${Colors.secondary};
        box-shadow: ${Shadow.small};
        
        &:first-of-type {
            margin-right: 1.5rem;
            width: 80%;
        }
        
        &:last-of-type {
            width: 20%;
        }
    }
`

const AboutMe: React.FC<AboutMeProps> = ({profile}) => {
    return (
        <StyledDiv>
            {/* <img src={`../../assets/images/${profile.image}`} alt={`${profile.firstName} ${profile.lastName}`} /> */}
            <StyledImg>
                <img src={fallback} alt={`${profile.firstName} ${profile.lastName}`} />
            </StyledImg>

            <h2>{profile.firstName} {profile.lastName}</h2>

            <StyledUl>
                <SpecialLi>
                    <div>
                        <p>Date of birth</p>
                        <p>{profile.dob}</p>
                    </div>

                    <div>
                        <p>Gender</p>
                        <p>{profile.gender}</p>
                    </div>
                </SpecialLi>

                <li>
                    <p>Status</p>
                    <p>{profile.maritalStatus} of {profile.partner}</p>
                </li>

                <li>
                    <p>Nursing home</p>
                    <p>{profile.nursingHome}</p>
                </li>

                <li>
                    <p>Location</p>
                    <p>{profile.location}</p>
                </li>

                <li>
                    <p>Carreer</p>
                    <p>{profile.carreer}</p>
                </li>
            </StyledUl>
        </StyledDiv>

    )
}

export default AboutMe