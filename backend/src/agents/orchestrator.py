from src.agents.state import AgentState
from src.agents.profile_agent import profile_agent
from src.agents.rag_agent import rag_agent
from src.agents.router_agent import router_agent
from src.agents.web_agent import web_agent
from src.agents.eligibility import eligibility_agent
from src.agents.counselor import counselor_agent

class MultiAgentOrchestrator:
    """
    Day 14: Unified Multi-Agent Orchestration Pipeline.
    Manages state execution across Profile Extractor -> Local RAG -> Similarity Router -> Serper Web Search -> Adjudicator -> Counselor Agents.
    """

    def run(self, user_query: str) -> AgentState:
        # 1. Initialize State
        state = AgentState(user_query=user_query)

        # 2. Step 1: Profile Extraction & Clarification Check
        state = profile_agent.process(state)
        if state.clarification_needed:
            state.final_output = {
                "clarification_needed": True,
                "prompt": state.clarification_prompt,
                "missing_fields": state.user_profile.missing_fields
            }
            return state

        # 3. Step 2: Primary Local RAG Retrieval Attempt
        state = rag_agent.process(state)

        # 4. Step 3: Similarity Routing Decision (Threshold S >= 0.70)
        state = router_agent.process(state)

        # 5. Step 4: Fallback Serper Web Search if RAG confidence is low
        if state.retrieval_mode == "web_search":
            state = web_agent.process(state)

        # 6. Step 5: Eligibility Adjudication & Rule Evaluation
        state = eligibility_agent.process(state)

        # 7. Step 6: Counselor Summary, Checklist & Citation Generation
        state = counselor_agent.process(state)

        return state

# Instantiated pipeline instance
orchestrator = MultiAgentOrchestrator()
