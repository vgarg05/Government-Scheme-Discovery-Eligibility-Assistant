from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field

class UserProfile(BaseModel):
    age: Optional[int] = None
    income: Optional[int] = None
    occupation: Optional[str] = None
    state: Optional[str] = None
    category: Optional[str] = None  # SC, ST, OBC, General, EWS
    gender: Optional[str] = None    # Male, Female, Other
    is_complete: bool = False
    missing_fields: List[str] = []

class AgentState(BaseModel):
    user_query: str
    user_profile: UserProfile = Field(default_factory=UserProfile)
    clarification_needed: bool = False
    clarification_prompt: Optional[str] = None
    retrieval_mode: str = "rag"     # "rag" or "web_search"
    max_similarity_score: float = 0.0
    retrieved_chunks: List[Dict[str, Any]] = Field(default_factory=list)
    web_search_results: List[Dict[str, Any]] = Field(default_factory=list)
    eligibility_evaluation: Dict[str, Any] = Field(default_factory=dict)
    guidance_response: Dict[str, Any] = Field(default_factory=dict)
    final_output: Dict[str, Any] = Field(default_factory=dict)
