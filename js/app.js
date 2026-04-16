document.addEventListener('DOMContentLoaded', () => {
    initRegistrationForm();
    initProductDropdown();
    initKodeposLookup();
});

function initRegistrationForm() {
    const form = document.getElementById('registrationForm');
    if (!form) {
        return;
    }

    const fields = {
        name: document.getElementById('name'),
        address: document.getElementById('address'),
        email: document.getElementById('email'),
        password: document.getElementById('password'),
        subject: document.getElementById('subject'),
        agree: document.getElementById('agree'),
    };

    const errors = {
        name: document.getElementById('name-error'),
        address: document.getElementById('address-error'),
        email: document.getElementById('email-error'),
        password: document.getElementById('password-error'),
        subject: document.getElementById('subject-error'),
        agree: document.getElementById('agree-error'),
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        clearText(errors);

        let isValid = true;

        if (!fields.name.value.trim() || /\d/.test(fields.name.value)) {
            errors.name.textContent = 'Please enter your name properly.';
            isValid = false;
        }

        if (!fields.address.value.trim()) {
            errors.address.textContent = 'Please enter your address.';
            isValid = false;
        }

        const emailValue = fields.email.value.trim();
        if (!emailValue || !emailValue.includes('@') || !emailValue.includes('.')) {
            errors.email.textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        if (!fields.password.value || fields.password.value.length < 6) {
            errors.password.textContent = 'Please enter a password with at least 6 characters.';
            isValid = false;
        }

        if (!fields.subject.value) {
            errors.subject.textContent = 'Please select your course.';
            isValid = false;
        }

        if (!fields.agree.checked) {
            errors.agree.textContent = 'Please agree to the above information.';
            isValid = false;
        }

        if (isValid) {
            alert('Form submitted successfully!');
            form.reset();
        }
    });

    form.addEventListener('reset', () => {
        clearText(errors);
    });
}

function initProductDropdown() {
    const category = document.getElementById('productCategory');
    const brand = document.getElementById('productBrand');
    const result = document.getElementById('productResult');
    const resultText = document.getElementById('productResultText');

    if (!category || !brand) {
        return;
    }

    const brandMap = {
        Desktop: ['Acer', 'Dell', 'Lenovo'],
        Laptop: ['Asus', 'Acer', 'Sony Vaio'],
        Smartphone: ['Samsung', 'LG', 'Sony Xperia'],
    };

    const resetBrand = () => {
        brand.innerHTML = '<option value="">Pilih Merk</option>';
        brand.disabled = true;
        if (result) {
            result.classList.remove('active');
        }
    };

    category.addEventListener('change', () => {
        resetBrand();

        const items = brandMap[category.value] || [];
        if (!items.length) {
            return;
        }

        items.forEach((item) => {
            const option = document.createElement('option');
            option.value = item;
            option.textContent = item;
            brand.appendChild(option);
        });

        brand.disabled = false;
    });

    brand.addEventListener('change', () => {
        if (!result || !resultText) {
            return;
        }

        if (brand.value) {
            resultText.textContent = ` ${brand.value}`;
            result.classList.add('active');
        } else {
            result.classList.remove('active');
        }
    });
}

function initKodeposLookup() {
    const provinsi = document.getElementById('provinsi');
    const kabupaten = document.getElementById('kabupaten');
    const kecamatan = document.getElementById('kecamatan');
    const kodepos = document.getElementById('kodepos');
    const resultPanel = document.getElementById('resultPanel');
    const resultKode = document.getElementById('resultKode');
    const resultInfo = document.getElementById('resultInfo');

    if (!provinsi || !kabupaten || !kecamatan || !kodepos) {
        return;
    }

    const kodePosData = {
        jawaBarat: {
            bandung: {
                Coblong: { kodepos: '40141', info: 'Kota Bandung, Jawa Barat' },
                'Cibeunying Kidul': { kodepos: '40121', info: 'Kota Bandung, Jawa Barat' },
                Sukasari: { kodepos: '40151', info: 'Kota Bandung, Jawa Barat' },
                Andir: { kodepos: '40181', info: 'Kota Bandung, Jawa Barat' },
                Cicendo: { kodepos: '40117', info: 'Kota Bandung, Jawa Barat' },
            },
            bekasi: {
                'Bekasi Selatan': { kodepos: '17141', info: 'Kota Bekasi, Jawa Barat' },
                'Bekasi Utara': { kodepos: '17121', info: 'Kota Bekasi, Jawa Barat' },
                'Bekasi Timur': { kodepos: '17111', info: 'Kota Bekasi, Jawa Barat' },
                'Bekasi Barat': { kodepos: '17141', info: 'Kota Bekasi, Jawa Barat' },
            },
            bogor: {
                'Tanah Sareal': { kodepos: '16111', info: 'Kota Bogor, Jawa Barat' },
                'Bogor Utara': { kodepos: '16152', info: 'Kota Bogor, Jawa Barat' },
                'Bogor Selatan': { kodepos: '16131', info: 'Kota Bogor, Jawa Barat' },
            },
        },
        jawaTengah: {
            semarang: {
                'Semarang Tengah': { kodepos: '50131', info: 'Kota Semarang, Jawa Tengah' },
                'Semarang Utara': { kodepos: '50117', info: 'Kota Semarang, Jawa Tengah' },
                'Semarang Selatan': { kodepos: '50141', info: 'Kota Semarang, Jawa Tengah' },
                Gajahmungkur: { kodepos: '50132', info: 'Kota Semarang, Jawa Tengah' },
            },
            solo: {
                Laweyan: { kodepos: '57148', info: 'Kota Surakarta, Jawa Tengah' },
                Banjarsari: { kodepos: '57138', info: 'Kota Surakarta, Jawa Tengah' },
                Jebres: { kodepos: '57126', info: 'Kota Surakarta, Jawa Tengah' },
            },
        },
        dkiJakarta: {
            jakartaPusat: {
                Gambir: { kodepos: '10110', info: 'Jakarta Pusat, DKI Jakarta' },
                'Sawah Besar': { kodepos: '10710', info: 'Jakarta Pusat, DKI Jakarta' },
                Kemayoran: { kodepos: '10620', info: 'Jakarta Pusat, DKI Jakarta' },
                'Cempaka Putih': { kodepos: '10510', info: 'Jakarta Pusat, DKI Jakarta' },
            },
            jakartaSelatan: {
                'Kebayoran Baru': { kodepos: '12110', info: 'Jakarta Selatan, DKI Jakarta' },
                'Kebayoran Lama': { kodepos: '12240', info: 'Jakarta Selatan, DKI Jakarta' },
                'Mampang Prapatan': { kodepos: '12790', info: 'Jakarta Selatan, DKI Jakarta' },
            },
            jakartaBarat: {
                'Grogol Petamburan': { kodepos: '11440', info: 'Jakarta Barat, DKI Jakarta' },
                'Taman Sari': { kodepos: '11150', info: 'Jakarta Barat, DKI Jakarta' },
                Cengkareng: { kodepos: '11840', info: 'Jakarta Barat, DKI Jakarta' },
            },
        },
        jawaTimur: {
            surabaya: {
                Gubeng: { kodepos: '60281', info: 'Kota Surabaya, Jawa Timur' },
                Wonokromo: { kodepos: '60243', info: 'Kota Surabaya, Jawa Timur' },
                Rungkut: { kodepos: '60293', info: 'Kota Surabaya, Jawa Timur' },
                Tegalsari: { kodepos: '60262', info: 'Kota Surabaya, Jawa Timur' },
            },
            malang: {
                Klojen: { kodepos: '65111', info: 'Kota Malang, Jawa Timur' },
                Sukun: { kodepos: '65147', info: 'Kota Malang, Jawa Timur' },
                Lowokwaru: { kodepos: '65141', info: 'Kota Malang, Jawa Timur' },
            },
        },
        bali: {
            denpasar: {
                'Denpasar Selatan': { kodepos: '80224', info: 'Kota Denpasar, Bali' },
                'Denpasar Timur': { kodepos: '80237', info: 'Kota Denpasar, Bali' },
                'Denpasar Barat': { kodepos: '80118', info: 'Kota Denpasar, Bali' },
                'Denpasar Utara': { kodepos: '80116', info: 'Kota Denpasar, Bali' },
            },
        },
    };

    const postalProvinsi = {
        jawaBarat: 'Jawa Barat',
        jawaTengah: 'Jawa Tengah',
        dkiJakarta: 'DKI Jakarta',
        jawaTimur: 'Jawa Timur',
        bali: 'Bali',
    };

    const postalKabupaten = {
        jawaBarat: { bandung: 'Kota Bandung', bekasi: 'Kota Bekasi', bogor: 'Kota Bogor' },
        jawaTengah: { semarang: 'Kota Semarang', solo: 'Kota Surakarta' },
        dkiJakarta: { jakartaPusat: 'Jakarta Pusat', jakartaSelatan: 'Jakarta Selatan', jakartaBarat: 'Jakarta Barat' },
        jawaTimur: { surabaya: 'Kota Surabaya', malang: 'Kota Malang' },
        bali: { denpasar: 'Kota Denpasar' },
    };

    const postalKecamatan = {
        bandung: { Coblong: 'Coblong', 'Cibeunying Kidul': 'Cibeunying Kidul', Sukasari: 'Sukasari', Andir: 'Andir', Cicendo: 'Cicendo' },
        bekasi: { 'Bekasi Selatan': 'Bekasi Selatan', 'Bekasi Utara': 'Bekasi Utara', 'Bekasi Timur': 'Bekasi Timur', 'Bekasi Barat': 'Bekasi Barat' },
        bogor: { 'Tanah Sareal': 'Tanah Sareal', 'Bogor Utara': 'Bogor Utara', 'Bogor Selatan': 'Bogor Selatan' },
        semarang: { 'Semarang Tengah': 'Semarang Tengah', 'Semarang Utara': 'Semarang Utara', 'Semarang Selatan': 'Semarang Selatan', Gajahmungkur: 'Gajahmungkur' },
        solo: { Laweyan: 'Laweyan', Banjarsari: 'Banjarsari', Jebres: 'Jebres' },
        jakartaPusat: { Gambir: 'Gambir', 'Sawah Besar': 'Sawah Besar', Kemayoran: 'Kemayoran', 'Cempaka Putih': 'Cempaka Putih' },
        jakartaSelatan: { 'Kebayoran Baru': 'Kebayoran Baru', 'Kebayoran Lama': 'Kebayoran Lama', 'Mampang Prapatan': 'Mampang Prapatan' },
        jakartaBarat: { 'Grogol Petamburan': 'Grogol Petamburan', 'Taman Sari': 'Taman Sari', Cengkareng: 'Cengkareng' },
        surabaya: { Gubeng: 'Gubeng', Wonokromo: 'Wonokromo', Rungkut: 'Rungkut', Tegalsari: 'Tegalsari' },
        malang: { Klojen: 'Klojen', Sukun: 'Sukun', Lowokwaru: 'Lowokwaru' },
        denpasar: { 'Denpasar Selatan': 'Denpasar Selatan', 'Denpasar Timur': 'Denpasar Timur', 'Denpasar Barat': 'Denpasar Barat', 'Denpasar Utara': 'Denpasar Utara' },
    };

    fillSelect(provinsi, '-- Pilih Provinsi --', postalProvinsi);

    provinsi.addEventListener('change', () => {
        resetSelect(kabupaten, '-- Pilih Kabupaten/Kota --');
        resetSelect(kecamatan, '-- Pilih Kecamatan --');
        kodepos.value = '';
        hideResult(resultPanel);

        if (!provinsi.value) {
            kabupaten.disabled = true;
            kecamatan.disabled = true;
            return;
        }

        const kabMap = postalKabupaten[provinsi.value] || {};
        fillSelect(kabupaten, '-- Pilih Kabupaten/Kota --', kabMap);
        kabupaten.disabled = false;
        kecamatan.disabled = true;
    });

    kabupaten.addEventListener('change', () => {
        resetSelect(kecamatan, '-- Pilih Kecamatan --');
        kodepos.value = '';
        hideResult(resultPanel);

        if (!kabupaten.value) {
            kecamatan.disabled = true;
            return;
        }

        const kecMap = postalKecamatan[kabupaten.value] || {};
        fillSelect(kecamatan, '-- Pilih Kecamatan --', kecMap);
        kecamatan.disabled = false;
    });

    kecamatan.addEventListener('change', () => {
        hideResult(resultPanel);
        kodepos.value = '';

        const provValue = provinsi.value;
        const kabValue = kabupaten.value;
        const kecValue = kecamatan.value;

        if (!provValue || !kabValue || !kecValue) {
            return;
        }

        const result = kodePosData[provValue]?.[kabValue]?.[kecValue];
        if (!result) {
            return;
        }

        kodepos.value = result.kodepos;
        if (resultKode && resultInfo) {
            resultKode.textContent = result.kodepos;
            resultInfo.textContent = result.info;
        }
        showResult(resultPanel);
    });

    function fillSelect(select, placeholder, items) {
        select.innerHTML = `<option value="">${placeholder}</option>`;
        Object.entries(items).forEach(([value, label]) => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = label;
            select.appendChild(option);
        });
    }

    function resetSelect(select, placeholder) {
        select.innerHTML = `<option value="">${placeholder}</option>`;
    }

    function showResult(panel) {
        if (panel) {
            panel.classList.add('active');
        }
    }

    function hideResult(panel) {
        if (panel) {
            panel.classList.remove('active');
        }
    }
}

function clearText(elements) {
    Object.values(elements).forEach((element) => {
        if (element) {
            element.textContent = '';
        }
    });
}