#!/bin/bash

# Variables
directory="./pkpass_contents"
manifest="manifest.json"
output="jgwalsh-card.pkpass"
certificate="certificate.pem"
key="key.pem"
signature="signature"

# Check if required files exist
if [[ ! -d "$directory" ]]; then
  echo "Error: Directory $directory does not exist."
  exit 1
fi
if [[ ! -f "$certificate" || ! -f "$key" ]]; then
  echo "Error: certificate.pem or key.pem is missing."
  exit 1
fi

# Create manifest.json with SHA1 hashes
cd "$directory" || exit
rm -f "$manifest"
echo "{" > "$manifest"
for file in *; do
  if [[ -f "$file" ]]; then
    hash=$(openssl sha1 -binary "$file" | xxd -p -c 256)
    echo "  \"$file\": \"$hash\"," >> "$manifest"
  fi
done
sed -i '' '$ s/,$//' "$manifest" # Remove trailing comma
echo "}" >> "$manifest"

# Sign the manifest.json
cd - || exit
openssl smime -binary -sign -signer "$certificate" -inkey "$key" -in "$directory/$manifest" -out "$directory/$signature" -outform DER

# Create the .pkpass file
cd "$directory" || exit
zip -r "../$output" .
cd - || exit

# Completion message
echo "Successfully created $output."