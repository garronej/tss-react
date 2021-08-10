import { createDocument } from "tss-react/nextJs";
import { getDefaultEmotionCache } from "tss-react/defaultEmotionCache";

const { Document } = createDocument({
	"caches": [getDefaultEmotionCache()]
});

export default Document;
