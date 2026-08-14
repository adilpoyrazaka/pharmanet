# Anlaşmalı Eczane Bulucu — Proje Taslağı v0.1

> Bu dosya projenin tek gerçek kaynağıdır. Repo kökünde durur. Claude Code, ChatGPT
> ve Gemini oturumlarının hepsi işe buradan başlar. Burada olmayan şey kodda olmaz.
> Değişiklikler `decisions.md`'ye gerekçesiyle yazılır.
>
> **Dil kuralı (dosyanın tamamı için).** Teknik adlandırma — tablo, sütun, alan,
> kod, commit mesajı — İngilizce. Kullanıcı arayüzü Türkçe; İngilizce arayüz
> seçeneği var ancak İngilizce sayfalar indekslenmez (`noindex`): yerel hizmet
> için İngilizce arama talebi yok ve ince yinelenen sayfa SEO'ya zarar verir.
> `/tr/` ve `/en/` yönlendirme yapısı ile `hreflang` ilk günden doğru kurulur;
> sonradan URL değiştirmek birikmiş sıralamayı yakar.

---

## 1. Tez

**Sorun:** Özel/tamamlayıcı sağlık sigortası olan kişi, reçetesini kendi sigortasıyla
anlaşmalı bir eczaneye götürmek zorunda. Hangi eczanenin hangi sigortayla anlaşmalı
olduğunu öğrenmenin tek yolu ya eczaneye gidip sormak, ya da 15 ayrı sigorta şirketinin
sitesinde il/ilçe filtreli listeleri tek tek taramak.

**Çözüm:** Sigortanı seç → konumuna en yakın anlaşmalı eczaneleri gör. Tek ekran,
kayıt yok, uygulama indirme yok.

**Neden şimdi kimse yapmıyor:** Yapmak kolay değil çünkü veri 15 ayrı sitede,
standart dışı formatlarda, haber verilmeden değişiyor ve eczaneleri birbirine
eşlemek için kanonik bir kimlik yok. İş fikrin değeri fikirde değil, **bu veriyi
sürekli temiz tutabilme kabiliyetinde**. Kopyalanması zor olan kısım burası.

**Ürünün gerçek vaadi:** Hız değil, **güven**. Kullanıcıyı yanlış eczaneye
gönderirsek bir daha gelmez. Her kayıt "en son ne zaman doğrulandı" damgası taşır
ve bu damga arayüzde gizlenmez, öne çıkarılır.

---

## 2. Kararı Belirleyen Gerçekler

Bunlar kısıt değil, projenin üzerine kurulduğu zemin. İkisi de ölçülebilir ve
inşaatı durdurmaz; yönü belirlerler. Ayrı etiketleri yoktur (D35) — her ikisi
de kendi kulvarında kayıtlıdır ve oradan izlenir. İkisi de Faz 0'ın çıktısı
değildir: Faz 0 altyapı üretir, ölçüm değil (D38).

| Soru | Neden hayati | Nasıl ölçülür | Nerede izlenir |
|---|---|---|---|
| Soranların kaçında gerçekten ilaç teminatı var? | Pazarın gerçek büyüklüğü bu | Poi'nin sektör içi ağı üzerinden | Poi kulvarı. Yayınlanmış poliçe hacmi ayrı bir büyüklüktür ve bir `R` görevidir (§15) |
| Eczaneler için reklam yasağı ücretli öne çıkarmayı kapatıyor mu? | Tüketici tarafındaki en bariz gelir modelini öldürebilir | Eczacı odasına yazılı soru + bir avukata 1 saatlik danışma | **A4.1** |

**Reklam yasağı için ön not:** Türkiye'de eczaneler için reklam yasağı var ama
"bilgilendirme" ile "reklam" arasında ayrım var. Nesnel bir dizin kaydı (bu
eczane şu şirketle anlaşmalı) bilgilendirmeye yakın; **para karşılığı sıralama
yükseltme** açık reklamdır. Yani ürünün kendisi büyük olasılıkla sorunsuz, ama
gelir modelinin eczaneden gelen ayağı riskli. Bunu varsayımla geçme, teyit al.

---

## 3. Kullanıcı ve Tetikleyici An

Ürünü tasarlarken hayal edilen kullanıcı "sigorta araştıran kişi" değil.
Gerçek an şu:

> Kişi eczaneye girdi, reçetesini uzattı, "bizim o sigortayla anlaşmamız yok"
> cevabını aldı. Şu an tezgahın önünde, telefonu elinde, biraz gergin ve
> nereye gideceğini bilmiyor.

Bu tanım her şeyi belirler:

- **Sıfır sürtünme.** Kayıt, onboarding, uygulama indirme yok. Web. Tek ekran.
- **Konum yalnızca sıralama için, saklanmadan.** Hassas koordinat isteğin
  gövdesinde gider, hiçbir yere yazılmaz ve log'lanmaz (D41). İzin verilmezse
  ilçe seçimiyle aynı sonuç mesafesiz gelir — akış durmaz.
- **Erişilebilirlik teknik detay değil, pazar meselesi.** Sürekli ilaç kullanan
  kitle yaş ortalaması yüksek. Büyük punto, yüksek kontrast, büyük dokunma alanları.
- **Dağıtım noktası eczanenin kendisi.** Kişi bu ürüne ihtiyaç duyduğu anda
  fiziksel olarak bir eczanenin içinde.

---

## 4. Dağıtım — İki Motor

### Motor A: Eczane tezgahı (asıl avantaj)

Anlaşması olmayan eczanenin müşteriyi kibarca yönlendirmeye ihtiyacı var.
Anlaşması olan eczanenin bulunmaya ihtiyacı var. **İki taraf da QR kodunu
tezgaha koymak ister.** Bedava, fiziksel, rakibin kopyalayamayacağı bir
dağıtım ağı — ve senin bu ağa erişimin var.

Yürütme: masaüstü stant/sticker → QR → doğrudan sonuç ekranı. Her eczaneye
farklı UTM etiketi ver ki hangi noktanın çalıştığını ölçebilesin.

### Motor B: Programatik SEO

"Allianz anlaşmalı eczane Karşıyaka" tipi long-tail aramalar bugün vasat
içerik siteleri tarafından karşılanıyor. Kurum × il × ilçe kombinasyonu
on binlerce gerçek, faydalı sayfa demek.

**Bu yüzden Streamlit reddedilmesi doğru bir karardı** — sunucu tarafı
render edilmeyen bir uygulama bu motoru baştan kaybeder. SEO burada
pazarlama değil, mimari bir gereksinim.

---

## 5. Gelir Katmanları (sırayla, hepsi aynı anda değil)

| Katman | Kim öder | Ne zaman | Neden bu sırada |
|---|---|---|---|
| L0 — Gelir yok | — | Faz 1 | Önce güven, doğruluk ve ilk kullanım. |
| L1 — Reklam | Dermokozmetik, gıda takviyesi, bebek/kişisel bakım, sağlık dışı markalar | Faz 2–3 | **Müzakere gerektirmez.** Tek girdisi trafik. Not: beşeri tıbbi ürünlerin halka tanıtımı mevzuatla yasak — ilaç reklamı bu listede yok. |
| L2 — Çapraz trafik ortaklıkları | Dizin siteleri, doktor/hastane profil siteleri | Faz 2–3 | Karşılıklı fayda; güç dengesi eşit taraflarla kurulur. |
| L3 — Veri ürünü / API | Sigorta şirketleri, brokerlar | Faz 4 | **Kaldıraç kapısının arkasında.** Aşağıya bak. |
| L4 — Beyaz etiket | Sigorta şirketi kendi sitesine gömer | Faz 4+ | Aynı kapı. |
| L5 — Eczane tarafı ürün | Eczaneler | Sonra | Reklam yasağı + Veressiye ile kapsam çakışması. |

### Güven Yüzeyi Kuralı (tüm gelir kanalları için tek kural)

**Eczane sonuç yüzeyi hiçbir gelir kanalına açılmaz.** Reklam, affiliate,
sponsorlu sıralama, e-ticaret yönlendirmesi — hiçbiri sonuç listesinin içinde,
sıralamasında veya kartlarında yer almaz. Hepsi sonuç yüzeyinin dışında,
ayrı ve açıkça etiketli alanlarda yaşar.

Gerekçe: tek gerçek varlığımız doğru cevap verdiğimize duyulan güven. Sonuç
sıralamasına para karıştığı an ürün, kaçtığı kategorinin bir üyesi olur —
ve eczane reklam yasağıyla da doğrudan çarpışır. Bu kural, gelir modelleri
değiştikçe yeniden tartışılmaz.

### Kaldıraç Kapısı (bağlayıcı kural)

Sigorta şirketiyle ticari masaya, **iki koşul birden** sağlanmadan oturulmaz:

1. Kayda değer ve tekrar eden tüketici trafiği.
2. Kendi kaydını **sahiplenmiş ve doğrulamış** bir eczane ağı.

Gerekçe: kazınmış veriyle şirketin karşısına çıkmak zayıf pozisyondur — "bu bizim
verimiz, kaldırın" der ve elinde koz kalmaz. Ama eczaneler kendi kayıtlarını
doğruladığında veri **birinci elden** hale gelir. Bu tek hamle üç şeyi aynı anda
yapar: hukuki açığı kapatır, veri kalitesini kaynağında çözer ve müzakerede
izin isteyen taraf olmaktan çıkıp dağıtım sunan taraf olursun.

**Sonuç: eczane sahiplenme akışı Faz 2'nin yan özelliği değil, Faz 1–2'nin
ana hedefidir.**

**Kritik uyarı:** Sigorta poliçesi satışına yönlendirme (lead satışı) acentelik
gerektirir. Lisanslı bir acenteyle ortaklık kurmadan bu kapıya girme.

**En güçlü varlık ürün değil, veri.** Türkiye genelinde eczane–sigorta ağ
ilişkisinin temiz, tarihli, coğrafi kodlanmış bir veri kümesi kamuya açık
olarak mevcut değil. Zaman içinde "hangi kurum ağını nerede genişletiyor"
sorusunun cevabı da sende birikir. Bunun alıcısı vardır.

---

## 6. Teknik Mimari

Karar ilkesi: bu bir hafta sonu projesi gibi değil, **üç yıl bakımı yapılacak
bir veri ürünü** gibi kurulur. Ucuzluk için mimari taviz verilmez; gereksiz
karmaşıklık da eklenmez.

### 6.1 Frontend

- **Next.js (App Router) + React + TypeScript.** Programatik SEO sunucu tarafı
  render gerektiriyor; bu seçim pazarlıksız.
- **Tailwind CSS + Radix primitives.** Bileşen kütüphanesi hazır tema olarak
  değil, sadece erişilebilirlik iskeleti olarak kullanılır.
- **Harita yüzeyi yok (D3).** Yol tarifi, telefonun harita uygulamasına derin
  bağlantıyla devredilir; ürün içinde taban harita çizilmez. Gerekirse ileride
  MapLibre + vektör tile.
- Google Places yalnızca coğrafi kodlama ve zenginleştirme için, arka planda.

### 6.2 Veri hattı (ayrı servis, Python)

```
Playwright ile çekim  →  ham HTML anlık görüntüsü (obje depolama, denetim izi)
        ↓
  Ayrıştırma (kaynak başına parser)
        ↓
  Normalizasyon  →  varlık eşleme  →  coğrafi kodlama
        ↓
  dbt modelleri (staging → intermediate → marts)
        ↓
  Postgres + PostGIS (yayın tabloları)
```

- **Ham anlık görüntüyü sakla.** Bir kaynağın yapısı değiştiğinde geçmişi
  yeniden işleyebilmek ve "biz uydurmadık, kaynakta böyleydi" diyebilmek için.
- **Orkestrasyon:** başlangıçta GitHub Actions cron; kaynak sayısı 15'i geçince
  Prefect'e taşı.
- **Kaynak sağlığı izleme:** bir kaynağın kayıt sayısı %X'ten fazla değişirse alarm.
  Sessizce bozulan scraper, bozuk üründen daha tehlikelidir.

### 6.3 Veritabanı

**PostgreSQL + PostGIS.** "X sigortasıyla anlaşmalı, bana en yakın N eczane"
sorgusu tam olarak PostGIS'in işi. Yönetilen sağlayıcı (Neon/Supabase).
Metin arama için `pg_trgm` yeterli, ayrı arama motoru gerekmez.

Her yayın kaydında zorunlu alanlar: `source_url`, `snapshot_id`,
`first_seen_at`, `verified_at`, `verification_method`, `confidence`.

`verified_at` ve `verification_method` kanonik adlardır (D8, D17).
`confidence` bağımsız yazılmaz, `verification_method`'tan türer; D17'nin
60 günlük tazelik eşiği `verified_at` üzerinden hesaplanır.

**Ana tablo `facility`, ayrım `facility_type` (D15).** v1'de tek değerli
(`pharmacy`). Bağlayıcı şart: her sorgu, her dbt modeli ve her bileşik index
`facility_type = 'pharmacy'` koşulunu açıkça taşır — varsayıma bırakılmaz.
Coğrafi sorguların bileşik index'i bu sütunla başlar.

### 6.4 Varlık eşleme — projenin teknik kalbi

Sigorta listeleri eczaneyi ad + adres olarak verir; ortak bir kimlik numarası yok.
"Aynı eczane mi?" sorusunu çözmek gerekiyor:

1. Kanonik eczane kütüğü oluştur — kaynak yalnızca il eczacı odası portalı
   (D12, D20). Google Places kütüğe kayıt eklemez; koordinat, telefon ve
   çalışma saati adayı üretir, uyuşmazlıkta bayrak açar.
2. Ad normalizasyonu (Türkçe karakter, "Ecz." ekleri, unvan değişiklikleri).
3. Adres ayrıştırma + coğrafi kodlama.
4. Bulanık eşleme (trigram benzerliği + coğrafi yakınlık birlikte).
5. **Düşük güvenli eşleşmeler için insan onay ekranı.** Otomatik eşlemeye
   %100 güvenme; belirsiz kalanları kuyruğa al, sen veya halan onaylayın.

Bu modül hem ürünün doğruluk garantisi hem de senin portföyündeki en değerli
mühendislik parçası olacak.

### 6.5 Model API'lerinin ürün içindeki yeri

Model API'leri geliştirme sohbetine değil, **veri hattının içine** bağlanır.
Dört yerde taşıyıcı görev üstlenirler:

1. **Esnek ayrıştırma.** 15 kaynağın DOM yapısı birbirinden farklı ve kırılgan.
   Deterministik parser birincil yol; başarısız olduğunda ham HTML anlık görüntüsü
   bir modele verilir ve yapılandırılmış kayıt olarak çıkarılır.
2. **Kendi kendini onaran scraper.** Kaynak sağlığı alarmı tetiklendiğinde
   (kayıt sayısı beklenmedik şekilde değişti) yeni anlık görüntü modele verilir,
   model yamalı parser'ı önerir, insan onayından sonra devreye girer.
3. **Varlık eşleme hakemliği.** Trigram + coğrafi yakınlık kararsız kaldığında
   (6.4'teki gri bölge) iki kayıt modele sorulur: aynı eczane mi? Gerekçesiyle birlikte.
4. **Türkçe adres normalizasyonu.** Mahalle/sokak/no yazımı standart dışı;
   kural tabanlı ayrıştırıcının bittiği yerde model devralır.

**Çok modelli doğrulama — üç sağlayıcının asıl getirisi burası.** Kritik
çıkarımlarda iki farklı sağlayıcıyla aynı işi yap; hemfikirlerse kabul et,
ayrışıyorlarsa insan onay kuyruğuna düşür. Tek modelin sistematik hatası
böylece ürüne sızmaz. Senin "API'leri birbirine bağlayalım" sezginin
teknik karşılığı bu — asistanlar arası sohbet değil, üretimde çapraz doğrulama.

**Değişmez kural: model asla okuma yolunda çalışmaz.** Kullanıcı sorgusu
saf PostGIS'tir — deterministik, milisaniyelik, maliyetsiz. Model yalnızca
alım zamanında, çevrimdışı, çıktısı veritabanına yazılıp insan tarafından
denetlenebilir şekilde çalışır. Bu kural hem maliyeti hem de "kullanıcıya
uydurma eczane gösterme" riskini sıfırlar.

### 6.6 Fiziksel veri toplama — savunulabilirliğin kaynağı

Kazınan veri başlangıç verisidir; rakip de kazır. Sahadan toplanan veri
**birinci elden**dir ve kopyalanması için aynı ilişki ağının kurulmasını gerektirir.
Beş katman, **gerçek dünyada işleyen sırayla** (kaldıraç sırasıyla değil —
sahiplenme akışı en sona iner, çünkü eczacı görmediği bir platformun formunu doldurmaz):

**K1 — İzmir Eczacı Odası portalı (erişim mevcut).** Eczane portalı üzerinden
yasal veri erişimi zaten var. Kanonik eczane kütüğünün temeli burası — satın
alınacak, kazınacak veya tahmin edilecek bir şey değil. Varlık eşlemenin
referans tarafı bu kütüktür.

**K2 — Pilot: 5 bölge, 183 eczane, yüz yüze.** Kendi bölgesi + çevredeki
4 bölge. Her eczaneyle tek tek görüşme; telefon araması bu turun parçası,
ayrı bir aşama değil. Çıktı ikili: doğrulanmış kurum listesi **ve** kurulmuş
ilişki. Kazınan verinin hata oranı da bu turdan hesaplanır.

**K3 — Depo temsilcileri üzerinden QR sticker dağıtımı.** Ecza deposu
temsilcileri zaten her eczaneyi düzenli ziyaret ediyor; dağıtım kanalı kurulmaz,
kullanılır. Stant değil **sticker** — tezgaha yapışır, yer kaplamaz, reddedilme
eşiği düşük. Her sticker'a ayrı takip etiketi.

**K4 — Telefon turu: kalan İzmir bölgeleri.** Pilot tamamlandıktan sonra veri
toplama ölçeği buraya genişler. Tur bölge bölge ilerler; bir bölge %80 doğrulama
kapısını geçtiğinde tanıtıma açılır (D43). Telefon doğrulaması D8'de kanonik bir
yöntemdir (`phone`) ve saha turundan çok daha ucuzdur.

**K5 — Eczacı sahiplenme akışı (en son).** Eczane tek kullanımlık bağlantıyla
kendi kaydını düzeltir, "doğrulanmış" rozeti alır. Hesap sistemi yok, tek
seferlik jeton yeter. Bu akış ancak platform görünür değere sahip olduğunda
çalışır — o yüzden K1–K4 tamamlanmadan devreye alınmaz.

**Terminoloji kararı: "sigorta şirketi" değil, "kurum".** Sahada eczanelerin
anlaşması yalnızca özel sigorta şirketleriyle değil; banka sandıkları ve diğer
kurum sağlık planları da aynı soruyu üretiyor. Şema ilk günden `institution`
varlığı üzerine kurulur, `institution_type` alanıyla ayrılır. Sonradan
genişletmek pahalıya patlar (D7).

**Şema sonucu (şimdi kararlaştırılır, sonra değil):** her kayıt
`verification_method` (`chamber` / `field` / `phone` / `self_claimed` /
`scraped`) ve `verified_at` taşır. Bu beş değer kanoniktir — `field` K2 saha
turunun çıktısıdır ve atlanamaz (D8). `confidence` bağımsız yazılmaz,
`verification_method`'tan türer; arayüz en güçlü doğrulamayı gösterir.

**Yenileme sıklığı katman başınadır (D18).** Oda kütüğü aylık, kurum anlaşma
listeleri haftalık, nöbet verisi günlük. Saha/telefon doğrulaması sıklıkla değil
tazelik eşiğiyle yönetilir: `verified_at` üzerinden **60 gün** geçen kayıt
"doğrulanmış" rozetini kaybeder, silinmez, tarihiyle gösterilir (D17).

**Kütük tüm eczaneleri kapsar (D16).** Nöbet tutmayanlar dahil; kütük nöbet
listesinden türetilemez. Bölge sayıları şemada bir alan değildir: her oda
dışa aktarımı `snapshot_id` ve `fetched_at` ile saklanır (D14, §6.3), sayım
o snapshot üzerinde bir `COUNT` sorgusudur. Sayıyı sütuna yazmak ilk aylık
tazelemede sessizce bayatlayan bir kopya üretir. 183 rakamı 2026-08-12
snapshot'ının çıktısıdır (Balçova-1 36, Balçova-2 17, Hatay 60,
Mithatpaşa 37, Üçyol 33).

**Çelişki kuralı:** Şirketin yayınlanmış listesi "evet", eczane "hayır" diyorsa
**eczanenin beyanı kazanır** — müşteriyi geri çevirecek olan o. Ama iki kayıt da
saklanır ve çelişki olarak işaretlenir.

**Ve çelişki veri seti kaldıraç kapısının anahtarıdır.** "Yayınladığınız listenin
şu kadarı hatalı, bizde doğrusu var" cümlesi, sigorta şirketiyle masaya
oturulduğunda elde tutulabilecek en güçlü kozdur. Bu veri seti kendiliğinden,
K1–K4 çalıştıkça birikir.

**KVKK notu:** eczane bir işletmedir, verisi ticari veridir. Eczacının şahsi
bilgisi tutulmaz — işletme tutulur, kişi tutulmaz.

### 6.7 Barındırma ve gözlemlenebilirlik

- Next.js → Vercel. Python işçi → Fly.io veya Railway. Veritabanı → Neon/Supabase.
- Analitik → Plausible veya PostHog (KVKK açısından Google Analytics'ten temiz).
- Hata izleme → Sentry.
- **Hesap yok, kalıcı kişisel veri yok.** Hassas konum yalnızca sıralama anında
  işlenir, saklanmaz ve log'lanmaz (D41).

---

## 7. Tasarım Yönü (ChatGPT'ye brief)

Bu ürün "havalı bir startup sitesi" değil. **Hafif stresli bir anda kullanılan
bir güven aracı.** Ama Türkiye'deki mevcut eczane dizinleri tasarım olarak
zayıf; bu, tasarımın kendisini gerçek bir rekabet silahı yapıyor.

**Ayrım (bağlayıcı): zanaat ile yenilik aynı şey değil.**

- **Zanaat** = tipografi, hız, hiyerarşi, boşluk, kısıtlı ve ayırt edilebilir
  bir görsel kimlik. Bu kategoride ilk kez "iyi yapılmış" hissi veren ürün olmak
  başlı başına farklılaşmadır ve sınırsız yatırım yapılır.
- **Yenilik** = kullanıcının öğrenmesi gereken yeni etkileşim kalıbı. Bir
  yardımcı araçta bu maliyettir. Kullanıcı gergin, ilaç arıyor, öğrenmek istemiyor.

Kural: **tanınmadık bir ürün gibi görün, tanıdık bir ürün gibi çalış.**

"Yenilikçi" burada şu üç şey demek:

1. **Cevaba giden en kısa yol.** Açılış ekranı zaten sonuç ekranı olsun.
   Karşılama sayfası, kaydırmalı tanıtım, modal yok.
2. **Radikal veri şeffaflığı.** Her sonuç kartında son doğrulama tarihi ve
   kaynak bağlantısı. Rakiplerin hiçbiri bunu yapmıyor; ürünün karakteri bu.
3. **İmza harita değil, sonuç kartı.** Ürün içinde harita yok (D3); ayırt edici
   yüzey listenin kendisidir. Tipografi, hiyerarşi ve doğrulama rozetinin
   işlenişi tasarımın ağırlığını taşıdığı yerdir.

Zorunlu teknik kısıtlar:
- **Tipografi Türkçe diakritik güvenli olmalı.** Trend fontların çoğu ğ, ş, ı, İ
  glifleriyle bozuluyor. Font seçimi bu testten geçmeden onaylanmaz.
- Yaşlı kullanıcı için taban: minimum 16px gövde, WCAG AA kontrast, 44px dokunma alanı.
- Hareket yalnızca durum anlatır (mesafeye göre yeniden sıralama gibi), süs olarak yok.
- Klavye odağı görünür, `prefers-reduced-motion` desteklenir.

Yasak kalıplar: kayıt duvarı, uygulama indirme kesmesi, gereksiz çerez banner'ı,
gradyan kahraman bölümü, stok illüstrasyon.

---

## 8. Hukuk ve Uyum

- **Veri kaynağı:** Yalnızca kamuya açık ticari işletme bilgisi (ad, adres, şirket
  ilişkisi). robots.txt'e uy, hız sınırla, önbellekle, kaynağı göster.
- **Kullanıcı verisi:** Hesap yok, kayıt yok. Hassas konum yalnızca sıralama
  anında işlenir; saklanmaz, log'lanmaz, analitiğe gönderilmez ve URL'de
  taşınmaz (D41). Aydınlatma metni bu kapsamı birebir yazar — "konumunuz bize
  gelmiyor" denmez.
- **Marka kullanımı:** Şirket adını olgusal olarak anmak (bu eczane Allianz ile
  anlaşmalı) meşru; logolarını pazarlama materyalinde kullanmak değil.
- **Sorumluluk reddi:** "Bilgi kaynaktan alınmıştır, gitmeden önce teyit ediniz"
  ibaresi her sonuçta. Şirketler kendi sitelerinde bile bunu yazıyor.
- **Kaldırma mekanizması:** Bir eczane veya şirket itiraz ederse hızlı kaldırma yolu.
- **Uzun vadeli hamle:** Şirketlerle çatışmak yerine izin al. Sigortalıyı ağ içinde
  tutmak onların maliyetini düşürür — bu bir hukuki riski ortaklığa çevirir.

---

## 9. Faz Planı

Ölçüm üreten her fazın bir **öldürme kriteri** var. Kriter tetiklenirse proje
durur veya yön değiştirir. Bu kriterler bugün, heyecan yüksekken yazılır — çünkü
sonra yazılmaz. Faz 0'ın kriteri yoktur: çıktısı ölçüm değil altyapıdır.

### Faz 0 — Zemin (Hafta 1–2)
**Paralel iki kol.**
- Poi: §2'nin iki gerçeği (teminat yaygınlığı; mevzuat → A4.1) kendi ağı ve
  prosedürel kanalları üzerinden.
- Teknik: repo, `PROJECT.md`, `decisions.md`, Next.js iskeleti, Postgres+PostGIS,
  **tek bir kurum** için uçtan uca çalışan bir dikey dilim.

**Çıktı:** Lokalde çalışan, tek kurum + tek ilçe için gerçek veriyle doğru cevap veren site.
**Öldürme kriteri:** Yok (D38). Faz 0'ın çıktısı ölçüm değil altyapıdır;
durdurma kararı verecek bir sayı üretmez. Veri tezinin kriteri Faz 1'dedir.

### Faz 1 — Pilot: 5 bölge (Hafta 3–6)
- Tüm kurumlar, 5 pilot bölge. Varlık eşleme modülü + insan onay ekranı.
- Tasarım uygulaması.
- K1 oda portalı kütüğü + K2 saha turu (183 eczane, yüz yüze).
- K3: depo temsilcileri üzerinden QR sticker dağıtımı.

**Yayına alma kuralı: "yayında ama tanıtılmıyor".** Site, yan özellikler
tamamlanmadan önce gerçek alan adında, gerçek veriyle ve indekslenebilir
şekilde açılır — ama hiçbir kanaldan tanıtılmaz.

Gerekçe: arama motorunda sıralama, alan adının yaşı ve tarama geçmişiyle birikir.
Üç ay geç açılan site üç aylık trafiği değil, üç aylık **olgunlaşmayı** kaybeder;
bu geri alınamaz. Buna karşılık itibar riski yok, çünkü henüz kimseyi
yönlendirmiyoruz. Lokal geliştirme sürer; lokal *saklanma* sürmez.

**Tanıtımlı açılış:** bölge bölge. Bir oda bölgesi %80 doğrulama kapısını
geçtiğinde o bölge tanıtıma açılır (D43); reklam katmanı ve il geneline yayılma
bunun arkasındadır.

**Vaat (KİLİT, sayı değil kural — D38):** Kullanıcıya doğrulanmamış hiçbir kayıt
doğrulanmış gibi gösterilmez. `scraped` tek başına sonuç kartında "anlaşmalı"
ifadesini taşıyamaz; kazınmış kayıt yalnızca ayrı ve açıkça ikincil bir yüzeyde,
"kurumun yayınlanmış listesine göre — doğrulanmadı" ibaresiyle görünür.
Kazıma bir yayın kaynağı değil, K1–K2'nin nereye bakacağını daraltan bir
arama alanıdır. Bu kural Faz 1'in kapsamını bilerek daraltır: yayında
"anlaşmalı" diyebildiğimiz kayıtlar K2'de doğrulanmış olanlardır.

**Çıktı:** Canlı site, ölçülen ilk gerçek kullanım.

**Ölçüt 1 — dağıtım:** 6 hafta sonunda QR'lardan haftalık tekrar eden sorgu sayısı.
**Öldürme kriteri 1:** 5 eczanede 6 hafta boyunca haftalık toplam sorgu 50'nin
altındaysa dağıtım tezi yanlış demektir. Ürünü değil, tezi gözden geçir.

**Ölçüt 2 — ölçeklenebilirlik (D38):** K2 bittiğinde kazınmış `kurum × eczane`
çiftlerinin precision'ı; yani kazınmış "evet"lerin sahada doğrulanma oranı.
**Öldürme kriteri 2:** Precision **%50'nin altındaysa** kazıma katmanı arama
alanını daraltmıyor demektir; her kayıt tek tek ayakla toplanır ve Faz 2'nin
üç şehir hedefi aritmetik olarak düşer — saha öncelikli dar ürüne küçülünür.
Recall kritere girmez: eksik eczane göstermek küçük hata, olmayan anlaşmayı
göstermek güven vaadinin ölümüdür (§1).

### Faz 2 — İzmir doygunluğu + SEO (Ay 2–3)
- Tüm İzmir bölgeleri, tüm kurumlar. K4 telefon turu bölge bölge ilerler.
- Programatik SEO sayfaları (kurum × il × ilçe), sitemap, yapılandırılmış veri.
  URL yapısı `institution` varlığı üzerine kurulur (D7); sonradan değiştirmek
  birikmiş sıralamayı yakar.
- Eczane sahiplenme akışı: eczacı kendi kaydını doğrulasın (veri kalitesi + ilişki).

**Ölçüt:** Markasız organik trafiğin QR trafiğini geçtiği hafta. Markalı organik
trafik ayrı izlenir — fiziksel kanalın dijitale geçtiğini gösterir, teşhis
metriğidir (D44).
**Öldürme kriteri:** 3 ay sonunda **markasız** organik arama trafiği ihmal
edilebilir düzeydeyse SEO motoru çalışmıyor demektir; tek motorlu (fiziksel
dağıtım) bir işe küçül.

### Faz 3 — İstanbul + Ankara ve ilk gelir (Ay 4–6)
- Kapsam İstanbul ve Ankara'ya çıkar — kanıtlanmış oyun kitabıyla, deneyerek değil.
- L2 çapraz trafik ortaklıkları: sigorta/TSS karşılaştırma siteleri, doktor ve
  hastane dizinleri, kurumsal İK portalları (§15). Veri kalitesi raporu bu
  görüşmelerin materyalidir.
- L1 reklam katmanı, trafik eşiği aşıldıysa açılır (D30, A2).
- Kurumsal yapı, sözleşme, faturalama.

**Ölçüt:** L1 trafik eşiğine ulaşılması ve L2'den imzalı ilk çapraz trafik anlaşması.
**Öldürme kriteri:** 6 ay sonunda ne L1 trafik eşiği aşılmış ne de L2'den tek bir
imzalı anlaşma çıkmışsa, projeyi trafik/portföy varlığı olarak sınıflandır ve
zaman yatırımını düşür. Sigorta şirketiyle ücretli pilot bu fazın ölçütü değildir
— o L3/L4'tür ve kaldıraç kapısının arkasındadır (D26, D42).

### Faz 4 — Ölçek (Ay 7–12)
Gelir modeli netleştikten sonra: reklam, beyaz etiket, eczane tarafı ürün.
Burayı bugün planlamak erken; Faz 3'ün sonundaki veriyle yazılacak.

---

## 10. Rol ve Dosya Sahipliği

| Kim | Sorumluluk | Sahip olduğu dosya |
|---|---|---|
| **Poi** | Saha verisi, karar, gerçek dünya yürütmesi, dağıtım | — (çıktısı `STATE.md`'ye girer) |
| **Opus (yardımcı)** | Teknik yönetim, karar kaydı, diğer çıktıların denetimi, "hayır" demek | `PROJECT.md`, `decisions.md`, `STATE.md` |
| **Poi + Opus (birlikte)** | Süreç kuralları ve oturum düzeni | `ORCHESTRATION.md`, `session-prompt.md` |
| **Claude Code (Fable)** | Mimari uygulama ve kod | repo kodu, `architecture.md` |
| **ChatGPT** | Tasarım sistemi, arayüz akışları, marka | `design.md` |
| **Gemini** | Kaynak envanteri, veri araştırması, doğrulanabilir tablolar | `research/R1.md … R7.md` |

**Devir teslim kuralı:** Modeller arası bilgi sohbetle değil dosyayla taşınır.
Bir model bir karar verdiyse, o karar dosyaya yazılmadan bir sonraki adım başlamaz.

**Gemini'ye görev formatı:** Her zaman doğrulanabilir çıktı iste. "Araştır" değil;
"şu 15 şirketin anlaşmalı eczane sayfası için: URL, render tipi (statik/JS), filtre
mekanizması, dönen kayıt sayısı, sayfalama var mı — tablo halinde." Uydurursa
tek tıkla anlarsın.

---

## 11. Ana Riskler

| Risk | Etki | Karşılık |
|---|---|---|
| Veri bayatlar, kullanıcı yanlış eczaneye gider | Ürün ölür | Doğrulama tarihi görünür, kaynak sağlığı alarmı, teyit uyarısı |
| Sigorta şirketi engelleme/uyarı gönderir | Kaynak kesilir | Nazik çekim, önbellek, erken temas ve ortaklık teklifi |
| Mevcut nöbetçi eczane uygulamaları özelliği kopyalar | Rekabet | Kopyalanan özellik değil veri hattı; onlar veriyi taze tutamaz |
| Kurucu tükenmesi | Proje durur | Faz sınırları ve öldürme kriterlerine sadık kal |

---

## 12. Sıradaki Tek Adım

Faz 0'ın iki kolu da bu hafta başlar:

1. **Bugün:** Repoyu kur, bu dosyayı ve `decisions.md`'yi işle.
2. **Bu hafta:** Gemini'ye kaynak envanteri görevini ver (doğrulanabilir tablo formatında).
3. **Bu hafta:** Claude Code + Fable ile tek kurum dikey dilimi.

Fazlar sırayla ilerler. Faz 1'e geçmeden Faz 0'ın çıktısı — çalışan dikey dilim —
alınmış olmalıdır.

## 13. Özellik Kaydı — v1

### Sonuç kartında (v1'de var)

| Özellik | Not |
|---|---|
| Açık / kapalı + kapanış saati | Listenin en üstünde. Kapalıysa görsel olarak geri plana düşer |
| Mesafe + yürüme süresi | Varsayılan sıralama: açık olanlar önce, sonra mesafe |
| Anlaşmalı kurum listesi | Doğrulama rozeti + `verified_at` görünür (D8). `scraped` kaynaklı kayıt bu listede yer almaz; ayrı ve ikincil yüzeyde "doğrulanmadı" ibaresiyle gösterilir (D38) |
| Ara (`tel:`) | Tek dokunuş. Güven geri dönüşü: kullanıcı teyit edebilmeli |
| WhatsApp | **Yalnızca `whatsapp_active = true` ise.** Saha turunda doğrulanır |
| Yol tarifi | Google / Apple / Yandex derin bağlantı. Platforma göre sıralanır |
| Paylaş | Başkası adına ilaç alan kullanıcı için gerçek bir ihtiyaç |
| "Bu bilgi yanlış" | Tek dokunuş, form yok. Çelişki veri setini besler (D10) |

**WhatsApp notu:** `wa.me` bağlantısı numara kayıtlı değilse sessizce boş sayfaya
düşer ve kullanıcı "site bozuk" der. Numaranın WhatsApp'lı olduğu uzaktan
güvenilir şekilde tespit edilemez. Doğrulanmamışta hiç göstermemek, bozuk
göstermekten iyidir.

**Harita ayrımı:** Yol tarifi için Google / Apple / Yandex'e derin bağlantı
verilir; navigasyon yazılmaz ve ürün içinde harita yüzeyi çizilmez (D3).
Türkiye'de Yandex kullanımı yüksek olduğu için üçü de sunulur.

### v1'de YOK (bilinçli)

| Özellik | Gerekçe |
|---|---|
| Kullanıcı hesabı / favoriler | KVKK yükü + sürtünme; düşük frekanslı üründe karşılığı yok |
| Yorum / puanlama | Bizi dizin sitesine çevirir; moderasyon yükü ve iftira riski; güven konumlanmasını sulandırır |
| Randevu / rezervasyon | Kapsam dışı |
| İlaç stok sorgulama | Eczane tarafı entegrasyon gerektirir → L5 / Veressiye alanı. Park edildi |
| Native uygulama | Sıfır kurulum temel avantaj (D31 mantığı) |

### UX kuralları (v1)

- Açılış ekranı = sonuç ekranı. Karşılama sayfası yok.
- Konum izni istenmeden önce ilçe seçimiyle sonuç gösterilir. İzin, değerden sonra istenir.
- Seçilen kurum istemci tarafında hatırlanır (hesap yok). İkinci ziyaret tek dokunuş.
- QR sticker → o eczanenin konumuna göre önceden filtrelenmiş sonuç. Konum izni sorulmaz.
- Yük küçük tutulur: mobil veri, zayıf bağlantı varsayılır.

---

## 14. Çalışma Durumu ve Saha Formu

### `facility.status` — katman yığınının üstünde ön filtre

Geçici veya kalıcı kapalılık `is_open`'ın işi değildir. `facility.status`
(`active` / `temporarily_closed` / `closed`) ayrı bir alandır ve katmanlar
hesaplanmadan önce çalışır: `active` olmayan tesis sonuç listesinde açık/kapalı
rozetiyle yer almaz.

Gerekçe: tadilatta olan bir eczane "eczane istisnası" katmanına yazılsaydı,
altındaki öncelik sırası gereği nöbet override onu ezer ve kapalı bir eczaneyi
gece nöbetçisi olarak gösterirdik. Bu, ürünün yapabileceği en pahalı tek hatadır.

Kaynağı K1 / K2 / K5'tir. "Bu bilgi yanlış" bildirimi tek başına statü
değiştirmez; insan onay kuyruğuna düşer (D20'nin kuyruğuyla aynı mantık).

### `is_open` türetilmiş alandır, saha verisi değil

Dört katman, **tepeden tabana; ilk eşleşen kazanır.**

1. **Nöbet override** — o gün nöbetçi olan eczane açıktır. Günlük pipeline,
   oda kaynaklı; `facility_id` ortak olduğu için varlık eşleme gerekmez.
   En üstte olmasının gerekçesi: tatil takvimi bir kural, nöbet listesi o güne
   ait bir olgudur. Kural olguyu ezerse ürün, en çok arandığı gecede tek doğru
   cevabı gizler.

2. **Resmi tatil / bayram takvimi** — nöbetçi değilse günün tipini bu katman
   belirler. Satır bir `day_type` taşır: `full_closure` · `half_day` · `normal`.
   `half_day` kendi `closing_time` değerini getirir — Ramazan ve Kurban Bayramı
   arefeleri ile 28 Ekim'de mesai 13:00'a kadardır. Saat koda gömülmez,
   sütunda durur; şehirler arası fark çıkarsa şema değişmez, satır eklenir.
   Katman boolean olsaydı arefe günü **açık** eczaneleri kapalı gösterirdik;
   yanlışın ters yönü ama aynı maliyet. Tazeleme kuralı D18'dedir: takvim
   yıllık yüklenir, köprü tatilleri olay tetiklidir.

3. **Eczane istisnası** — yalnızca haftalık mesai sapması. İki kaynaktan dolar:
   K2'de bölge kuralıyla çelişen cevap veren eczane bu katmanın ilk satırıdır,
   sonrasında "bu bilgi yanlış" bildirimleri eklenir. Kalıcı/geçici kapalılık
   buraya **yazılmaz** — o `facility.status`'tur.

4. **Bölge/şehir kuralı (yedek)** — anahtar `city + region` (oda bölgesi),
   satırlar `valid_from` ile tarihlidir. Alanlar: hafta içi `closing_time`,
   cumartesi durumu. Yalnızca üstteki üç katmanın hiçbiri eşleşmediğinde
   çalışır. Detay ve gerekçe D45'tedir.

Kartın "açık/kapalı + kapanış saati" satırı (§13) bu yığının çıktısını
gösterir; yarım gün de dahil, gösterilen saat hesaplanan `closing_time`'dır.

---

## 15. Ortaklık Stratejisi

### Kural (KİLİT): kesişme yoksa ortak, kesişme varsa rakip

Farklılaştırıcımızı (kurum katmanı) üretebilecek konumdaki hiçbir tarafa
ortaklık teklifiyle yaklaşılmaz.

Nöbetçi eczane / eczane dizini siteleri bu sınıftadır: trafikleri var, aynı
kullanıcıya sahipler, kurum filtresini ekleyebilirler. Onlara gitmek,
farklılaştırıcıyı en hızlı kopyalayacak tarafa elden teslim etmektir —
bize gereken altı ay, onlara gereken üç hafta.

Aynı zamanda bu, D26'nin (Kaldıraç Kapısı) genel halidir: trafiği sıfır olan
tarafın "ortaklık" teklifi ortaklık değil bağış talebidir.

| Taraf | Kesişme | Karar |
|---|---|---|
| Nöbetçi eczane / eczane dizini siteleri | Yüksek — muhtemel kopyalayıcı | **Temas yok.** Yalnızca istihbarat ve SEO haritası |
| Sigorta / TSS karşılaştırma siteleri | Yok. Kullanıcı poliçeyi yeni almış, sorusu tam bizimki | **Yüksek öncelik**, Faz 3 |
| Doktor / hastane dizinleri | Yok. Aynı kullanıcı, farklı an | Ortak sınıfı, Faz 3 |
| Kurumsal İK / yan hak portalları | Yok. Grup sağlık planlı çalışanlar | Faz 3 |

**Zamanlama:** temas Faz 3'te, kaldıraç kapısının arkasında. O noktada teklif
"trafik takas edelim" değil, "sizde olmayan kurum katmanını verelim" olur.

**SEO notu:** karşılıklı bağlantı takası ölçekte zararlıdır. Hedef, otorite
kaynaklardan **kazanılan** bağlantı — sektör yayınları, yerel basın.

### Doktor / hastane dizinleri — mekanizma

Bunları değerli yapan trafikleri değil **anları**: hastanın doktordan reçeteyle
çıktığı an, tam olarak bizim cevapladığımız sorunun doğduğu an.

Doğru entegrasyon "ortak olalım" değil, **reçete sonrası devir**: "bu reçeteyi
kurumunla nerede kullanabilirsin". Onlar için de mantıklı, çünkü kullanıcıyı bir
adım daha ellerinde tutuyorlar. Ancak bu onların gelir kalemi değil — pazarlık
kozumuz para değil bütünlük. Bu yüzden en ucuz biçimden başlanır: bağlantı,
entegrasyon değil.

Kopyalama riski düşük: kurum katmanını eklemek eczane ilişkisi gerektirir,
onlarda o yok.

### Kupon / indirim — REDDEDİLDİ

Özel doktor seanslarında indirim kuponu fikri üç sebeple reddedildi:

**Mevzuat.** Türkiye'de sağlık hizmeti sunumunda fiyat üzerinden tanıtım ve
indirim kampanyası kısıtlıdır. Eczane tarafındaki A4 teyidi burada daha da
gereklidir.

**Güven.** Doktor bize yerleşim veya kupon için ödeme yaptığı an "anlaşmalı
doktor" listesi tarafsız olmaktan çıkar. Eczanede bu bir satın alma kararıydı;
doktorda bir **sağlık kararı**. D28 burada gevşetilmez, sıkılaştırılır.

**Ters seçilim.** Seansına indirim vermeye razı doktor, ortalamada takvimi boş
olan doktordur. Kupon katmanı sistematik olarak talep görmeyeni öne çıkarır.

### Yerine: fiyat şeffaflığı katmanı

Hastanın kupondan beklediği şey indirim değil, **maliyet belirsizliğinin
bitmesi**. "Bu kurum bu hizmeti karşılıyor, katılım payın yaklaşık şu kadar" —
promosyon değil bilgi. Yasal olarak savunulabilir, güven konumlanmasını
güçlendirir, kupondan daha çok istenen şeydir.

### Sağlık zinciri genişlemesi — PARK EDİLDİ

Doktor, hastane, laboratuvar ve görüntüleme düğümlerinin sisteme dahil edilmesi
Poi'nin kararıyla en sona, ayrı bakılacak alt kategori olarak bırakıldı.
Odak: ürün kalitesi, veri doğruluğu, pazar analizi, stratejik eğilimler.

**Genişleme park edilse de adlandırma kancası karara bağlandı (D15,
2026-08-12):** ana tablo `pharmacy` değil `facility` + `facility_type`.
Genişleme hiç yapılmasa kayıp yok; yapılırsa göç yazmaktan kurtarır.
`facility_type` v1'de tek değerli kalır ve filtre her sorguda açıkça yazılır.
A5 kapandı.

**Boyutlandırma** Gemini brief'ine devredildi: ilaç teminatlı poliçe sayısı,
dizin sitelerinin trafik büyüklüğü, reçete hacmi.

---

## 16. Elde Tutma ve Faydalı Bilgi Katmanı

Kurum filtresi yılda 2–4 kez kullanılan bir özelliktir. Trafik birikmezse reklam
katmanı açılmaz, kaldıraç kapısı (D26) açılmaz, veri ürünü satılmaz. Bu bölüm
iş modelinin darboğazını çözer.

### Temel kural: araç, makale değil

Makale bir kez okunur ve bir daha dönülmez. Araç tekrar kullanılır, paylaşılır,
yer imine eklenir. **Her faydalı bilgi parçası araç formunda üretilir.**
Aynı bilgi, farklı ambalaj, tamamen farklı elde tutma eğrisi.

Bu kural "bilgilendirici içerik" başlığının tamamının cevabıdır; ayrı bir
blog/içerik stratejisi kurulmaz.

### Özellik merdiveni

| Özellik | Karar | Not |
|---|---|---|
| Nöbetçi eczane | **Var** | En yüksek frekanslı kanca: acil, geceleri, tekrar eden. Veri oda kaynaklı, `facility_id` ortak |
| Eşdeğer ilaç bulucu | **Var** | Aynı anda elde tutma kancası ve binlerce sayfalık SEO yüzeyi |
| İlaç fiyatı sorgulama | **Var** | Eşdeğer ile tek araç olarak kurulabilir. Aynı kaynak, aynı arama talebi |
| SGK ödeme durumu / katılım payı | **Sonra** | Veriyi Poi sağlayacak; sırası gelince ayrıca konuşulacak |
| İlaç etkileşim kontrolü | **Yok** | Hata payının bedeli klinik. Bir dizin ürününün taşıyamayacağı sorumluluk |

Eşdeğer aracının çerçevesi: "aynı etken maddeye sahip ürünler, eczacınıza
danışın". Klinik tavsiye verilmez; yayınlanmış veri kullanılabilir hale getirilir.

### Kaynak politikası (KİLİT)

**Yayın kaynağı yalnızca resmi kamuya açık veridir** — TİTCK ve SGK'nın
yayınladığı listeler. Yayınlanmaları meşrudur ve SEO yüzeyi aynıdır.

**Eczacıların kullandığı profesyonel veri tabanları yayın kaynağı DEĞİLDİR.**
Lisanslı ticari ürünlerdir; abonelik sözleşmeleri yeniden yayını yasaklar ve
ihlalin sonucu abone eczaneye yansır. Bu kaynaklar yalnızca **doğrulama
katmanı** olarak kullanılır: resmi listeden çekilen kayıt gerçekle uyuşuyor mu,
güncelleme gecikmesi ne kadar. Dışarı hiçbir kayıt çıkmaz.

Bu, D9'daki desenin aynısıdır: yayın resmi kaynaktan, doğruluk sahadan.

### Editoryal politika

Sağlık bilgisi yayınlamak, dizin olmaktan farklı bir sorumluluk profilidir.

- Yalnızca resmi kaynak. Kendi çıkarımımız asla yayınlanmaz.
- Her sayfada kaynak ve tarih görünür.
- Klinik tavsiye verilmez.

### Mekanik elde tutma (özellik değil, bedava)

- Seçilen kurum istemci tarafında hatırlanır → ikinci ziyaret tek dokunuş.
- PWA / ana ekrana ekleme → uygulama mağazasına girmeden ikon.
- Paylaşım → gönderen kişi geri döner, alan kişi yeni kullanıcı olur.

### Gerçekçi tavan

Bu ürün günlük kullanılan bir ürün olmayacak ve öyleymiş gibi planlanmayacak.
Hedef, kitlenin anlamlı bir kesitini "yılda 2 kez"den "ayda bir civarı"na taşımak.
Bunu yapacak olan nöbetçi eczane ve ilaç araçlarıdır. Bu araçların SEO yüzeyi,
elde tutma etkisinden daha değerli olabilir — ikisi de hedeflenir.

**Ölçüt:** 30 günlük geri dönen ziyaretçi oranı. Reklam eşiği (D30) bu orana
bakılarak belirlenecek.

---

## 17. Sosyal Medya ve Bildirim Döngüsü

### Kanallar

Instagram ve X. İkisi birden, çünkü paylaşım üretimi ayrı bir otomasyon
sistemiyle yapılacak — kanal başına bakım maliyeti argümanı bu yüzden düşüyor.
X'te kitle daha bilinçli; Instagram'da demografi daha geniş.

Sosyal medya **edinme kanalı değil güvenilirlik yüzeyidir.** Edinme SEO, QR
sticker ve paylaşımdan gelir.

Not: en güçlü organik dağıtım kanalı hesaplar değil **paylaş butonudur.**
Türkiye'de faydalı bilgi WhatsApp aile gruplarında dolaşır; sıfır bakım
maliyetiyle çalışır.

### Döngünün yönü (KİLİT)

**İçerik her zaman kendi sitemizde barınır.** Bildirim kullanıcıyı sosyal
medyaya değil, kendi sayfamıza götürür; sosyal medya o sayfaya link verir;
sayfanın altında takip çağrısı bulunur.

Gerekçe: reklam geliri, SEO otoritesi ve oturum derinliği bizim sitemizde
yaşıyor. Kullanıcıyı platforma gönderdiğimizde o dikkati platform paraya
çevirir, biz değil. Aynı döngü, ters ok, değer bizde kalır.

### Bildirim izni

Bildirim izni tek atışlık bir kaynaktır; bir kez reddedilirse geri kazanılması
çok zordur. Bu yüzden izin **pazarlama içeriği için istenmez.**

| Kategori | Varsayılan | Örnek |
|---|---|---|
| Hizmet bildirimi | İzin bunun için istenir | Bölgende nöbetçi eczane; kurumunla anlaşmalı yeni eczane açıldı |
| İçerik bildirimi | **Kapalı** | Faydalı bilgi / mevzuat paylaşımları |

İkisi karıştırılırsa kullanıcı hepsini kapatır ve faydalı kanal da kaybedilir.

KVKK açısından push bildirimi e-posta bülteninden temizdir — kişisel veri değil
anonim cihaz jetonu tutulur, hesap sistemi kurmama kararı bozulmaz. Ancak
pazarlama amaçlı bildirimler ticari elektronik ileti kapsamına girebilir
(İYS yükümlülükleri) — teyit A4 kulvarında.

### İçerik seçim kriteri

**Kriter etkileşim değil faydadır.** Sosyal medyada etkileşim, faydayı değil
öfkeyi ve tuhaflığı seçer. "En çok etkileşim alanı otomatik bildirime çevir"
kuralı, bir güven ürününü içerik çiftliğine dönüştürmenin en kısa yoludur.

**Sağlıkla ilgili hiçbir içerik insan onayından geçmeden yayınlanmaz.**
Yanlış bir ilaç bilgisinin otomatik paylaşılması geri alınamaz.

### İçerik damarı

En güçlü damar mevzuat ve hak bilgisi: insanlar poliçelerinin neyi kapsadığını,
eczanede hangi haklara sahip olduklarını bilmiyor. Ciddi şekilde eksik arz
edilen, çok paylaşılan, konumlanmamıza tam oturan bir alan.

Madde 16'daki kural burada da geçerli: her mevzuat konusu makale değil,
**kontrol edilebilir bir sayfa veya küçük bir araç** olarak üretilir.
Editoryal politika aynen uygulanır.

### Zamanlama

Sosyal medya tanıtımdır; D31 gereği tanıtımlı açılışta başlar. Kullanıcı adları
2026-08-14'te alındı (D46) — hesaplar boş duruyor, isim elimizde.
