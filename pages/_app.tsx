import "../styles/globals.css"
import "../styles/prism.css"
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from 'react-query/devtools'
import {Container, createStyles, MantineProvider} from '@mantine/core';
import {NotificationsProvider} from "@mantine/notifications";
import {ModalsProvider} from "@mantine/modals";
import Head from "next/head";
import {Shell} from "@components/Layout/Shell";
import {useRouter} from "next/router";
import {useEffect} from "react";
import axios from "axios";

const queryClient = new QueryClient()

const useStyles = createStyles((theme) => ({
    mainContainer: {
        minHeight: "100%",
        [theme.fn.smallerThan("md")]: {
            paddingLeft: 0,
            paddingRight: 0
        }
    }
}))

function MyApp({Component, pageProps}) {
    const {classes} = useStyles()
    useEffect(() => {
        const getCsrfToken = async () => {
            const {data} = await axios.get('/api/auth/csrf');
            axios.defaults.headers.post['X-CSRF-Token'] = data.csrfToken;
            axios.defaults.headers.patch['X-CSRF-Token'] = data.csrfToken;
            axios.defaults.headers.delete['X-CSRF-Token'] = data.csrfToken;
        };
        getCsrfToken();
    }, []);
    const withoutLayout = Component.withoutLayout || false
    const noContainer = Component.noContainer || false
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
                        {!withoutLayout ?
                            <Shell withPadding={!noContainer}>
                                {!noContainer ?
                                    <Container size={'xl'} className={classes.mainContainer}>
                                        <Component {...pageProps}/>
                                    </Container> :
                                    <Component {...pageProps}/>}
                            </Shell> :
                            <Component {...pageProps}/>}
                        <ReactQueryDevtools initialIsOpen={false}/>
                    </ModalsProvider>
                </NotificationsProvider>
            </MantineProvider>
        </QueryClientProvider>
    </>
}

// MyApp.getInitialProps = ({ctx}: { ctx: GetServerSidePropsContext }) => ({});

export default MyApp
