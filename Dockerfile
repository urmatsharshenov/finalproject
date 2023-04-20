FROM python:3.11

ENV PYTHONUNBUFFERED 1

WORKDIR /app

RUN pip install poetry

COPY poetry.lock poetry.lock
COPY pyproject.toml pyproject.toml

RUN poetry config virtualenvs.create false
RUN poetry install --only main

COPY . .

CMD ./manage.py runserver 0.0.0.0:8000