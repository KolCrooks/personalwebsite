import { useEffect, useState } from "react";
import { GoX, GoLightBulb } from "react-icons/go";
import ReactMarkdown from "react-markdown";
import { CodeBlock, atomOneDark } from "react-code-blocks";
import gfm from "remark-gfm";
import tableOfContents from "remark-toc";
import hints from "../util/remark-hint";
import slug from "remark-slug";

interface ProjectCardProps {
  imageURL: string;
  title: string;
  markdown: string;
}

const renderers = {
  code: (args: { language: string; value: string; node: { meta: string } }) => {
    return (
      <div className="code">
        <div
          className="code-header"
          style={{ backgroundColor: atomOneDark.backgroundColor }}
        >
          {args.node.meta}
        </div>
        <CodeBlock
          theme={atomOneDark}
          language={args.language}
          text={args.value}
          customStyle={{
            borderRadius: "0 0 3px 3px",
            backgroundColor: atomOneDark.backgroundColor,
          }}
        />
      </div>
    );
  },
  hint: (args: { className: string; children: JSX.Element[] }) => {
    return (
      <div className={args.className}>
        <div className="lightbulb">
          <GoLightBulb />
        </div>
        {args.children}
      </div>
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

function ArticleOverlay(props: { clickBack?: () => void; markdown: string }) {
  const [text, setText] = useState("");
  useEffect(() => {
    fetch(props.markdown)
      .then((r) => r.text())
      .then((t) => {
        setText(t);
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
        <div className="article-header">
          <div className="back-button" onClick={() => props.clickBack?.()}>
            <GoX />
          </div>
        </div>
        <ReactMarkdown
          plugins={[gfm, tableOfContents, hints, slug]}
          renderers={renderers}
        >
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default function ProjectCard(props: ProjectCardProps) {
  const [fullScreen, setFullScreen] = useState(false);
  const { title, imageURL, markdown } = props;
  const article = fullScreen ? (
    <ArticleOverlay
      clickBack={() => setFullScreen(false)}
      markdown={markdown}
    />
  ) : (
    <></>
  );
  return (
    <div className="project-card">
      <div className="card-contents" onClick={() => setFullScreen(true)}>
        <img src={imageURL} alt={title} className="card-image" />
        <div className="card-title">{title}</div>
      </div>
      {article}
    </div>
  );
}
