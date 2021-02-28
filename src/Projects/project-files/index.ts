import Bulletin_Api_Gen from "./bulletin-api-gen";
import ASL_Classification from "./asl-classification";

export interface project {
  markdown: string;
  title: string;
  image?: string;
  date: Date;
  source_transform?: (text: string) => string;
}

const out = [Bulletin_Api_Gen, ASL_Classification];

export default out;
