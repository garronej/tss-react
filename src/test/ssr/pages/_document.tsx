import { createDocument } from "tss-react/nextJs";
import { muiCache, tssCache } from "../shared/makeStyles";

const { Document } = createDocument({ "caches": [muiCache, tssCache] });

export default Document;
