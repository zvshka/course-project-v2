-- DropForeignKey
ALTER TABLE "VisitedCourses" DROP CONSTRAINT "VisitedCourses_courseId_fkey";

-- AddForeignKey
ALTER TABLE "VisitedCourses" ADD CONSTRAINT "VisitedCourses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
