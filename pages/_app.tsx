import "../styles/globals.css"
import "../styles/prism.css"
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from 'react-query/devtools'
import {MantineProvider} from '@mantine/core';
import {NotificationsProvider} from "@mantine/notifications";
import {ModalsProvider} from "@mantine/modals";

const randomChars = (length) => {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            characters.length));
    }
    return result;
}

const queryClient = new QueryClient()

function MyApp({Component, pageProps}) {
    return <QueryClientProvider client={queryClient}>
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            emotionOptions={{key: 'mantin', prepend: false}}
            theme={{
                /** Put your mantine theme override here */
                colorScheme: 'light',
            }}
        >
            <NotificationsProvider>
                <ModalsProvider>
                    <Component {...pageProps} />
                    <ReactQueryDevtools initialIsOpen={false}/>

                </ModalsProvider>
            </NotificationsProvider>
        </MantineProvider>
    </QueryClientProvider>
}

export default MyApp
