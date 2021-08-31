import { createDocument } from "tss-react/nextJs";
import { muiCache } from "../shared/muiCache";

const { Document } = createDocument({ "caches": [muiCache] });

export default Document;
