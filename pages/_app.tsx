import "../styles/globals.css"
import "../styles/prism.css"
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from 'react-query/devtools'
import {MantineProvider} from '@mantine/core';
import {NotificationsProvider} from "@mantine/notifications";
import {ModalsProvider} from "@mantine/modals";
import Head from "next/head";
import {Shell} from "@components/Layout/Shell";
import {useRouter} from "next/router";
import {useEffect} from "react";
import axios from "axios";

const queryClient = new QueryClient()

function MyApp({Component, pageProps}) {
    useEffect(() => {
        const getCsrfToken = async () => {
            const { data } = await axios.get('/api/auth/csrf');
            axios.defaults.headers.post['X-CSRF-Token'] = data.csrfToken;
            axios.defaults.headers.patch['X-CSRF-Token'] = data.csrfToken;
            axios.defaults.headers.delete['X-CSRF-Token'] = data.csrfToken;
        };
        getCsrfToken();
    }, []);
    const router = useRouter()
    const haveLayout = Component.haveLayout || false
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
                        {haveLayout ? <Shell>
                            <Component/>
                        </Shell> : <Component {...pageProps}/>}
                        <ReactQueryDevtools initialIsOpen={false}/>
                    </ModalsProvider>
                </NotificationsProvider>
            </MantineProvider>
        </QueryClientProvider>
    </>
}

// MyApp.getInitialProps = ({ctx}: { ctx: GetServerSidePropsContext }) => ({});

export default MyApp
