import React from "react";
import {Course} from "@components/Content/Course";
import {Box} from "@mantine/core";

export const CoursesPage = ({courses, isAdmin}) => {
    // console.log(courses)
    return <>
        {courses.map((course, index) => (
            <Box key={index}>
                <Course course={course} isAdmin={isAdmin}/>
            </Box>
        ))}
    </>
}