import { getCourses } from "../api/api";

test('get CourseList from colibri without auth token', async () => {
  const data = await getCourses();
  expect(data.status).toBe(200);
})
