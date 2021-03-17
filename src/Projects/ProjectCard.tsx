import { useEffect, useState } from "react";
import { GoX, GoLightBulb, GoStar } from "react-icons/go";

import ReactMarkdown from "react-markdown";
import { CodeBlock, atomOneDark } from "react-code-blocks";
import ReactJson from "react-json-view";

import gfm from "remark-gfm";
import tableOfContents from "remark-toc";
import hints from "../util/remark-hint";
import slug from "remark-slug";
import externLinks from "remark-external-links";
import { project } from "./project-files";
import { ProjectTagElement, ProjectTags } from "./project-files/ProjectTags";
import { IoLogoGithub } from "react-icons/io5";

const renderers = {
  code: (args: { language: string; value: string; node: { meta: string } }) => {
    let codeArea;
    if (args.language.toLowerCase() === "json") {
      codeArea = (
        <ReactJson
          src={JSON.parse(args.value)}
          // collapsed
          shouldCollapse={(field) => {
            return field.name !== "root";
          }}
          enableClipboard={false}
          theme={"chalk"}
          style={{ padding: "1rem" }}
        />
      );
    } else {
      codeArea = (
        <CodeBlock
          theme={atomOneDark}
          language={args.language}
          text={args.value}
          customStyle={{
            borderRadius: "0 0 3px 3px",
            backgroundColor: atomOneDark.backgroundColor,
          }}
        />
      );
    }
    return (
      <div className="code">
        <div
          className="code-header"
          style={{ backgroundColor: atomOneDark.backgroundColor }}
        >
          {args.node.meta}
        </div>
        {codeArea}
      </div>
    );
  },
  hint: (args: { className: string; children: JSX.Element[] }) => {
    return (
      <div className={args.className}>
        <div className="lightbulb">
          <GoLightBulb />
        </div>
        <div className="hint-content">{args.children}</div>
      </div>
    );
  },
  link: (args: { href: string; children: JSX.Element[] }) => {
    return (
      <a href={args.href} target="_blank" rel="noreferrer">
        {args.children}
      </a>
    );
  },
  heading: (args: {
    level: number;
    children: JSX.Element[];
    node: { data: { id: string } };
  }) => {
    const props = {
      children: args.children,
      id: args.node.data.id,
    };
    switch (args.level) {
      case 1:
        return <h1 {...props}>{args.children}</h1>;
      case 2:
        return <h2 {...props}>{args.children}</h2>;
      case 3:
        return <h3 {...props}>{args.children}</h3>;
      case 4:
        return <h4 {...props}>{args.children}</h4>;
      case 5:
        return <h5 {...props}>{args.children}</h5>;
      case 6:
        return <h6 {...props}>{args.children}</h6>;
    }
    return <></>;
  },
};

function ArticleOverlay(props: { clickBack?: () => void; project: project }) {
  const [text, setText] = useState("");
  useEffect(() => {
    fetch(props.project.markdown)
      .then((r) => r.text())
      .then((t) => {
        const out = props.project.source_transform?.(t) || t;
        setText(out);
      });
  });
  return (
    <div
      className="article-container"
      onClick={() => props.clickBack?.()}
      style={
        {
          "--code-bcolor": atomOneDark.backgroundColor,
          "--code-tcolor": atomOneDark.codeColor,
        } as any
      }
    >
      <div
        className="article-content"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {props.project.github ? (
          <a
            href={props.project.github}
            target="_blank"
            rel="noreferrer"
            className="github-link"
          >
            <div className="vog">View On Github</div>
            <IoLogoGithub />
          </a>
        ) : (
          <></>
        )}
        <div className="article-header">
          <div className="article-title">
            <h1>{props.project.title}</h1>
            <div className="subheader">{props.project.date.toDateString()}</div>
          </div>
          <h1 className="back-button" onClick={() => props.clickBack?.()}>
            <GoX />
          </h1>
        </div>
        <ReactMarkdown
          plugins={[gfm, tableOfContents, hints, slug, externLinks]}
          renderers={renderers}
        >
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default function ProjectCard(props: project) {
  const [fullScreen, setFullScreen] = useState(false);
  const { image, title } = props;
  const article = fullScreen ? (
    <ArticleOverlay clickBack={() => setFullScreen(false)} project={props} />
  ) : (
    <></>
  );
  const tagElements = props.tags?.map((t) => <ProjectTagElement tag={t} />);
  return (
    <div className="project-card">
      <div className="card-contents" onClick={() => setFullScreen(true)}>
        {props.tags?.includes(ProjectTags.STAR) ? (
          <div className="card-star">
            <GoStar />
          </div>
        ) : (
          <></>
        )}
        <div className="card-tags">{tagElements}</div>
        <img src={image} alt={title} className="card-image" />
        <div className="card-title">{title}</div>
      </div>
      {article}
    </div>
  );
}
