# next js react 프로젝트 초기화 스크립트
# 1. 캐시 및 임시파일 삭제 
Write-Host "🧹 캐시 및 임시파일 삭제 중..."

# 폴더 삭제
@('.next', 'node_modules', '.turbo') | ForEach-Object {
    if (Test-Path $_) {
        Remove-Item -Recurse -Force $_
        Write-Host "✅ $_ 삭제 완료"
    }
}

# 파일 삭제
@('yarn.lock', '.eslintcache') | ForEach-Object {
    if (Test-Path $_) {
        Remove-Item -Force $_
        Write-Host "✅ $_ 삭제 완료"
    }
}

# 재설치
Write-Host "`n📦 yarn install 시작..."
yarn install

# 캐시 없이 빌드 (단, --no-cache 옵션은 없으므로 .next 폴더를 삭제하고 빌드)
Write-Host "`n🛠️ next build 시작..."
yarn next build

Write-Host "`n✅ 초기화 완료!"
