import json
import os
import urllib.request
import urllib.error


def handler(event: dict, context) -> dict:
    """Обработчик чата с нейросетью AstraLogic (GPT-4o)."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    messages = body.get('messages', [])

    if not messages:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Нет сообщений'})
        }

    api_key = os.environ.get('OPENAI_API_KEY', '')

    system_message = {
        "role": "system",
        "content": (
            "Ты — AstraLogic, умный текстовый помощник на платформе NeuralTEXT. "
            "Ты помогаешь пользователям писать тексты, редактировать, переводить, "
            "генерировать идеи и отвечать на любые вопросы. "
            "Отвечай на том языке, на котором пишет пользователь. "
            "Будь дружелюбным, точным и полезным."
        )
    }

    payload = {
        "model": "gpt-4o-mini",
        "messages": [system_message] + messages,
        "max_tokens": 2048,
        "temperature": 0.7
    }

    req = urllib.request.Request(
        'https://api.openai.com/v1/chat/completions',
        data=json.dumps(payload).encode('utf-8'),
        headers={
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        },
        method='POST'
    )

    with urllib.request.urlopen(req) as resp:
        result = json.loads(resp.read().decode('utf-8'))

    reply = result['choices'][0]['message']['content']

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'reply': reply})
    }
