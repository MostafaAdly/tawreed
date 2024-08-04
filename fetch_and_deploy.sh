git fetch origin v2
git pull origin v2
npx next build
pm2 restart Tawreed
echo "Fetched and deployed"