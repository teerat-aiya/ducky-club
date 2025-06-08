#!/bin/bash

wget https://console.amsm.aiya.me/server/specs/oas?access_token=UoDD-QJ6h6sKr_VNgxQkoQAsRDlb2ZUY -O directus.oas.json

npx directus-typescript-gen -i directus.oas.json > src/types/directus.d.ts

# curl -O https://console.amsm.aiya.me/server/specs/oas?access_token=UoDD-QJ6h6sKr_VNgxQkoQAsRDlb2ZUY directus.oas.json