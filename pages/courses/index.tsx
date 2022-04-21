import useUser from "@hooks/useUser";
import useCourses from "@hooks/useCourses";
import {Box, Button, Group, Paper, SimpleGrid, Title} from "@mantine/core";
import {useNotifications} from "@mantine/notifications";
import {Shell} from "@components/Layout/Shell";
import {useModals} from "@mantine/modals";
import {CourseCreationForm} from "@components/Content/Forms/CourseCreationForm";
import {Course} from "@components/Content/Course";

export default function Courses() {
    const modals = useModals()
    const userQuery = useUser()
    const coursesQuery = useCourses()

    const openCreatingModal = () => {
        modals.openModal({
            title: "Создание курса",
            children: <>
                <CourseCreationForm/>
            </>
        })
    }

    return <Shell>
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
        <SimpleGrid cols={1} mt={"md"} breakpoints={[{minWidth: 'md', cols: 3}, {minWidth: 'xs', cols: 2}]}>
            {coursesQuery.isSuccess && !coursesQuery.isLoading && coursesQuery.data.map((c, i) => (
                <Box key={i}>
                    <Course course={c} isAdmin={userQuery.isSuccess && userQuery.data.role === "ADMIN"}/>
                </Box>
            ))}
        </SimpleGrid>
    </Shell>
}