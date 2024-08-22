function slider(idtoslide) {
    let slidesInner;
    let width;
    let numElement;
    let innerWidth;
    let areaWidth;
    let parentDiv = document.getElementById(idtoslide);
    let childrenWidth = parentDiv.children[0].offsetWidth;
    parentDiv.style.overflow = "hidden"
    parentDiv.style.display = "block"
    function setupSlider() {
        // Cache the width of each slide and the total number of slides
        width = childrenWidth;
        console.log(childrenWidth);
        numElement = document.getElementById(idtoslide + 'inner').children.length;

        // Set the width of the #slidesInner based on the number of slides
        innerWidth = (width * numElement) + ((numElement - 1) * 10) + 'px'; // Adjust margin count
        slidesInner.style.width = innerWidth;

        // Cache the area width of the carousel wrapper
        areaWidth = parentDiv.offsetWidth;

        // Reset position to 0 when resizing
        slidesInner.style.marginLeft = "0px";
    }

    function slide() {
        function nxt() {
            let currentPosi = parseInt(slidesInner.style.marginLeft) || 0;
            let maxLeft = -(parseInt(innerWidth) - areaWidth);

            if (currentPosi > maxLeft) {
                slidesInner.style.marginLeft = (currentPosi - (width + 10)) + "px";
            }
        }

        function prev() {
            let currentPosi = parseInt(slidesInner.style.marginLeft) || 0;

            if (currentPosi < 0) {
                slidesInner.style.marginLeft = (currentPosi + (width + 10)) + "px";
            }
        }

        // Attach event listeners
        document.getElementById("nxt").removeEventListener("click", nxt);
        document.getElementById("prev").removeEventListener("click", prev);

        document.getElementById("nxt").addEventListener("click", nxt);
        document.getElementById("prev").addEventListener("click", prev);
    }

    function initSlider() {
        let org_html = parentDiv.innerHTML;
        let new_html = `
            <div id='${idtoslide}inner' class='slidesInner' style="display: inline-flex;">${org_html}</div>
            <div class='navrow'>
                <span id='nxt' class='rundBtn'>Next</span>
                <span id='prev' class='rundBtn'>Previous</span>
            </div>`;
        parentDiv.innerHTML = new_html;
        slidesInner = document.getElementById(idtoslide + 'inner'); // Use dynamic ID selector
    }

    initSlider();
    setupSlider();
    slide();

    // Recalculate and reinitialize the slider on window resize
    window.addEventListener('resize', function() {
        setupSlider();
    });
}
