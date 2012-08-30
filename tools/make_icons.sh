mkdir -p ./assets/icons

for size in 36 48 57 64 72 72 90 96 114 512; do
  echo generating $size ...
  inkscape -D -e ./assets/icons/appicon-$size.png -w $size -h $size -f ./source/appicon.svg &>/dev/null
done

echo "Done!"

