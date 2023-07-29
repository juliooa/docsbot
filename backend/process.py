import re
import chromadb
from chromadb.config import Settings

document_id = 1


def process_files(documents):
    chroma_client = chromadb.PersistentClient(path='local_db')
    collection = chroma_client.create_collection(name="test_collection_one")

    for file in documents:
        print("processing file: " + file.filename)
        markdown_text = file.read().decode()
        chunks = split_text(markdown_text)
        document_title = get_title(markdown_text)
        generate_embeddings(chunks, document_title, file.filename, collection)
    chroma_client.stop()


def generate_embeddings(chunks, document_title, file_name, collection):
    global document_id
    for chunk in chunks:
        collection.add(
            metadatas={
                "document_title": document_title if document_title is not None else "",
                "file_name": file_name
            },
            documents=chunk,
            ids=[str(document_id)]
        )
        document_id = document_id + 1


def get_title(file):
    match = re.search(r"title:\s+(.+)\s+", file)
    if match:
        title = match.group(1)
        return title
    else:
        " "


def split_text(file):
    separator = "\n### "
    return file.split(separator)


def query_collection(query):
    chroma_client = chromadb.PersistentClient(path='local_db')
    collection = chroma_client.get_collection(name="test_collection_one")
    results = collection.query(
        query_texts=[query],
        n_results=2,
    )
    chroma_client.stop()  # Cierra la conexión después de usarla
    return results


