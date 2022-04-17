import {AppShell, Container, createStyles} from "@mantine/core";
import {DoubleHeader} from "@components/Layout/Header";

const useStyles = createStyles((theme) => ({
    mainContainer: {
        minHeight: "100vh",
        [theme.fn.smallerThan("md")]: {
            paddingLeft: 0,
            paddingRight: 0
        }
    }
}))

export const Shell = ({children}) => {
    const {classes, cx} = useStyles();
    return <AppShell
        padding="md"
        header={<DoubleHeader/>}
        styles={(theme) => ({
            main: {backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]},
        })}
    >
        <Container className={classes.mainContainer}>
            {/*<Navigation/>*/}
            {children}
        </Container>
    </AppShell>
}