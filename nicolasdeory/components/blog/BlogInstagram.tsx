import { AspectRatio } from "@chakra-ui/layout";
import InstagramEmbed from "react-instagram-embed";

export default function BlogVideo({ id }) {
  return (
    <InstagramEmbed
      url="https://instagr.am/p/BpPxSdfneli/"
      clientAccessToken="3749908768566748|11f3b8c401ff3b75bed4c4a45eac0e35"
      maxWidth={320}
      hideCaption={false}
      containerTagName="div"
      protocol=""
      injectScript
      onLoading={() => {}}
      onSuccess={() => {}}
      onAfterRender={() => {}}
      onFailure={() => {}}
    />
  );
}
