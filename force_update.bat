@echo off
echo Running force update...
git add .
git commit -m "Force update"
git push origin main --force
echo Update complete!
pause
