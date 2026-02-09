// === GEMEINSAME JAVASCRIPT-FUNKTIONEN ===

// Toggle für Thema-Sections
function toggleTheme(header) {
    const content = header.nextElementSibling;
    const isOpen = content.classList.contains('show');
    if (isOpen) {
        content.classList.remove('show');
        header.classList.add('collapsed');
    } else {
        content.classList.add('show');
        header.classList.remove('collapsed');
    }
}

// Toggle für Lebensbezug-Sections
function toggleLebensbezug(header) {
    const content = header.nextElementSibling;
    const isOpen = content.classList.contains('show');
    if (isOpen) {
        content.classList.remove('show');
        header.classList.add('collapsed');
    } else {
        content.classList.add('show');
        header.classList.remove('collapsed');
    }
}

// Toggle für Freibereich-Sections
function toggleFreibereich(header) {
    const content = header.nextElementSibling;
    const isOpen = content.classList.contains('show');
    if (isOpen) {
        content.classList.remove('show');
        header.classList.add('collapsed');
    } else {
        content.classList.add('show');
        header.classList.remove('collapsed');
    }
}

// Toggle für Schlüssel-Boxen (Umsetzungsbeispiele)
function toggleSchluessel(box) {
    const content = box.querySelector('.schluessel-content');
    const icon = box.querySelector('.toggle-schluessel');
    content.classList.toggle('expanded');
    icon.classList.toggle('rotated');
}

// Toggle für Tabellen
function toggleTable(header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector('.table-toggle');
    content.classList.toggle('expanded');
    icon.classList.toggle('rotated');
}

// Toggle für Kompetenz-Details
function toggleKompetenz(button, detailsId) {
    const details = document.getElementById(detailsId);
    const allButtons = button.parentElement.querySelectorAll('.kompetenz-button');
    const allDetails = button.parentElement.parentElement.querySelectorAll('.kompetenz-details');
    
    allDetails.forEach(d => {
        if (d.id !== detailsId) d.classList.remove('show');
    });
    
    allButtons.forEach(b => {
        if (b !== button) b.classList.remove('active');
    });
    
    details.classList.toggle('show');
    button.classList.toggle('active');
}

// PDF Export Funktion
function exportToPDF() {
    // Status speichern
    const themeHeaders = document.querySelectorAll(".theme-header");
    const lebensbezugHeaders = document.querySelectorAll(".lebensbezug-header");
    const freibereichHeaders = document.querySelectorAll(".freibereich-header");
    const tableHeaders = document.querySelectorAll(".table-header");
    const umsetzungBoxes = document.querySelectorAll(".umsetzung-box");
    
    // Alles aufklappen (außer Umsetzungsbeispiele)
    themeHeaders.forEach(header => {
        const content = header.nextElementSibling;
        content.classList.add("show");
        header.classList.remove("collapsed");
    });
    
    lebensbezugHeaders.forEach(header => {
        const content = header.nextElementSibling;
        content.classList.add("show");
        header.classList.remove("collapsed");
    });
    
    freibereichHeaders.forEach(header => {
        const content = header.nextElementSibling;
        content.classList.add("show");
        header.classList.remove("collapsed");
    });
    
    tableHeaders.forEach(header => {
        const content = header.nextElementSibling;
        content.classList.add("expanded");
    });
    
    // Umsetzungsbeispiele ZUGEKLAPPT lassen
    umsetzungBoxes.forEach(box => {
        const content = box.querySelector(".schluessel-content");
        const icon = box.querySelector(".toggle-schluessel");
        if (content) content.classList.remove("expanded");
        if (icon) icon.classList.remove("rotated");
    });
    
    // Kurz warten damit alles gerendert ist
    setTimeout(() => {
        window.print();
    }, 500);
}

// Initialisierung beim Laden der Seite
document.addEventListener('DOMContentLoaded', function() {
    // Theme-Headers als collapsed markieren
    const themeHeaders = document.querySelectorAll('.theme-header');
    themeHeaders.forEach(header => {
        header.addEventListener('click', function() {
            toggleTheme(this);
        });
        header.classList.add('collapsed');
    });
    
    // Lebensbezug-Headers als collapsed markieren
    const lebensbezugHeaders = document.querySelectorAll('.lebensbezug-header');
    lebensbezugHeaders.forEach(header => {
        header.classList.add('collapsed');
    });
    
    // Freibereich-Headers als collapsed markieren
    const freibereichHeaders = document.querySelectorAll('.freibereich-header');
    freibereichHeaders.forEach(header => {
        header.classList.add('collapsed');
    });
    
    // Tooltip-Funktionalität für Kompetenz-Links
    const tooltip = document.createElement('div');
    tooltip.id = 'tooltip';
    tooltip.className = 'tooltip';
    document.body.appendChild(tooltip);
    
    const kompetenzLinks = document.querySelectorAll('.kompetenz-nummer-link');
    let hideTimeout;
    
    kompetenzLinks.forEach(link => {
        link.addEventListener('mouseenter', function(e) {
            if (hideTimeout) {
                clearTimeout(hideTimeout);
            }
            
            const text = this.getAttribute('data-text');
            tooltip.textContent = text;
            tooltip.style.display = 'block';
            
            const rect = this.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            
            let left = rect.left + scrollLeft;
            let top = rect.bottom + scrollTop + 15;
            
            tooltip.style.left = left + 'px';
            tooltip.style.top = top + 'px';
            tooltip.style.opacity = '1';
            tooltip.classList.add('show');
        });
        
        link.addEventListener('mousemove', function(e) {
            if (hideTimeout) {
                clearTimeout(hideTimeout);
            }
        });
        
        link.addEventListener('mouseleave', function() {
            hideTimeout = setTimeout(() => {
                tooltip.classList.remove('show');
                tooltip.style.opacity = '0';
                setTimeout(() => {
                    tooltip.style.display = 'none';
                }, 200);
            }, 100);
        });
    });
});
