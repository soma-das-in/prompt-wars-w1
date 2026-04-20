#!/bin/bash

# Exit script if any command fails
set -e

PROJECT_ID="prompt-wars-hackathon-493408"
REGION="us-central1"

echo "Deploying Smart Stadium Navigation Project..."

# 1. Set Google Cloud Project
echo "1. Configuring gcloud project to $PROJECT_ID..."
CLOUDSDK_PYTHON=/opt/homebrew/bin/python3.13 ./google-cloud-sdk/bin/gcloud config set project $PROJECT_ID

# 2. Deploy Cloud Function (Crowd Simulation)
echo "2. Deploying Cloud Function (crowd-simulation)..."
CLOUDSDK_PYTHON=/opt/homebrew/bin/python3.13 ./google-cloud-sdk/bin/gcloud functions deploy crowd-simulation \
  --project $PROJECT_ID \
  --region $REGION \
  --runtime python311 \
  --trigger-http \
  --allow-unauthenticated \
  --source cloud_functions \
  --entry-point simulate_crowd

# 3. Deploy Frontend Web App to Cloud Run
echo "3. Deploying Frontend to Cloud Run (smart-stadium-frontend)..."
CLOUDSDK_PYTHON=/opt/homebrew/bin/python3.13 ./google-cloud-sdk/bin/gcloud run deploy smart-stadium-frontend \
  --project $PROJECT_ID \
  --region $REGION \
  --source frontend \
  --allow-unauthenticated \
  --port 8080 \
  --quiet

echo "Deployment pipeline executed successfully!"
