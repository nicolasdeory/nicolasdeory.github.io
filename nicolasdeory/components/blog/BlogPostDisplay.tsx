import { MDXRemote } from "next-mdx-remote";
import BlogA from "./BlogA";
import BlogCode from "./BlogCode";
import BlogH1 from "./BlogH1";
import BlogH2 from "./BlogH2";
import BlogImg from "./BlogImg";
import BlogInlineCode from "./BlogInlineCode";
import BlogOl from "./BlogOl";
import BlogP from "./BlogP";
import BlogQuote from "./BlogQuote";
import BlogUl from "./BlogUl";
import BlogVideo from "./BlogVideo";
import DemoConfirmationModal from "../demo/DemoConfirmationModal";
import BlogInstagram from "./BlogInstagram";

export default function BlogPostDisplay(props) {
  return (
    <MDXRemote
      {...props}
      components={{
        h1: BlogH1,
        h2: BlogH2,
        p: BlogP,
        a: BlogA,
        code: BlogCode,
        ul: BlogUl,
        ol: BlogOl,
        img: BlogImg,
        blockquote: BlogQuote,
        inlineCode: BlogInlineCode,
        BlogVideo,
        DemoConfirmationModal,
        BlogInstagram
      }}
    />
  );
}
