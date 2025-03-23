// تعریف رنج‌های CIDR به صورت آرایه برای هر کشور
const cidrRanges = {
    Germany: [
        "89.249.65.0/24",
        "185.220.70.0/24",
        "185.232.23.0/24",
        "91.207.172.0/24",
        "212.103.50.0/24",
        "193.176.87.0/24",
        "37.221.114.0/24",
        "93.177.73.0/24",
        "192.145.125.0/24",
        "45.87.212.0/24",
        "37.120.195.0/24",
        "37.120.196.0/24",
        "37.120.197.0/24",
        "37.120.222.0/24",
        "37.120.223.0/24",
        "45.141.152.0/24",
        "146.70.101.0/24",
        "194.187.250.0/25",
        "83.143.245.128/25",
        "77.243.189.32/27",
        "77.243.189.144/28",
        "77.243.189.80/29",
        "77.243.189.132/30",
        "77.243.189.64/30",
        "185.9.236.0/22",
        "91.231.224.0/23",
        "185.93.180.0/24",
        "185.230.127.0/24",
        "83.97.23.0/24",
        "194.36.108.0/24",
        "193.176.86.0/24",
        "152.89.163.0/24",
        "217.138.216.0/24",
        "83.143.245.0/25",
        "89.36.76.0/25",
        "89.36.76.128/25",
        "31.42.128.0/23",
        "31.42.144.0/23",
        "31.42.131.0/24",
        "31.42.153.0/24",
        "46.165.192.0/18",
        "178.162.192.0/18",
        "84.16.224.0/19",
        "78.159.96.0/19",
        "212.95.32.0/19",
        "217.20.112.0/20",
        "37.58.48.0/20",
        "91.109.16.0/20",
        "78.159.96.0/21",
        "178.162.240.0/21",
        "46.165.192.0/21",
        "46.165.216.0/21",
        "46.165.224.0/21",
        "46.165.232.0/21",
        "46.165.240.0/21",
        "178.162.192.0/21",
        "178.162.208.0/21",
        "91.109.16.0/21",
        "178.162.200.0/22",
        "217.20.112.0/22",
        "78.159.112.0/22",
        "78.159.116.0/22",
        "84.16.236.0/22",
        "62.209.32.0/19",
        "81.201.96.0/19",
        "89.202.0.0/17",
        "217.68.144.0/20",
        "217.79.208.0/20",
        "46.183.152.0/21",
        "88.84.136.0/21",
        "137.174.16.0/21",
        "137.174.24.0/21",
        "193.110.116.0/22",
        "137.174.68.0/22",
        "137.174.104.0/22",
        "137.174.76.0/22",
        "51.163.32.0/22",
    ],
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
