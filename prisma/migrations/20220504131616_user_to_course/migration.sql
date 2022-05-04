-- CreateTable
CREATE TABLE "VisitedCourses" (
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "visit_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VisitedCourses_pkey" PRIMARY KEY ("userId","courseId")
);

-- AddForeignKey
ALTER TABLE "VisitedCourses" ADD CONSTRAINT "VisitedCourses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitedCourses" ADD CONSTRAINT "VisitedCourses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
