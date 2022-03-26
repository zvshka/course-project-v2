import "../styles/globals.css"
import "../styles/prism.css"
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from 'react-query/devtools'
import {MantineProvider} from '@mantine/core';
import { NotificationsProvider } from "@mantine/notifications";

const queryClient = new QueryClient()

function MyApp({Component, pageProps}) {
    return <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        emotionOptions={{ key: 'mantine', prepend: false }}
        theme={{
            /** Put your mantine theme override here */
            colorScheme: 'light',
        }}
    >
        <NotificationsProvider>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
                <ReactQueryDevtools initialIsOpen={false}/>
            </QueryClientProvider>
        </NotificationsProvider>
    </MantineProvider>
}

export default MyApp
