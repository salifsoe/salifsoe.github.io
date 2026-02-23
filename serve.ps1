# Quick local server for testing the portfolio
# Usage (PowerShell):
#   .\serve.ps1

try {
  Write-Host "Starting local server at http://localhost:8000" -ForegroundColor Cyan
  # Prefer `python` then `py`
  if (Get-Command python -ErrorAction SilentlyContinue) {
    python -m http.server 8000 -d .
  } elseif (Get-Command py -ErrorAction SilentlyContinue) {
    py -m http.server 8000 -d .
  } else {
    Write-Host "Python not found. Install Python or run a static server of your choice." -ForegroundColor Yellow
  }
} catch {
  Write-Host "Server exited or failed: $_" -ForegroundColor Red
}
