import { project } from "..";
import img from "./bulletin_pin.svg";
import markdown from "./bulletin-api-gen.md";
import { ProjectTags } from "../ProjectTags";

const exp: project = {
  markdown,
  title: "Bulletin API Client Generation Tool",
  image: img,
  date: new Date(2021, 2, 28),
  tags: [ProjectTags.TS],
};

export default exp;
