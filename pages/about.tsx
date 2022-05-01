import {Group, Paper, Title} from "@mantine/core";

export default function About() {
    return <>
        <Paper shadow={'lg'} px={'sm'} py={'sm'}>
            <Group position={"apart"}>
                <Title order={3}>
                    Что это за сайт и кто его сделал?
                </Title>
            </Group>
        </Paper>
    </>
}

About.haveLayout = true