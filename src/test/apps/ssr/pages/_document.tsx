import Document from "next/document";
import { augmentDocumentWithEmotionCache } from "./_app";

augmentDocumentWithEmotionCache(Document, Document);

export default Document;
