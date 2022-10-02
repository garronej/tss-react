import Document from "next/document";
import { augmentDocumentWithEmotionCache } from "./_app";

augmentDocumentWithEmotionCache(Document);

export default Document;
