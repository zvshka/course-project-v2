import {HeroContentLeft} from "@components/Content/Sections/HeroSection";
import {FeaturesGrid} from "@components/Content/Sections/FeaturesSection";
import {Box, Container} from "@mantine/core";
import {ContactUs} from "@components/Content/Sections/ContactSection";
import {FaqWithBg} from "@components/Content/Sections/FAQ";

export default function Home() {
    return (
        <>
            <HeroContentLeft/>
            <Box sx={{backgroundColor: "white"}} px={0}>
                <FeaturesGrid description={"Каждому под силу программирование, нужно лишь постараться и приложить немного усилий"} title={"Программирование - это легко как вафли"}/>
                <ContactUs/>
                <FaqWithBg/>
            </Box>
        </>
    )
}
Home.noContainer = true
