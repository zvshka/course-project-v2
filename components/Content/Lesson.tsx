import {Box, createStyles, Text} from "@mantine/core";

const useStyles = createStyles((theme) => ({
    box: {
        position: "relative",
        width: "100%",
        // textAlign: "center",
        backgroundColor: theme.colors.gray[1],
        borderRadius: theme.radius.md,
        '&:before': {
            content: `''`,
            display: "block",
            paddingTop: "50%"
        }
    },
    boxContent: {
        position: 'absolute',
        paddingLeft: theme.spacing.sm,
        paddingTop: theme.spacing.sm,
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        // justifyContent: "center",
        // alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height: '100%'
    }
}))

export function Lesson({lesson}) {
    const {classes, theme} = useStyles();
    return <Box className={classes.box}>
        <Box className={classes.boxContent}>
            <Text sx={{fontWeight: 600}}>
                {lesson.title}
            </Text>
            <Text sx={{color: theme.colors.gray[7], fontSize: theme.fontSizes.sm}}>
                Description of lesson Sdsf Wfdw Ssoj
            </Text>
        </Box>
    </Box>
}