import {AppShell, createStyles} from "@mantine/core";
import {DoubleHeader} from "@components/Layout/Header";
import {FooterSocial} from "@components/Layout/Footer";

export const Shell = ({children, withPadding = true}) => {
    const padding = withPadding ? {} : {
        padding: 0
    }
    return <AppShell
        padding="md"
        header={<DoubleHeader/>}
        footer={<FooterSocial/>}
        styles={(theme) => ({
            main: {
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2],
                minHeight: "82.5vh",
                ...padding
            },
        })}
    >
        {children}
    </AppShell>
}