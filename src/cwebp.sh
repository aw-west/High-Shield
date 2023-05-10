find ./src/img/ -type d | sed 's/src\/img/docs\/www/g' | xargs mkdir -p
find src/img | egrep '.jpeg|.jpg|.tiff|.tif|.png' | cut -d/ -f3- | parallel --eta 'cwebp -quiet -q 100 -af -resize 1200 0 ./src/img/{} -o ./docs/www/{.}.webp'
