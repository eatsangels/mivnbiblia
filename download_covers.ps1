$baseDir = "public/bible-covers"
if (!(Test-Path $baseDir)) { New-Item -ItemType Directory -Force -Path $baseDir }

# URLs for categories
$urls = @{
    "pentateuch" = "https://images.unsplash.com/photo-1502481851512-5a24d9901002?auto=format&fit=crop&q=80"
    "history"    = "https://images.unsplash.com/photo-1533669955142-6a73332af4db?auto=format&fit=crop&q=80"
    "wisdom"     = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80"
    "prophets"   = "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?auto=format&fit=crop&q=80"
    "gospels"    = "https://images.unsplash.com/photo-1628510118714-d2124aea0b48?auto=format&fit=crop&q=80"
    "acts"       = "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80"
    "epistles"   = "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80"
    "apocalypse" = "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80"
}

$overrides = @{
    "genesis.jpg" = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
    "romanos.jpg" = "https://images.unsplash.com/photo-1534771633535-90afb2014023?auto=format&fit=crop&q=80"
    "juan.jpg"    = "https://images.unsplash.com/photo-1543835773-67c4e5ce6fce?auto=format&fit=crop&q=80"
}

# Map to SLUG filenames directly
$books = @{
    # Pentateuco
    "genesis.jpg" = "pentateuch"; "exodo.jpg" = "pentateuch"; "levitico.jpg" = "pentateuch"; "numeros.jpg" = "pentateuch"; "deuteronomio.jpg" = "pentateuch";
    # Históricos
    "josue.jpg" = "history"; "jueces.jpg" = "history"; "rut.jpg" = "history"; "1-samuel.jpg" = "history"; "2-samuel.jpg" = "history"; 
    "1-reyes.jpg" = "history"; "2-reyes.jpg" = "history"; "1-cronicas.jpg" = "history"; "2-cronicas.jpg" = "history"; 
    "esdras.jpg" = "history"; "nehemias.jpg" = "history"; "ester.jpg" = "history";
    # Sapienciales
    "job.jpg" = "wisdom"; "salmos.jpg" = "wisdom"; "proverbios.jpg" = "wisdom"; "eclesiastes.jpg" = "wisdom"; "cantares.jpg" = "wisdom";
    # Profetas
    "isaias.jpg" = "prophets"; "jeremias.jpg" = "prophets"; "lamentaciones.jpg" = "prophets"; "ezequiel.jpg" = "prophets"; "daniel.jpg" = "prophets";
    "oseas.jpg" = "prophets"; "joel.jpg" = "prophets"; "amos.jpg" = "prophets"; "abdias.jpg" = "prophets"; "jonas.jpg" = "prophets"; 
    "miqueas.jpg" = "prophets"; "nahum.jpg" = "prophets"; "habacuc.jpg" = "prophets"; "sofonias.jpg" = "prophets"; "hageo.jpg" = "prophets"; 
    "zacarias.jpg" = "prophets"; "malaquias.jpg" = "prophets";
    # Evangelios
    "mateo.jpg" = "gospels"; "marcos.jpg" = "gospels"; "lucas.jpg" = "gospels"; "juan.jpg" = "gospels";
    # Hechos
    "hechos.jpg" = "acts";
    # Epístolas
    "romanos.jpg" = "epistles"; "1-corintios.jpg" = "epistles"; "2-corintios.jpg" = "epistles"; "galatas.jpg" = "epistles"; 
    "efesios.jpg" = "epistles"; "filipenses.jpg" = "epistles"; "colosenses.jpg" = "epistles"; 
    "1-tesalonicenses.jpg" = "epistles"; "2-tesalonicenses.jpg" = "epistles"; "1-timoteo.jpg" = "epistles"; "2-timoteo.jpg" = "epistles"; 
    "tito.jpg" = "epistles"; "filemon.jpg" = "epistles"; "hebreos.jpg" = "epistles"; "santiago.jpg" = "epistles"; 
    "1-pedro.jpg" = "epistles"; "2-pedro.jpg" = "epistles"; "1-juan.jpg" = "epistles"; "2-juan.jpg" = "epistles"; "3-juan.jpg" = "epistles"; "judas.jpg" = "epistles";
    # Apocalipsis
    "apocalipsis.jpg" = "apocalypse";
}

foreach ($filename in $books.Keys) {
    $category = $books[$filename]
    $url = $urls[$category]
    
    if ($overrides.ContainsKey($filename)) {
        $url = $overrides[$filename]
    }

    $output = "$baseDir/$filename"

    Write-Host "Downloading $filename..."
    try {
        Invoke-WebRequest -Uri $url -OutFile $output -UserAgent "Mozilla/5.0"
    }
    catch {
        Write-Error "Failed to download $filename"
    }
}
