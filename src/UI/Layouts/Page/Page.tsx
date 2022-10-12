import React from 'react'
import './Page.styled.ts'
import { Wrapper } from './Page.styled'

export const Page: React.FC<{ children: React.ReactNode }> = (props) => {
    return (
        <Wrapper >
            {props.children}
        </Wrapper>
    )
}