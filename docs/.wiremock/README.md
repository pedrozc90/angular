# WireMock Mock API

A fully mocked REST API using [WireMock](https://wiremock.org/), ready to run with Docker Compose.

## Getting Started

```bash
docker-compose up -d
```

The API will be available at **http://localhost:8080**.

---

## Endpoints

### `POST /api/login`

Returns a JWT access token as a `Set-Cookie` header + in the response body.

```bash
curl -i -X POST http://localhost:8080/api/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john.doe@example.com", "password": "secret"}'
```

---

### `POST /api/refresh`

Accepts a refresh token (in body or cookie) and returns a new access token.

```bash
curl -i -X POST http://localhost:8080/api/refresh \
  -H "Content-Type: application/json" \
  -d '{"refresh_token": "dGhpcy1pcy1hLW1vY2stcmVmcmVzaC10b2tlbi0xMjM0NTY3ODk"}'
```

---

### `POST /api/logout`

Clears the access token cookie (`Max-Age=0`).

```bash
curl -i -X POST http://localhost:8080/api/logout \
  -H "Cookie: AccessToken=<your_token>"
```

---

### `GET /api/me`

Returns the authenticated user's profile.

- Returns **200** if a `Cookie` header is present.
- Returns **401** if no `Cookie` header is sent.

```bash
curl http://localhost:8080/api/me \
  -H "Cookie: AccessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### `POST /api/register`

Registers a new user and returns the created user object.

```bash
curl -X POST http://localhost:8080/api/register \
  -H "Content-Type: application/json" \
  -d '{"email": "new.user@example.com", "password": "secret", "username": "newuser"}'
```

---

### `GET /api/products`

Returns a paginated list of products (served from `__files/products.json`).

```bash
curl http://localhost:8080/api/products
```

---

## Project Structure

```
wiremock/
├── docker-compose.yml
├── __files/
│   └── products.json          # Response body for GET /api/products
└── mappings/
    ├── post-login.json
    ├── post-refresh.json
    ├── post-logout.json
    ├── get-me.json
    ├── get-me-unauthorized.json
    ├── post-register.json
    └── get-products.json
```

## WireMock Admin API

WireMock exposes an admin UI and API at:

- **http://localhost:8080/\_\_admin/mappings** — view all registered stubs
- **http://localhost:8080/\_\_admin/requests** — view recent requests (useful for debugging)

## Notes

- `--global-response-templating` is enabled, so you can use [Handlebars helpers](https://wiremock.org/docs/response-templating/) like `{{now}}`, `{{randomValue}}`, etc. in any mapping.
- To add more stubs at runtime without restarting: `POST http://localhost:8080/__admin/mappings`
