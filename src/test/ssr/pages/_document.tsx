//Customization level: 0
import { createDocument } from "tss-react/nextJs";
import { cache } from "@material-ui/styled-engine";

const { Document } = createDocument({
	"caches": [ cache ]
});

export default Document;
