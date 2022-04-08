import {Box, createStyles, Text} from "@mantine/core";
import Link from "next/link"

const useStyles = createStyles((theme) => ({
    box: {
        position: "relative",
        width: "100%",
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
        padding: theme.spacing.sm,
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        height: '100%'
    }
}))

export function Lesson({lesson}) {
    const {classes, theme} = useStyles();
    return <Box className={classes.box}>
        <Link href={`/lessons/${lesson.id}`} passHref>
            <Box className={classes.boxContent} component={'a'}>
                <Text sx={{fontWeight: 600}}>
                    {lesson.title}
                </Text>
                <Text sx={{color: theme.colors.gray[7], fontSize: theme.fontSizes.sm}}>
                    {lesson.description}
                </Text>
            </Box>
        </Link>
    </Box>
}