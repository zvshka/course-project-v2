import useUser from "@hooks/useUser";
import useCourses from "@hooks/useCourses";
import {Button, Grid, Group, MultiSelect, Paper, SimpleGrid, TextInput, Title} from "@mantine/core";
import {useModals} from "@mantine/modals";
import {CourseCreationForm} from "@components/Content/Forms/CourseCreationForm";
import useBadges from "@hooks/useBadges";
import {useEffect, useRef, useState} from "react";
import {useDebouncedValue, useListState} from "@mantine/hooks";
import {useQueryClient} from "react-query";
import {CoursesPage} from "@components/Content/CoursesPage";
import {useInView} from 'react-intersection-observer'

export default function Courses() {
    const {ref, inView} = useInView()

    const modals = useModals()
    const queryClient = useQueryClient()
    const userQuery = useUser()
    const badgesQuery = useBadges()
    const [badges, setBadges] = useState([])

    const [title, setTitle] = useState("")
    const [selectedBadges, badgesHandlers] = useListState([])

    const coursesQuery = useCourses()

    useEffect(() => {
        if (badgesQuery.isSuccess && badgesQuery.data) {
            setBadges(badgesQuery.data.map(badge => ({
                value: badge.id,
                label: badge.label
            })))
        }
    }, [badgesQuery.data, badgesQuery.isSuccess])

    useEffect(() => {
        if (inView && coursesQuery.hasNextPage) {
            coursesQuery.fetchNextPage()
        }
    }, [inView])

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
        <Grid columns={24}>
            <Grid.Col sm={6} md={8} lg={7}>
                <Paper shadow={'lg'} px={'sm'} py={'sm'} mt={"md"}>
                    Фильтрация и поиск
                </Paper>
                <Paper shadow={'lg'} px={'sm'} py={'sm'} mt={"xs"}>
                    <TextInput label={"Название"} onChange={e => setTitle(e.currentTarget.value)}/>
                    <MultiSelect data={badges} label={'Категории'} onChange={value => badgesHandlers.setState(value)}
                                 clearable searchable/>
                </Paper>
            </Grid.Col>
            <Grid.Col sm={18} md={16} lg={17}>
                <SimpleGrid cols={1} mt={"md"}
                            breakpoints={[{minWidth: 'lg', cols: 3}, {minWidth: 'xs', cols: 2}]}>
                    {coursesQuery.isSuccess && coursesQuery.data.pages.map((data, i) => (
                        // <Box key={i}>
                        //     <Course course={c} isAdmin={userQuery.isSuccess && userQuery.data.role === "ADMIN"}/>
                        // </Box>
                        <CoursesPage courses={data.courses}
                                     isAdmin={userQuery.isSuccess && userQuery.data.role === "ADMIN"} key={i}/>
                    ))}
                </SimpleGrid>
                <span style={{visibility: 'hidden'}} ref={ref}>
                    intersection observer marker
                </span>
            </Grid.Col>
        </Grid>
    </>
}

Courses.haveLayout = true