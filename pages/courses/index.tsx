import useUser from "@hooks/useUser";
import useCourses from "@hooks/useCourses";
import {Box, Button, Grid, Group, MultiSelect, Paper, SimpleGrid, TextInput, Title} from "@mantine/core";
import {useModals} from "@mantine/modals";
import {CourseCreationForm} from "@components/Content/Forms/CourseCreationForm";
import {Course} from "@components/Content/Course";
import {Search} from "tabler-icons-react";
import useBadges from "@hooks/useBadges";
import {useEffect, useState} from "react";

export default function Courses() {
    const modals = useModals()
    const userQuery = useUser()
    const coursesQuery = useCourses()
    const badgesQuery = useBadges()
    const [badges, setBadges] = useState([])
    useEffect(() => {
        if (badgesQuery.isSuccess && badgesQuery.data) {
            setBadges(badgesQuery.data.map(badge => ({
                value: badge.id,
                label: badge.label
            })))
        }
    }, [badgesQuery.data, badgesQuery.isSuccess])

    const openCreatingModal = () => {
        modals.openModal({
            title: "Создание курса",
            children: <>
                <CourseCreationForm/>
            </>
        })
    }

    return <>
        <Paper shadow={'lg'} px={'sm'} py={'sm'}>
            <Group position={"apart"}>
                <Title order={3}>
                    Курсы
                </Title>
                {userQuery.isSuccess && userQuery.data.role === "ADMIN" && <Button onClick={openCreatingModal}>
                    Создать курс
                </Button>}
            </Group>
        </Paper>

        {/*<Paper shadow={'lg'} px={'sm'} py={'sm'} mt={"md"}>*/}
        {/*    <Group position={'apart'} grow>*/}
        {/*        <Group direction={"column"} grow>*/}
        {/*            <TextInput placeholder={"Название"}/>*/}
        {/*            <MultiSelect placeholder={"Теги"} data={badges} clearable maxSelectedValues={4}/>*/}
        {/*        </Group>*/}
        {/*        <Button leftIcon={<Search size={20}/>}>Найти</Button>*/}
        {/*    </Group>*/}
        {/*</Paper>*/}

        <Grid columns={24}>
            <Grid.Col sm={6} md={8} lg={7}>
                <Paper shadow={'lg'} px={'sm'} py={'sm'} mt={"md"}>
                    Фильтрация и поиск
                </Paper>
                <Paper shadow={'lg'} px={'sm'} py={'sm'} mt={"xs"}>
                    <TextInput label={"Название"}/>
                    <MultiSelect data={badges} label={'Категории'} clearable searchable/>
                </Paper>
            </Grid.Col>
            <Grid.Col sm={18} md={16} lg={17}>
                <SimpleGrid cols={1} mt={"md"} breakpoints={[{minWidth: 'lg', cols: 3}, {minWidth: 'xs', cols: 2}]}>
                    {coursesQuery.isSuccess && !coursesQuery.isLoading && coursesQuery.data.map((c, i) => (
                        <Box key={i}>
                            <Course course={c} isAdmin={userQuery.isSuccess && userQuery.data.role === "ADMIN"}/>
                        </Box>
                    ))}
                </SimpleGrid>
            </Grid.Col>
        </Grid>
    </>
}

Courses.haveLayout = true