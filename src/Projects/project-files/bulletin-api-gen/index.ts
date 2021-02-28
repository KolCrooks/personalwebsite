import { project } from "..";
import img from "./bulletin_pin.svg";
import markdown from "./bulletin-api-gen.md";
console.log(markdown);
const exp: project = {
  markdown,
  title: "Bulletin API Client Generation Tool",
  image: img,
  date: new Date(2021, 2, 27),
};

export default exp;
