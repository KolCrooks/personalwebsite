import Bulletin_Api_Gen from "./bulletin-api-gen";
import ASL_Classification from "./asl-classification";
import Groundwrk from "./groundwrk";

export interface project {
  markdown: string;
  title: string;
  image?: string;
  date: Date;
  star?: boolean;
  source_transform?: (text: string) => string;
}

const out = [Bulletin_Api_Gen, ASL_Classification, Groundwrk].sort(
  (a, b) => +b.date - +a.date
);

export default out;
