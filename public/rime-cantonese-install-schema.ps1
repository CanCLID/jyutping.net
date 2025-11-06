if (!(Get-Command bash -ErrorAction SilentlyContinue)) {
    $gitBashPath = "$env:ProgramFiles\Git\bin\bash.exe";
    if (!(Test-Path $gitBashPath)) {
        winget install --id Git.Git -e --source winget;
    }
    $bashCommand = $gitBashPath;
} else {
    $bashCommand = "bash";
}
& $bashCommand -c 'curl -fsSL https://jyutping.net/rime-cantonese-install-schema | bash';
