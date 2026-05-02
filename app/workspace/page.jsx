import CourseList from './_components/CourseList'
import EnrollCourseList from './_components/EnrollCourseList'
import WelcomeBanner from './_components/WelcomeBanner'

function WorkSpace() {
  return (
    <div>
      <WelcomeBanner />
      <EnrollCourseList />
      <CourseList />
    </div>
  )
}

export default WorkSpace