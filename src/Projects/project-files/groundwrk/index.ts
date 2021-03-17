import { project } from "..";
import markdown from "./groundwrk.md";
import logo from "./Logo.png";
import architecture from "./diagram.svg";
import groundwrkHome from "./groundwrk_home.png";
import groundwrkAssignments from "./groundwrk_assignments.png";
import groundwrk_users from "./groundwrk_stats.png";
import { ProjectTags } from "../ProjectTags";

const exp: project = {
  date: new Date(2021, 28, 2),
  markdown,
  title: "Groundwrk (App)",
  image: logo,
  tags: [ProjectTags.TS, ProjectTags.STAR],
  source_transform: (s) => {
    const out = s
      .replace("%architecture%", architecture)
      .replace("%groundwrk_home%", groundwrkHome)
      .replace("%groundwrk_assignments%", groundwrkAssignments)
      .replace("%groundwrk_users%", groundwrk_users);
    return out;
  },
};

export default exp;
