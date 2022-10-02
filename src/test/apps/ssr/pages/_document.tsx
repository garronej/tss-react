import Document from "next/document";
import { augmentDocumentWithEmotionCache_mui, augmentDocumentWithEmotionCache_tss } from "./_app";

augmentDocumentWithEmotionCache_mui(Document);
augmentDocumentWithEmotionCache_tss(Document);

export default Document;


