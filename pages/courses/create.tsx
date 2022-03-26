import {useState} from "react";
import {Layout} from "@components/Layout";
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
import {Shell} from "@components/Shell";

function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
    return status.accepted
        ? theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]
        : status.rejected
            ? theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
            : theme.colorScheme === 'dark'
                ? theme.colors.dark[0]
                : theme.colors.gray[7];
}

function ImageUploadIcon({
                             status,
                             ...props
                         }: React.ComponentProps<TablerIcon> & { status: DropzoneStatus }) {
    if (status.accepted) {
        return <Upload {...props} />;
    }

    if (status.rejected) {
        return <X {...props} />;
    }

    return <Photo {...props} />;
}

export const dropzoneChildren = (status: DropzoneStatus, theme: MantineTheme) => (
    <Group position="center" spacing="xl" style={{ pointerEvents: 'none' }}>
        <ImageUploadIcon status={status} style={{ color: getIconColor(status, theme) }} size={80} />

        <Group position={"center"}>
            <Text size="xl" inline>
                Drag images here or click to select files
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
                Only 1 image file
            </Text>
        </Group>
    </Group>
);
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
                        <Button type="submit">Отправить</Button>
                    </Group>
                </form>
            </Box>
        </Shell>
    )
}
