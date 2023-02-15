import Document from "next/document";
import  augmentDocumentWithEmotionCache  from "tss-react/next/augumentDocumentWithEmotionCache";


augmentDocumentWithEmotionCache({ "key": "css" })(Document);

export default Document;
