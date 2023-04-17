FROM python:3.11

ENV PYTHONUNBUFFERED 1

WORKDIR /app

RUN curl -sSL https://install.python-poetry.org | python - && \
    ln -s $HOME/.local/bin/poetry /usr/local/bin/poetry


COPY poetry.lock poetry.lock
COPY pyproject.toml pyproject.toml

RUN poetry config virtualenvs.create false
RUN poetry install --only main

COPY . .
