import cplusplusIcon from "devicon/icons/cplusplus/cplusplus-original.svg";
import javascriptIcon from "devicon/icons/javascript/javascript-original.svg";
import cSharpIcon from "devicon/icons/csharp/csharp-original.svg";
import javaIcon from "devicon/icons/java/java-original.svg";
import pythonIcon from "devicon/icons/python/python-original.svg";
import typescriptIcon from "devicon/icons/typescript/typescript-original.svg";
import { Tensorflow } from "@icons-pack/react-simple-icons";

export enum ProjectTags {
  STAR = "Starred",
  TS = "Typescript",
  JS = "Javascript",
  PYTHON = "Python",
  MACHINE_LEARNING = "Machine Learning",
  CSHARP = "C#",
  CPP = "C++",
  JAVA = "Java",
}

export function ProjectTagElement(props: { tag: ProjectTags }) {
  switch (props.tag) {
    case ProjectTags.CPP:
      return <img src={cplusplusIcon} title="C++" alt="C++" />;
    case ProjectTags.CSHARP:
      return <img src={cSharpIcon} title="C#" alt="C#" />;
    case ProjectTags.JAVA:
      return <img src={javaIcon} title="Java" alt="Java" />;
    case ProjectTags.JS:
      return <img src={javascriptIcon} title="Javascript" alt="Javascript" />;
    case ProjectTags.MACHINE_LEARNING:
      return <Tensorflow color="#FF6F00" />;
    case ProjectTags.PYTHON:
      return <img src={pythonIcon} title="Python" alt="Python" />;
    case ProjectTags.TS:
      return <img src={typescriptIcon} title="Typescript" alt="Typescript" />;
    default:
      return <></>;
  }
}
