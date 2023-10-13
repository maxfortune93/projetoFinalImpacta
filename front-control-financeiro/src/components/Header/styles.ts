import styled from 'styled-components';

export const Container = styled.header`
    background: var(--blue);
`;

export const Content = styled.div`
    max-width: 1120px ;
    margin: 0 auto;

    padding: 1rem 1rem 10rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    
`;

export const TitleHeader = styled.h2`
    display: inline-block;
    color: white;
    margin-left: 0.3rem;
`;

export const TitleHeaderWithLogo = styled.div`
    display: flex;
    align-items: center;
`;

export const Button = styled.button`

    font-size: 1rem;
    color: #fff;
    background: var(--blue-light);
    border: 0;
    padding: 0 2rem;
    border-radius: 0.25rem;
    height: 3rem;

    transition: filter 0.2s;

    &:hover{
        filter: brightness(0.9);
    }

`;
