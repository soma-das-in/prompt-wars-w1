# Security Considerations

This project follows basic security practices suitable for a hackathon prototype while using Google Cloud services responsibly.

## Firebase Security
Firestore access is protected using Firebase Security Rules to ensure:
- Only authenticated or authorized clients can read/write data.
- Direct modification of crowd simulation data from the client is restricted.

## Environment Configuration
Sensitive configuration such as Firebase credentials and API keys are stored in configuration files and should ideally be managed using environment variables in production environments.

## Principle of Least Privilege
Cloud services are configured with minimal permissions required for their operation:
- Cloud Functions only update Firestore documents.
- Frontend clients have read-only access to crowd data.

## Cloud Run Security
The containerized frontend is deployed to Cloud Run with "Allow unauthenticated invocations" enabled for public access. The container itself runs with a least-privilege service account.

## Secure Development Practices
- Input validation is applied to frontend inputs.
- No sensitive user data is stored.
- All services rely on managed Google Cloud infrastructure.