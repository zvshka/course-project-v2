import {AppShell, Container} from "@mantine/core";
import {DoubleHeader} from "@components/Header";

export const Shell = ({children}) => {
    return <AppShell
        padding="md"
        header={<DoubleHeader mainLinks={[
            {
                "link": "/",
                "label": "Главная"
            },
            {
                "link": "/courses",
                "label": "Курсы"
            },
        ]}/>}
        // styles={(theme) => ({
        //     main: {backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]},
        // })}
    >
        <Container>
            {children}
        </Container>
    </AppShell>
}