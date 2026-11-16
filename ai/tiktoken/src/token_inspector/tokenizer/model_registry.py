from typing import Dict
from pydantic import BaseModel, Field


class ModelMetadata(BaseModel):
    model_name: str
    encoding_name: str
    context_ceiling: int
    is_fallback: bool = False


class ModelRegistry:
    """Registry mapping model names to tokenizer encodings and context ceilings."""

    DEFAULT_ENCODING: str = "cl100k_base"
    DEFAULT_CEILING: int = 128000

    def __init__(self) -> None:
        self._registry: Dict[str, ModelMetadata] = {
            "gpt-4o": ModelMetadata(
                model_name="gpt-4o",
                encoding_name="o200k_base",
                context_ceiling=128000,
            ),
            "gpt-4o-mini": ModelMetadata(
                model_name="gpt-4o-mini",
                encoding_name="o200k_base",
                context_ceiling=128000,
            ),
            "gpt-4-turbo": ModelMetadata(
                model_name="gpt-4-turbo",
                encoding_name="cl100k_base",
                context_ceiling=128000,
            ),
            "gpt-4-turbo-preview": ModelMetadata(
                model_name="gpt-4-turbo-preview",
                encoding_name="cl100k_base",
                context_ceiling=128000,
            ),
            "gpt-4": ModelMetadata(
                model_name="gpt-4",
                encoding_name="cl100k_base",
                context_ceiling=8192,
            ),
            "gpt-4-32k": ModelMetadata(
                model_name="gpt-4-32k",
                encoding_name="cl100k_base",
                context_ceiling=32768,
            ),
            "gpt-3.5-turbo": ModelMetadata(
                model_name="gpt-3.5-turbo",
                encoding_name="cl100k_base",
                context_ceiling=16385,
            ),
            "text-embedding-3-small": ModelMetadata(
                model_name="text-embedding-3-small",
                encoding_name="cl100k_base",
                context_ceiling=8191,
            ),
            "text-embedding-3-large": ModelMetadata(
                model_name="text-embedding-3-large",
                encoding_name="cl100k_base",
                context_ceiling=8191,
            ),
            "text-embedding-ada-002": ModelMetadata(
                model_name="text-embedding-ada-002",
                encoding_name="cl100k_base",
                context_ceiling=8191,
            ),
            "o1": ModelMetadata(
                model_name="o1",
                encoding_name="o200k_base",
                context_ceiling=200000,
            ),
            "o1-mini": ModelMetadata(
                model_name="o1-mini",
                encoding_name="o200k_base",
                context_ceiling=128000,
            ),
            "o3-mini": ModelMetadata(
                model_name="o3-mini",
                encoding_name="o200k_base",
                context_ceiling=200000,
            ),
        }

    def register(self, model_name: str, encoding_name: str, context_ceiling: int) -> None:
        """Register a new or custom model."""
        self._registry[model_name] = ModelMetadata(
            model_name=model_name,
            encoding_name=encoding_name,
            context_ceiling=context_ceiling,
            is_fallback=False,
        )

    def get(self, model_name: str) -> ModelMetadata:
        """Get metadata for a model, or fallback with warning flag if unknown."""
        # Exact match
        if model_name in self._registry:
            return self._registry[model_name]

        # Prefix matching for versioned models (e.g. gpt-4o-2024-08-06)
        for key, meta in self._registry.items():
            if model_name.startswith(key):
                return ModelMetadata(
                    model_name=model_name,
                    encoding_name=meta.encoding_name,
                    context_ceiling=meta.context_ceiling,
                    is_fallback=False,
                )

        # Fallback for completely unknown models
        return ModelMetadata(
            model_name=model_name,
            encoding_name=self.DEFAULT_ENCODING,
            context_ceiling=self.DEFAULT_CEILING,
            is_fallback=True,
        )

    def get_encoding_name(self, model_name: str) -> str:
        return self.get(model_name).encoding_name

    def get_context_ceiling(self, model_name: str) -> int:
        return self.get(model_name).context_ceiling
