import {Title} from '@mantine/core';
import {Shell} from "@components/Layout/Shell";
import {CourseCreationForm} from "@components/Content/Forms/CourseCreationForm";

export default function Create() {
    return (
        <Shell>
            <Title order={2} sx={{textAlign: "center"}}>
                Создание нового курса
            </Title>
            <CourseCreationForm/>
        </Shell>
    )
}
