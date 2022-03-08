import BaseDocument from "next/document";
import { withEmotionCache } from "tss-react/nextJs";
import { createMuiCache } from "./_app";

export default withEmotionCache({
    "Document": BaseDocument,
    "getCaches": () => [createMuiCache()]
});

