from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

class Config(BaseSettings):
    API_URL: str
    API_KEY: str
    EMAIL: str
    model_config = SettingsConfigDict(env_file='.env')
    
@lru_cache() 
def get_config():
    return Config()