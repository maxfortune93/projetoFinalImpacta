import styled from 'styled-components';

export const Container = styled.div`
    margin-top: 4rem;

    table {

        width: 100%;
        border-spacing: 0  0.5rem;

        th {
            color: var(--text-body);
            font-weight: 400;
            padding: 1rem 2rem;
            text-align: left;
            line-height: 1.5em;
        }

        td {
            padding: 1rem 2rem;
            border: 0;
            background: var(--shape);
            color: var(--text-body);        

            &:first-child {
                color: var(--text-title);
                border-top-left-radius: 0.25rem;
                border-bottom-left-radius: 0.25rem;
            }

            &:last-child {
                border-top-right-radius: 0.25rem;
                border-bottom-right-radius: 0.25rem;
            }

            &.deposit {
            color: var(--green);
            }

            &.withdraw {
            color: var(--red);
            }

        }

       
    }
`;

export const menuFontSize = {
    fontSize: '1rem',
    fontWeight: '400',
}