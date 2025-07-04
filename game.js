document.addEventListener('DOMContentLoaded', function() {
    // Get all elements
    const glass = document.querySelector('.glass');
    const liquid = document.querySelector('.liquid');
    const iceDisplay = document.querySelector('.ice');
    const emojis = document.querySelectorAll('.emoji');
    
    let currentFill = 0;
    let currentColor = null;
    const MAX_FILL = 280; // Should match glass height
    const FILL_INCREMENT = 5; 
    // Initialize liquid styles (important!)
    // liquid.style.position = 'absolute';
    // liquid.style.bottom = '0';
    // liquid.style.left = '0';
    // liquid.style.width = '100%';
    // liquid.style.height = '0';
    // liquid.style.backgroundColor = 'transparent';

    // Make emojis draggable
    emojis.forEach(emoji => {
        emoji.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', this.textContent.trim());
            if (this.dataset.color) {
                e.dataTransfer.setData('color', this.dataset.color);
            }
            this.style.opacity = '0.5';
        });

        emoji.addEventListener('dragend', function() {
            this.style.opacity = '1';
        });
    });

    // Glass drop zone handlers
    glass.addEventListener('dragover', function(e) {
        e.preventDefault();
        glass.style.boxShadow = '0 0 10px gold';
    });

    glass.addEventListener('dragleave', function() {
        glass.style.boxShadow = 'none';
    });

    glass.addEventListener('drop', function(e) {
        e.preventDefault();
        glass.style.boxShadow = 'none';
        
        const type = e.dataTransfer.getData('text/plain');
        const color = e.dataTransfer.getData('color');
        const maxHeight = glass.clientHeight;

        // Handle fruits
        if (color) {
            const currentHeight = parseInt(liquid.style.height) || 0;
            const newHeight = Math.min(currentHeight + 30, maxHeight);
            liquid.style.height = `${newHeight}px`;
            liquid.style.backgroundColor = color;
        } 
        // Handle ice
        else if (type === '🧊') {
            iceDisplay.textContent += '🧊';
        }
        // Handle water
        else if (type === '💧') {
            const currentHeight = parseInt(liquid.style.height) || 0;
            const newHeight = Math.min(currentHeight + 20, maxHeight);
            liquid.style.height = `${newHeight}px`;
            liquid.style.backgroundColor = '#88C0D0';
        }
    });
});