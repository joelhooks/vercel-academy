import { getEnrolledStudents } from '@/lib/data/students'

import { Badge } from '@/components/ui/badge'

export const CourseCount = async ({ courseId }: { courseId: number }) => {
  const count = await getEnrolledStudents(courseId)
  return (
    <Badge variant="secondary" aria-label={`${count.toLocaleString()} students enrolled`}>
      {count.toLocaleString()} students
    </Badge>
  )
}
