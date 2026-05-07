import json
import os
import http.client
import ssl


CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id',
    'Access-Control-Max-Age': '86400',
}


def handler(event: dict, context) -> dict:
    """Обработчик чата с нейросетью AstraLogic на базе DeepSeek."""

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    messages = body.get('messages', [])

    if not messages:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'no messages'}, ensure_ascii=False)
        }

    api_key = os.environ.get('DEEPSEEK_API_KEY', '')

    system_message = {
        "role": "system",
        "content": (
            "You are AstraLogic, a powerful and friendly AI text assistant. "
            "Help users write texts, posts, articles, emails, translate, "
            "generate ideas, answer questions and edit materials. "
            "Always reply in the same language the user writes in. "
            "Be specific, helpful and structure responses when needed."
        )
    }

    payload = {
        "model": "deepseek-chat",
        "messages": [system_message] + messages,
        "max_tokens": 4096,
        "temperature": 0.7,
        "stream": False
    }

    payload_bytes = json.dumps(payload, ensure_ascii=False).encode('utf-8')
    api_key_ascii = ''.join(c for c in api_key if ord(c) < 128)

    ctx = ssl.create_default_context()
    conn = http.client.HTTPSConnection('api.deepseek.com', timeout=25, context=ctx)
    conn.request(
        'POST',
        '/chat/completions',
        body=payload_bytes,
        headers={
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer ' + api_key_ascii,
            'Accept': 'application/json',
        }
    )

    resp = conn.getresponse()
    raw = resp.read().decode('utf-8')
    conn.close()

    if resp.status != 200:
        return {
            'statusCode': 502,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'DeepSeek error {resp.status}', 'detail': raw[:300]}, ensure_ascii=False)
        }

    result = json.loads(raw)
    reply = result['choices'][0]['message']['content']

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'reply': reply}, ensure_ascii=False)
    }