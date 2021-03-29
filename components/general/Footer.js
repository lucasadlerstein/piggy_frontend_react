import React from 'react';
import styled from '@emotion/styled';

const ThankYouP = styled.p`
    color: white;
    text-align: center;
    background-color: black;
    padding: 1rem 0 1rem 0;
    transition: all 2s ease;
    &:hover {
        color: black;
    }
`;


const Footer = () => {
    return ( 
        <ThankYouP>Gracias por usar Piggy</ThankYouP>
    );
}
 
export default Footer;