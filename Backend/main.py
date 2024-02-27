import uvicorn
from fastapi import FastAPI
import router, config

app = FastAPI()

@app.on_event("startup")
def startup():
    router.register_route(app)

if __name__ == "__main__":
    uvicorn.run(app='main:app', host="127.0.0.1", port=config.HOST_PORT)

