import { Ollama, FunctionTool, Settings, ReActAgent,PDFReader,VectorStoreIndex, HuggingFaceEmbedding } from "llamaindex";
import path from "path";
Settings.llm = new Ollama({
    model: "llama3.1",
  });
Settings.embedModel = new HuggingFaceEmbedding({
    modelType: "BAAI/bge-small-en-v1.5",
    quantized: false,
  });
const pdfReader = new PDFReader()

async function query_engine(){
    const data = await pdfReader.loadData(path.join(__dirname, "/public/"));
    const index = VectorStoreIndex.fromDocuments(data);
    const query_engine = (await index).asQueryEngine();
    return query_engine
}

export {
  query_engine
}
