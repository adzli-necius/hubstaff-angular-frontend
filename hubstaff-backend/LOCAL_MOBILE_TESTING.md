# Local mobile testing

This stack serves the installable Angular app and API from one HTTPS address.
It is intended for devices on the same Wi-Fi network; no domain is required.

## Prerequisites

- Docker Desktop running on the host computer
- The computer and test devices connected to the same trusted Wi-Fi network
- A host firewall rule allowing inbound TCP port 443

## First startup

1. Copy `.env.example` to `.env`, replace every placeholder secret, and set
   `LAN_IP` to the computer's Wi-Fi IPv4 address.
2. From this directory, start the stack:

   ```powershell
   docker compose --env-file .env -f docker-compose.local.yml up --build -d
   ```

3. On a test device, open `https://<LAN_IP>` using the same address configured
   in `.env`.

The gateway uses a local Caddy certificate authority. Before browsers will
allow GPS and PWA installation, install and trust its root certificate on each
test device. Copy it from the running gateway container:

```powershell
docker compose -f docker-compose.local.yml cp gateway:/data/caddy/pki/authorities/local/root.crt .\hubstaff-local-root.crt
```

Use your device's normal certificate-install flow, then explicitly enable trust
for that certificate. Do this only on devices you control and only for this
local test certificate.

After HTTPS is trusted, install the PWA:

- Android Chrome: menu, then **Install app**.
- iPhone/iPad Safari: Share, then **Add to Home Screen**.

## First administrator

`BOOTSTRAP_ADMIN_ENABLED=true` creates the administrator only on a fresh
database. After the first successful startup, change it to `false` and restart:

```powershell
docker compose --env-file .env -f docker-compose.local.yml up -d
```

## Useful commands

```powershell
# Application logs
docker compose --env-file .env -f docker-compose.local.yml logs -f

# Stop containers while retaining the test database
docker compose --env-file .env -f docker-compose.local.yml down
```

Do not use `down --volumes` unless you intentionally want to erase the local
test database and all its data.
