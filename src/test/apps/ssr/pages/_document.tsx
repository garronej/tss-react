import DefaultDocument from "next/document";
import { augmentDocumentWithEmotionCache } from "./_app";

augmentDocumentWithEmotionCache({ DefaultDocument });

export default DefaultDocument;
