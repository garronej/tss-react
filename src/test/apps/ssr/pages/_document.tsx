import Document from "next/document";
import augmentDocumentWithEmotionCache from "tss-react/next/augmentDocumentWithEmotionCache";

augmentDocumentWithEmotionCache({ "key": "mui" })(Document);
augmentDocumentWithEmotionCache({ "key": "tss" })(Document);

export default Document;
