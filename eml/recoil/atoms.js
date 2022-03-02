import { atom } from "recoil";

export const currentActiveCourseState = atom({
  key: "currentActiveCourseState",
  default: {},
});

export const currentCategory = atom({
  key: "currentCategory",
  default: 'All',
});