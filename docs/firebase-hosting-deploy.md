# Firebase Hosting deploy setup

This project builds on every push to `main`. Firebase Hosting deploy is skipped until the repository has a GitHub Actions secret named `FIREBASE_SERVICE_ACCOUNT`.

## Required secret

Secret name:

```text
FIREBASE_SERVICE_ACCOUNT
```

Value:

```json
{
  "type": "service_account",
  "project_id": "deepfense-online",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "...@deepfense-online.iam.gserviceaccount.com",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "..."
}
```

Do not commit this JSON file to the repo.

## Add the secret

After downloading the Firebase service account JSON locally:

```powershell
gh secret set FIREBASE_SERVICE_ACCOUNT --body (Get-Content -Raw .\firebase-service-account.json)
```

Or paste it in GitHub:

```text
Repository Settings -> Secrets and variables -> Actions -> New repository secret
```

## Verify

Push or rerun the latest `Build & Deploy to Firebase Hosting` workflow on `main`.

Expected result after the secret exists:

```text
Build: success
Check Firebase credentials: success
Deploy to Firebase Hosting: success
```

If the secret is missing, the workflow still passes but prints:

```text
FIREBASE_SERVICE_ACCOUNT secret is not configured. Skipping Firebase Hosting deploy.
```
