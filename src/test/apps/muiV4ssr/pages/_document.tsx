import BaseDocument from "next/document";
import { withEmotionCache } from "tss-react/nextJs";

export default withEmotionCache({
    "Document": BaseDocument
});

