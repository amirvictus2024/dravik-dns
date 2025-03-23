// تعریف رنج‌های CIDR به صورت آرایه برای هر کشور
const cidrRanges = {
    Germany: ["192.168.10.0/24", "192.168.20.0/24", "192.168.30.0/24"],
    Netherlands: ["10.20.30.0/24", "10.20.40.0/24", "10.20.50.0/24"],
    France: ["172.16.50.0/24", "172.16.60.0/24", "172.16.70.0/24"]
};

// تابع تولید آدرس IPv4 از CIDR
function getRandomIPv4FromCIDR(cidr) {
    let [base, prefix] = cidr.split('/');
    prefix = parseInt(prefix);
    const baseParts = base.split('.').map(Number);
    let baseNum = ((baseParts[0] << 24) | (baseParts[1] << 16) | (baseParts[2] << 8) | baseParts[3]) >>> 0;
    let hostBits = 32 - prefix;
    let maxHosts = Math.pow(2, hostBits);
    let offset = Math.floor(Math.random() * maxHosts);
    let ipNum = baseNum + offset;
    return [
        (ipNum >>> 24) & 0xFF,
        (ipNum >>> 16) & 0xFF,
        (ipNum >>> 8) & 0xFF,
        ipNum & 0xFF
    ].join('.');
}

// تولید آدرس IPv4 بر اساس کشور انتخابی
document.getElementById('generate-ipv4').addEventListener('click', function () {
    const country = document.getElementById('ipv4-location').value;
    const ranges = cidrRanges[country];
    const cidr = ranges[Math.floor(Math.random() * ranges.length)];
    const ipv4 = getRandomIPv4FromCIDR(cidr);
    document.getElementById('ipv4-output').textContent = `${ipv4}`;
});

// تولید آدرس IPv6 بر اساس فرمت انتخاب شده
document.getElementById('generate-ipv6').addEventListener('click', function () {
    const format = document.querySelector('input[name="ipv6-format"]:checked').value;
    let ipv6_1 = '';
    let ipv6_2 = '';

    if (format === 'format1') {
        // تولید آدرس‌های مستقل برای فرمت: ****:****::0 و ****:****::1
        const part1_1 = Math.floor(Math.random() * 0xFFFF).toString(16).padStart(4, '0');
        const part2_1 = Math.floor(Math.random() * 0xFFFF).toString(16).padStart(4, '0');
        ipv6_1 = `${part1_1}:${part2_1}::0`;

        const part1_2 = Math.floor(Math.random() * 0xFFFF).toString(16).padStart(4, '0');
        const part2_2 = Math.floor(Math.random() * 0xFFFF).toString(16).padStart(4, '0');
        ipv6_2 = `${part1_2}:${part2_2}::1`;

    } else {
        // تولید آدرس‌های مستقل برای فرمت: ****:**:**::1
        const part1_1 = Math.floor(Math.random() * 0xFFFF).toString(16).padStart(4, '0');
        const part2_1 = Math.floor(Math.random() * 0xFF).toString(16).padStart(2, '0');
        const part3_1 = Math.floor(Math.random() * 0xFF).toString(16).padStart(2, '0');
        ipv6_1 = `${part1_1}:${part2_1}:${part3_1}::1`;

        const part1_2 = Math.floor(Math.random() * 0xFFFF).toString(16).padStart(4, '0');
        const part2_2 = Math.floor(Math.random() * 0xFF).toString(16).padStart(2, '0');
        const part3_2 = Math.floor(Math.random() * 0xFF).toString(16).padStart(2, '0');
        ipv6_2 = `${part1_2}:${part2_2}:${part3_2}::1`;
    }

    document.getElementById('ipv6-output1').textContent = ipv6_1;
    document.getElementById('ipv6-output2').textContent = ipv6_2;
});


// قابلیت کپی کردن متن از المان مشخص‌شده
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const targetId = this.getAttribute('data-target');
        const text = document.getElementById(targetId).textContent;
        navigator.clipboard.writeText(text).then(() => {
            const originalHTML = this.innerHTML;
            this.innerHTML = '<span style="font-size:1.2rem;">✓</span>';
            setTimeout(() => {
                this.innerHTML = originalHTML;
            }, 1500);
        }).catch(err => {
            console.error("کپی نشد:", err);
        });
    });
});
