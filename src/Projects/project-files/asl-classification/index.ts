import { project } from "..";
import pdf from "./ASL_ML_PAPER.pdf";
import graph from "./ml_graph.jpg";
import markdown from "./asl-classification.md";

import base from "./processing/base.jpg";
import grey from "./processing/grey.jpg";
import resized from "./processing/resized.jpg";
import segmented from "./processing/segmented.jpg";

import accuracy from "./accuracy.png";
import accuracyVLoss from "./accuracy_v_loss.png";
import { ProjectTags } from "../ProjectTags";

const exp: project = {
  markdown,
  title: "Real-time ASL Classifier Algorithm",
  source_transform: (s) => {
    const out = s
      .replace("%asl_pdf%", pdf)
      .replace("%architecture_graph%", graph)
      .replace("%accuracy.png%", accuracy)
      .replace("%accuracy_v_loss.png%", accuracyVLoss)
      .replace("%processing/base.jpg%", base)
      .replace("%processing/grey.jpg%", grey)
      .replace("%processing/resized.jpg%", resized)
      .replace("%processing/segmented.jpg%", segmented);
    return out;
  },
  tags: [
    ProjectTags.CSHARP,
    ProjectTags.PYTHON,
    ProjectTags.MACHINE_LEARNING,
    ProjectTags.STAR,
  ],
  github: "https://github.com/KolCrooks/signLanguageDetection",
  image: segmented,
  date: new Date(2021, 2, 27),
};

export default exp;
