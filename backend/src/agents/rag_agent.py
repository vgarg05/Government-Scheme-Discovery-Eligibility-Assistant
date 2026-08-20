from src.agents.state import AgentState
from src.tools.vector_tool import vector_tool

class RAGRetrievalAgent:
    """
    Day 10: Local RAG Retrieval Agent.
    Queries ChromaDB vector database and attaches top-K ground-truth scheme context.
    """

    def process(self, state: AgentState) -> AgentState:
        query = state.user_query
        res = vector_tool.search_schemes(query, top_k=4)

        if res["success"]:
            state.retrieved_chunks = res["results"]
            state.max_similarity_score = res["max_similarity_score"]
        else:
            state.retrieved_chunks = []
            state.max_similarity_score = 0.0

        return state

rag_agent = RAGRetrievalAgent()
