import "../styles/globals.css"
// import "../styles/prism.css"
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from 'react-query/devtools'
import {MantineProvider} from '@mantine/core';
import {NotificationsProvider} from "@mantine/notifications";
import {ModalsProvider} from "@mantine/modals";
import Head from "next/head";

const queryClient = new QueryClient()

function MyApp({Component, pageProps}) {
    return <>
        <Head>
            <title>Fantastic Waffle</title>
            <meta charSet="utf-8"/>
            <link rel="shortcut icon" href="/food-waffles.svg"/>
        </Head>
        <QueryClientProvider client={queryClient}>
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                emotionOptions={{key: 'mantine', prepend: false}}
                theme={{
                    colorScheme: 'light',
                }}
            >
                <NotificationsProvider>
                    <ModalsProvider>
                        {/*<QueryClientProvider client={queryClient}>*/}
                        <Component {...pageProps} />
                        <ReactQueryDevtools initialIsOpen={false}/>
                        {/*</QueryClientProvider>*/}
                    </ModalsProvider>
                </NotificationsProvider>
            </MantineProvider>
        </QueryClientProvider>
    </>
}

// MyApp.getInitialProps = ({ctx}: { ctx: GetServerSidePropsContext }) => ({});

export default MyApp
