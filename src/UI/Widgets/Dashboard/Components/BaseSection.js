import { Grid, Typography, Stack, Box, CardHeader, CardContent } from "@mui/material"
import *as Styled from './Styles/StyledComponents'

import React from 'react'

/**
 * 
 * @param {String || component } title - title of the section 
 * @param {String || component } subtitle - subtitle of the section 
 * @param {String || component } actions - actions of the section
 * @returns 
 */
export const BaseSection = (props) => {
    const { title, subtitle, actions, children, ...restOfProps } = props;
    return (
        <Styled.SectionCard {...restOfProps}>
            {(title || subtitle) && (
                <CardHeader
                    title={<Styled.SectionTitle>{props.title}</Styled.SectionTitle>}
                    subheader={props.subtitle instanceof String ? <Styled.SectionSubTitle gutterBottom>{props.subtitle}</Styled.SectionSubTitle> : props.subtitle}
                    action={props.actions}
                />
            )}
            <CardContent>
                {props.children}
            </CardContent>
        </Styled.SectionCard>
    )
}

export default BaseSection
