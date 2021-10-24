import BaseDocument from "next/document";
import { withEmotionCache } from "tss-react/nextJs";
import { createMuiCache } from "./index";

export default withEmotionCache({
    "Document": BaseDocument,
    "getCaches": () => [createMuiCache()]
});

