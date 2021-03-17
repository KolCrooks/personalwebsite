import Bulletin_Api_Gen from "./bulletin-api-gen";
import ASL_Classification from "./asl-classification";
import Groundwrk from "./groundwrk";
import GQLServer from "./graphql-server";
import { ProjectTags } from "./ProjectTags";

export interface project {
  markdown: string;
  title: string;
  image?: string;
  github?: string;
  date: Date;
  tags?: ProjectTags[];
  source_transform?: (text: string) => string;
}

const out = [Bulletin_Api_Gen, ASL_Classification, Groundwrk, GQLServer].sort(
  (a, b) => +b.date - +a.date
);

export default out;
