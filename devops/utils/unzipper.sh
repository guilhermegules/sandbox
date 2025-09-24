for file in *.zip; do
  folder="${file%.zip}"

  echo "📂 Creating folder: $folder"
  mkdir -p "$folder"

  echo "📦 Extracting $file into $folder ..."
  unzip -q "$file" -d "$folder"

  echo "✅ Done extracting $file"
  echo "-----------------------------"
done

echo "🎉 All files extracted!"
