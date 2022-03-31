import {Icon as TablerIcon, Photo, Upload, X} from "tabler-icons-react";
import {DropzoneStatus} from "@mantine/dropzone";
import {Group, MantineTheme, Text} from "@mantine/core";

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