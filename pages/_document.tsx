import Document, {Head, Html, Main, NextScript} from 'next/document';
import {createGetInitialProps} from '@mantine/next';

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
    static getInitialProps = getInitialProps;
    //
    // render(): JSX.Element {
    //     return <Html>
    //         <Head>
    //             <title>Fantastic Waffle</title>
    //             {/*<meta name="viewport" content="initial-scale=1.0, width=device-width" />*/}
    //         </Head>
    //         <body>
    //         <Main/>
    //         <NextScript/>
    //         </body>
    //     </Html>
    // }
}