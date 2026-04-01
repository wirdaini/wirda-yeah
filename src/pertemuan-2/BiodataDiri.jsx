export default function BiodataDiri() {
    return (
        <div>
            <h1>Pemrograman Framework Lanjutan</h1>
            <p className="slogan-1">Selamat Belajar ReactJS</p>
            <Greating />
           
            {/* Garis pemisah */}
            <hr className="section-divider" />         
            <h2>BIODATA SAYA</h2>
            <div className="biodata-container">
                <FotoProfile />
                <InfoBiodata />
            </div>
           
            {/* Quote */}
            <QuoteText />
        </div>
    );
}

function Greating() {
    return (
        <div>
            <p className="slogan-2"><strong>Semoga Belajar ReactJS Menyenangkan</strong></p>
        </div>
    );
}

function FotoProfile() {
    return (
        <div className="foto-profile">
            <div className="foto-persegi">
                <img
                    src="/fotowirda.jpeg"
                    alt="Foto Profil Wirda Aini"
                />
            </div>
        </div>
    );
}

function InfoBiodata() {
    return (
        <div className="info-biodata">
            <p><strong>Nama</strong> : Wirda Aini Maqhfiroh</p>
            <p><strong>NIM</strong> : 2457301153</p>
            <p><strong>Tanggal Lahir</strong> : 04 May 2006</p>
            <p><strong>Alamat</strong> : Duri, Riau</p>
            <p><strong>Program Studi</strong> : Sistem Informasi</p>
            <p><strong>Kampus</strong> : Politeknik Caltex Riau</p>
            <p><strong>Email</strong> : wirda24si@mahasiswa.pcr.ac.id</p>
        </div>
    );
}

function QuoteText() {
    const text = "Building a future is like developing a system — it takes planning, consistency, and continuous improvement to transform ideas into something useful and impactful.";
    const text2 = "- Wirda Aini -";

    return (
        <div className="quote">
            <p className="quote-text">"{text}"</p>
            <p className="quote-author">{text2}</p>
        </div>
    );
}

