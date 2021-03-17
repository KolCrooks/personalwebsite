import { project } from "..";
import markdown from "./graphql-server.md";
import logo from "./graphql-icon.svg";
import GQLServerDesign from "./GQLServerDesign.png";

import { ProjectTags } from "../ProjectTags";

const exp: project = {
  date: new Date(2021, 16, 3),
  markdown,
  title: "Custom C# GraphQL Server",
  image: logo,
  tags: [ProjectTags.CSHARP],
  source_transform: (s) => {
    const out = s.replace("%architecture%", GQLServerDesign);
    return out;
  },
};

export default exp;
