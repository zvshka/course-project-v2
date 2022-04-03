import React from 'react';
import { Eye, MessageCircle } from 'tabler-icons-react';
import {Card, Text, Group, Center, createStyles, Box} from '@mantine/core';

const useStyles = createStyles((theme) => ({
    box: {
        position: "relative",
        width: "100%",
        textAlign: "center",
        backgroundColor: theme.colors.gray[4],
        '&:before': {
            content: `''`,
            display: "block",
            paddingTop: "100%"
        }
    },
    boxContent: {
        position: 'absolute',
        top:0,
        bottom: 0,
        right: 0,
        left:0,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        height: '100%'
    }
}))

const SkeletonBox = ({children}) => {
    const {classes} = useStyles()
    return <Box className={classes.box}>
        <Box className={classes.boxContent}>
            {children}
        </Box>
    </Box>
}


export function Course({children, course}) {
    const { classes, theme } = useStyles();
    return <Box className={classes.box}>
        <Box className={classes.boxContent}>
            {children}
        </Box>
    </Box>
}