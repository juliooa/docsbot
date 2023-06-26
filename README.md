# Docsbot

Ask questions to your markdown documents:
- Upload your markdown documents
- They are converted to embeddings using Chromadb
- You ask a question
- Your question is converted to embedding and the app gets the more similar documents from the vector database
- The app asks OpenAI API to answer the original question, providing the retrieved documents.
- You have your answer!

<img width="1332" alt="Screen Shot 2023-05-27 at 19 11 27" src="https://github.com/juliooa/docsbot/assets/1221345/d0e6ae86-0364-4046-ba09-f9f71afffdae">

# Setup

Create a .env file with your OpenAI Api key, and the url of your python server, and put it inside `webapp` folder.
Your file should look like this:

```
SECRET_OPENAI_API_KEY="sk-XXXX"
PUBLIC_PROCESS_FILES_SERVER="http://127.0.0.1:5000"
```

# TechStack
- [Sveltekit](https://kit.svelte.dev/)
- [Chromadb](https://www.trychroma.com/)
- [OpenAI API](https://platform.openai.com/docs/introduction)

### Youtube video
This project is explained in detail here:https://www.youtube.com/watch?v=rtX8oqolN8s (Spanish)
