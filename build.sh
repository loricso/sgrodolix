npx tailwindcss -i ./src/css/input.css -o ./src/css/output.css --minify
npx tailwindcss -i ./src/css/librix-in.css -o ./src/css/librix-out.css --minify
cd src
zip -r ../release.zip ./

