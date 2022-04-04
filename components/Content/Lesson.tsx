import {Box, createStyles} from "@mantine/core";

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
            paddingTop: "50%"
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

export function Lesson({children = "", lesson}) {
    const {classes, theme} = useStyles();
    return <Box className={classes.box}>
        <Box className={classes.boxContent}>
            {children}
        </Box>
    </Box>
}