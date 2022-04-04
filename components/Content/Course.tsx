import React from 'react';
import {createStyles, Box} from '@mantine/core';
import Link from "next/link";

const useStyles = createStyles((theme) => ({
    box: {
        position: "relative",
        width: "100%",
        textAlign: "center",
        backgroundColor: theme.colors.gray[4],
        borderRadius: theme.radius.md,
        '&:before': {
            content: `''`,
            display: "block",
            paddingTop: "100%"
        }
    },
    boxContent: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        height: '100%'
    }
}))

export function Course({children, course}) {
    const {classes, theme} = useStyles();
    return <Box className={classes.box}>
        <Link href={`/courses/${course.id}`} passHref>
            <Box component={"a"} className={classes.boxContent}>
                {children}
            </Box>
        </Link>
    </Box>
}