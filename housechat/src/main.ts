import { Ollama, FunctionTool, Settings, ReActAgent,PDFReader,VectorStoreIndex, HuggingFaceEmbedding ,SimpleDirectoryReader} from "llamaindex";
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
    const doc = new SimpleDirectoryReader().loadData(path.join(__dirname, "/public/"))
    const data = await pdfReader.loadData(path.join(__dirname, "/public/9d22b60e2ce521eeda385c9e3c24d92b62f707ac.pdf"));
    const index = VectorStoreIndex.fromDocuments(data);
    const query_engine = (await index).asQueryEngine();
    return query_engine
}

export {
  query_engine
}
