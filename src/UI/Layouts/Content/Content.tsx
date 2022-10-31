import React from "react"
import { ContentWrapper } from "./Content.styled"

export const Content: React.FC<{ children: React.ReactNode }> = (props) => {
    return (
        <ContentWrapper>
            {props.children}
        </ContentWrapper>
    )
}