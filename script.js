// Generiše "pulse" liniju koja kreće kao EKG (medicinska pozadina) a prelazi u data-chart liniju (tech sadašnjost)
function buildPulsePath() {
    const w = 620, h = 130, mid = h / 2;
    let d = `M 0 ${mid}`;
    let x = 0;

    // Deo 1: EKG otkucaj (medicinska pozadina - bivša medicinska sestra)
    const ekgSegment = (startX) => {
        let s = '';
        s += ` L ${startX + 14} ${mid}`;
        s += ` L ${startX + 20} ${mid - 8}`;
        s += ` L ${startX + 26} ${mid + 14}`;
        s += ` L ${startX + 32} ${mid - 46}`;
        s += ` L ${startX + 38} ${mid + 30}`;
        s += ` L ${startX + 44} ${mid}`;
        s += ` L ${startX + 62} ${mid}`;
        return s;
    };

    d += ekgSegment(0);
    d += ekgSegment(62);
    x = 124;

    // Prelaz: EKG se "smiruje" i pretvara u data-liniju (IT sadašnjost)
    const dataPoints = [
        [x, mid], [x+40, mid-10], [x+80, mid+18], [x+120, mid-28],
        [x+160, mid-6], [x+200, mid-38], [x+240, mid+10], [x+280, mid-22],
        [x+320, mid-52], [x+360, mid-18], [x+400, mid-44], [x+440, mid+2],
        [x+480, mid-30]
    ];
    dataPoints.forEach(p => { d += ` L ${p[0]} ${p[1]}`; });

    return d;
}

function initPulse() {
    const path = document.getElementById('pulsePath');
    if (path) path.setAttribute('d', buildPulsePath());
}

// Fade-in reveal na scroll
function initReveal() {
    const items = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });
    items.forEach(i => obs.observe(i));
}

document.addEventListener('DOMContentLoaded', () => {
    initPulse();
    initReveal();
});
