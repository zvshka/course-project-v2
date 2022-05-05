import {Box, Text} from "@mantine/core";
import {CheckIcon, Cross1Icon} from "@modulz/radix-icons";

export const requirements = [
    {re: /\d/, label: 'Содержит числа'},
    {re: /[a-z]/, label: 'Содержит символ нижнего регистра'},
    {re: /[A-Z]/, label: 'Содержит символ верхнего регистра'},
    {re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Содержит спец. символ'},
];

export function getStrength(password: string) {
    let multiplier = password.length > 5 ? 0 : 1;

    requirements.forEach((requirement) => {
        if (!requirement.re.test(password)) {
            multiplier += 1;
        }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

export default function PasswordRequirement({meets, label}: { meets: boolean; label: string }) {
    return (
        <Text
            color={meets ? 'teal' : 'red'}
            sx={{display: 'flex', alignItems: 'center'}}
            mt={7}
            size="sm"
        >
            {meets ? <CheckIcon/> : <Cross1Icon/>} <Box ml={10}>{label}</Box>
        </Text>
    );
}