import {useState} from "react";
import {
    Box,
    Button,
    Container, Grid,
    Group,
    MantineTheme,
    SimpleGrid, Skeleton,
    Text,
    Textarea,
    TextInput,
    Title,
    useMantineTheme
} from '@mantine/core';
import {Icon as TablerIcon, Photo, Upload, X} from 'tabler-icons-react';
import {Dropzone, DropzoneStatus, IMAGE_MIME_TYPE} from '@mantine/dropzone';
import {useForm} from "@mantine/form";
import {Shell} from "@components/Layout/Shell";
import {dropzoneChildren} from "@components/Content/Dropzone";
export default function Create() {
    const theme = useMantineTheme();
    const [courseTitle, setCourseTitle] = useState("")
    const [courseDescription, setCourseDescription] = useState("")
    const form = useForm({
        initialValues: {
            title: "",
            description: "",
            icon: null
        }
    });

    return (
        <Shell>
            <Title order={2} sx={{textAlign: "center"}}>
                Создание нового курса
            </Title>
            <Box mx="auto" sx={{maxWidth: "30rem"}}>
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <TextInput
                        required
                        label="Название курса"
                        placeholder="Курс Абракадабры"
                        {...form.getInputProps('title')}
                    />

                    <Textarea
                        required
                        label="Описание курса"
                        placeholder="Курс Абракадабры"
                        {...form.getInputProps('description')}
                    />
                    <Box my={"md"}>
                        <Dropzone
                            onDrop={(files) => console.log('accepted files', files)}
                            onReject={(files) => console.log('rejected files', files)}
                            maxSize={3 * 1024 ** 2}
                            accept={IMAGE_MIME_TYPE}
                        >
                            {(status) => dropzoneChildren(status, theme)}
                        </Dropzone>
                    </Box>
                    <Group position="right" mt="md">
                        <Button type="submit" sx={{backgroundColor: '#228be6 !important'}}>Отправить</Button>
                    </Group>
                </form>
            </Box>
        </Shell>
    )
}
