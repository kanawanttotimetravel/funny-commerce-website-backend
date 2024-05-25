FROM python:3.12

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY src ./src
COPY .env ./.env
COPY data ./data

ENV PYTHONPATH="${PYTHONPATH}:/app/src"

CMD ["python", "src/app.py"] 