import {Lesson} from "./Lesson";
import {Course} from "./Course";

export type Stage = {
    id: string,
    title: string,
    lessons: Lesson[],
    courseId?: string,
    course?: Course
}