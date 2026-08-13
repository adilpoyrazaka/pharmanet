# Karar Kaydı

> Her karar: ne, neden, kim verdi. Gerekçesi kaybolan karar ilk zorlukta yeniden açılır.
> Bir karar değiştiğinde gövdesi yerinde güncellenir ve tek akış halinde kalır;
> eski hali git geçmişindedir. Yeni karar sıradaki numarayı alır ve konu
> bölümünün sonuna eklenir — numaralar bölüm içinde artar, bölümler arasında
> artmaz.

Durum kodları: **KİLİT** = yeniden tartışılmaz · **AÇIK** = veri bekliyor

---

## Teknoloji

**D1 — Streamlit reddedildi, Next.js (App Router + TS).** KİLİT
Streamlit sunucu tarafı render etmediği için programatik SEO sayfaları üretemez.
SEO burada pazarlama değil mimari zorunluluk — büyüme motorlarından biri o.
*Poi başlattı, gerekçe Opus.*

**D2 — PostgreSQL + PostGIS.** KİLİT
"Şu kuruma bağlı, bana en yakın N eczane" sorgusu doğrudan PostGIS işi.
Ayrı arama motoru gerekmez, `pg_trgm` yeterli. *Opus.*

**D3 — v1'de harita yüzeyi yok; konum derin bağlantıyla harita uygulamasına devredilir.** KİLİT
Sonuç listesi ad, adres, mesafe ve doğrulama rozeti taşır. "Yol tarifi"
Google / Apple / Yandex'e derin bağlantıdır (§13); ürünün içinde taban harita
çizilmez.

Gerekçe: kullanıcı gömülü haritada zaten "büyük haritada aç"a basıp navigasyona
geçiyor — o adımı atlamak tile maliyetini, harita bileşenini ve mobil ağırlığı
birlikte sıfırlar. Yaşlı kitlede tanıdık bir uygulamaya çıkmak, gömülü haritada
zoom ile uğraşmaktan iyidir (§3 erişilebilirlik ilkesi). Places içeriğinin
Google olmayan bir harita üzerinde gösterilmesi sorunu da ortadan kalkar.

**Bağlayıcı şart:** derin bağlantı tek sağlayıcıya kilitlenmez; üçü de sunulur,
platforma göre sıralanır.

Bir harita yüzeyi gerçekten gerekirse (Faz 2+, örneğin kapsama görselleştirmesi)
seçim MapLibre + vektör tile'dır — Google Maps JS değil: ölçekte maliyet, tam
stil kontrolü, satıcı bağımsızlığı. O gün gelene kadar yazılmaz.
*İlk hali Opus; harita yüzeyinin düşürülmesi Poi.*

**D4 — Model API'leri okuma yolunda ÇALIŞMAZ.** KİLİT
Kullanıcı sorgusu saf PostGIS: deterministik, milisaniyelik, maliyetsiz.
Model yalnızca alım zamanında, çevrimdışı, denetlenebilir çıktıyla çalışır.
Sağlık ürününde "kullanıcıya uydurma eczane gösterme" riski sıfırlanmalı. *Opus.*

**D5 — Çok modelli çapraz doğrulama üretimde kullanılacak.** KİLİT
Kritik çıkarım iki farklı sağlayıcıyla yapılır; ayrışırlarsa insan kuyruğuna düşer.
Poi'nin "API'leri birbirine bağlayalım" sezgisinin doğru katmanı bu — asistanlar
arası sohbet değil, üretimde doğrulama. *Poi sordu, Opus konumlandırdı.*

**D6 — Claude Code'un modeli Fable.** KİLİT *Poi.*

**D41 — Yakınlık sıralaması sunucuda; koordinat iletilir, saklanmaz.** KİLİT
"Bana en yakın N eczane" sorgusu PostGIS'te çalışır. Kullanıcının koordinatı
isteğin gövdesinde sunucuya iletilir; veritabanına yazılmaz, log'a düşmez,
analitiğe gönderilmez.

Gerekçe: sıralamayı yapan taraf konumu bilmek zorundadır — bu kaçınılabilir bir
şey değil. İstemcide sıralama mümkündü (ilçe kapsamlı aday kümesi + tarayıcıda
haversine) ama sonuç kalitesini ilçe sınırlarında düşürüyor ve D19'un altını
çizdiği gerçeği geri getiriyordu: ilçe bu projenin doğal birimi değil.

**Bağlayıcı şartlar.**
1. Koordinat **asla** URL'de veya query string'de taşınmaz — yalnızca istek
   gövdesi. Aksi halde erişim log'u, referrer başlığı ve CDN kaydı olmak üzere
   üç ayrı yerde saklanmış olur ve "saklamıyoruz" cümlesi yanlış beyana döner.
2. Konum izni reddi birinci sınıf akıştır, hata değil: ilçe seçimiyle aynı liste
   mesafesiz döner (§13).
3. Kullanıcıya verilen söz **"konumunuz sunucuya gitmez" değildir.** Sunucu ilçe
   seçiminden ve IP'den kabaca nerede olunduğunu zaten bilir. İddianın kapsamı
   hassas koordinatla sınırlıdır: "yalnızca sıralama için kullanılır, saklanmaz
   ve kaydedilmez."

D4 açılmıyor: okuma yolunda model çalışmaz kuralı aynen geçerli.
*Poi karar verdi, şartlar Opus.*

---

## Veri

**D7 — Temel varlık `institution`, ayrım `institution_type` ile.** KİLİT
Sahada anlaşma yalnızca özel sigortayla değil; banka sandıkları ve diğer kurum
sağlık planları da aynı soruyu üretiyor. Bugün maliyetsiz, sonra göç demek.
Arayüz terimi "kurum", şema terimi `institution`.
*Poi'nin "şirketler, bankalar, kurumlar" ifadesinden yakalandı.*

**D8 — Her kayıt `verification_method` + `verified_at` taşır, `confidence` bundan türer.** KİLİT
Kanonik enum, beş değer: `chamber` · `field` · `phone` · `self_claimed` ·
`scraped`. `field` K2 saha turunun çıktısıdır ve atlanamaz. Alan adları
`verified_at` ve `verification_method`'tır; `confidence` bağımsız yazılmaz,
`verification_method`'tan türer. D17'ün tazelik eşiği `verified_at` üzerinden
hesaplanır. Arayüz en güçlü doğrulamayı gösterir.
*Opus, Poi onayladı; enum ve alan adları Poi'nin taramasında kesinleşti.*

**D9 — Çelişki kuralı: eczane beyanı kazanır.** KİLİT
Kurumun listesi "evet", eczane "hayır" diyorsa eczane kazanır — müşteriyi geri
çevirecek olan o. İki kayıt da saklanır, çelişki işaretlenir. *Opus.*

**D10 — Çelişki veri seti stratejik varlıktır.** KİLİT
"Yayınladığınız listenin şu kadarı hatalı, doğrusu bizde" — kaldıraç kapısında
masaya konacak en güçlü koz. Kendiliğinden birikir. *Opus.*

**D11 — Veri toplama sırası: K1 oda portalı → K2 saha (5 bölge/183 eczane, yüz yüze,
telefon dahil) → K3 depo temsilcileri + QR sticker → K4 kalan İzmir bölgeleri
telefon turu → K5 eczacı sahiplenme akışı.** KİLİT

**D12 — Kanonik eczane kütüğü İzmir Eczacı Odası portalından.** KİLİT
Erişim mevcut. Varlık eşlemenin (6.4) en zor sorusu — referans taraf nereden gelecek —
bu erişimle kapandı. *Poi.*

**D13 — QR stant değil sticker.** KİLİT
Yer kaplamaz, izin süreci hafif, reddedilme eşiği düşük, depo temsilcisinin
çantasında taşınır. Her sticker'a ayrı takip etiketi. *Poi.*

**D14 — Ham HTML anlık görüntüsü saklanır.** KİLİT
Kaynak yapısı değiştiğinde geçmişi yeniden işleyebilmek ve "kaynakta böyleydi"
diyebilmek için. *Opus.*

**D15 — Ana tablo `facility` + `facility_type`, `pharmacy` değil.** KİLİT
Karar D7 ile aynı yöne çıkıyor ama gerekçe farklı. D7'de genişleme kesindi
(banka sandıkları pilot bölgede zaten var); burada genişleme park edilmiş bir
opsiyon (PROJECT.md §15, sağlık zinciri). Kararı belirleyen olasılık değil maliyet
asimetrisi: bugün `facility` demek bir kelime; sonradan `pharmacy`'den göç
etmek tablo adı, tüm yabancı anahtarlar, index'ler, dbt modelleri, API yolları
ve frontend tipleri demek — ve o göç tam da genişlemeye karar verdiğin, yani
en meşgul olduğun anda gelir. Sıfır maliyetli sigorta düşük olasılıklı riske
karşı da alınır.

**Bağlayıcı şart — isim geniş, davranış dar.** `facility_type` v1'de tek
değerlidir (`pharmacy`). Her sorgu, her dbt modeli ve her bileşik index
`facility_type = 'pharmacy'` koşulunu **açıkça taşır**; "sorgu katmanı tek tip
olduğunu varsayar" yeterli değildir. Gerekçe: ikinci tip tabloya girdiği gün
filtresiz sorgular sessizce yanlış tesis döndürür. Bu bir tip hatası değil veri
hatasıdır — derleyici yakalamaz, yalnızca test yakalar, test yoksa kullanıcı
yakalar. Kullanıcıya yanlış tesis göstermek güven vaadinin öldüğü noktadır
(§1), yani göçten kaçınmak için alınan sigorta tam da göçün geldiği anda
patlamış olur. *Poi karar verdi, şart Opus, Poi onayladı.*

**D16 — Kütük tüm eczanelerden oluşur; nöbet katılımı bir özniteliktir, filtre değil.** KİLİT
Nöbet tutmayan eczaneler de kütüğe girer. Kütük nöbet listesinden **türetilemez**:
nöbet verisi kolay erişilir olduğu için cazip bir kısayoldur, ama onu temel almak
nöbet tutmayan eczaneleri sistemden tamamen siler — kullanıcının önünden her gün
geçtiği gerçek eczaneleri. D23'nin nöbetçi özelliği bu kütüğün üzerine binen bir
görünümdür, kaynağı değil. *Poi.*

**D17 — Doğrulama tazelik eşiği 60 gün.** KİLİT
`verified_at` üzerinden 60 günden fazla geçmiş kayıt "doğrulanmış" rozetini
kaybeder. Kayıt silinmez, tarihiyle gösterilir. Eşik olmazsa aylar önce yüz yüze
doğrulanmış bir kayıt arayüzde bugün doğrulanmışla aynı görünür; bu, D28'nin
koruduğu güveni sessizce aşındırır. *Opus önerdi (90 gün), Poi 60'a çekti.*

**D18 — Katman başına yenileme sıklığı.** KİLİT
Tek bir "veri güncelleme" sıklığı yok; her katman kendi hızında yenilenir:
oda kütüğü **aylık** (açılış/kapanış/nakil yavaş, çekmek ucuz), kurum anlaşma
listeleri **haftalık** (en oynak katman; ürünün doğruluk vaadi buna bağlı),
nöbet verisi **günlük**, saha/telefon doğrulaması ise sıklıkla değil tazelik
eşiğiyle yönetilir (D17). *Opus önerdi, Poi onayladı.*

**D19 — R2'de coğrafi kırılım istenmez.** KİLİT
Oda bölgeleri idari sınırlarla örtüşmüyor: Hatay ve Üçyol hem Konak'a hem
Karabağlar'a yayılıyor, Mithatpaşa Caddesi birden çok ilçeden geçiyor. Hangi ilçe
kırılımı seçilirse seçilsin ya bölge dışı kayıt gelir ya bölge içi kayıt düşer.
Gerek de yok: portal her eczanenin bölge niteliğini zaten veriyor, yani coğrafya
bizim tarafta çözülü. Gemini'den istenecek olan İzmir geneli **ad + adres satırları**;
bölge ataması varlık eşlemede (§6.4) kendi kütüğümüzden gelir. *Poi'nin sınır
itirazı üzerine; ilk öneri (Balçova + Konak) çürüdü.*

**D20 — Kanonik kütük tek kaynaklıdır: oda portalı. Places zenginleştirme ve
bayrak, otorite değil.** KİLİT
Kurulum: oda portalından tek seferlik tam çekim → kanonik kütük. Süreklilik:
D18 uyarınca aylık oda çekimi; varlığın, kimliğin ve bölge niteliğinin tek
kaynağı budur. Google Places yalnızca (a) koordinat, telefon ve çalışma saati
**adayı** üretir, (b) oda kaydıyla uyuşmadığında **bayrak açar**. Hiçbir koşulda
oda kaydını ezmez ve kütüğe satır **ekleyemez**. Places'te olup odada olmayan
kayıt yeni eczane değildir; insan onay kuyruğuna düşer.
Gerekçe: varlık eşlemenin (`PROJECT.md` §6.4) referans tarafı tek olmak
zorundadır. İki kaynaklı referansta "aynı eczane mi" sorusunun cevabı kaynağa
göre değişir ve hata sessizdir. *Poi belirledi, sınır Opus.*

---

## Ürün ve tasarım

**D21 — Zanaat evet, etkileşim yeniliği hayır.** KİLİT
Kural: **tanınmadık bir ürün gibi görün, tanıdık bir ürün gibi çalış.**
Türkiye'de bu kategoride "iyi yapılmış" hissi veren ilk ürün olmak tek başına
farklılaşma; bunun için yeni etkileşim kalıbı icat etmek gerekmiyor — o, gergin
kullanıcı için maliyet. Cesaret görsel kimlikte ve sonuç kartının işlenişinde
harcanır (D3).
*Poi itiraz etti, ayrım üzerinde uzlaşıldı.*

**D22 — Tipografi Türkçe diakritik güvenli olmak zorunda.** KİLİT
ğ ş ı İ glifleri bozulan font onaylanmaz. *Opus.*

**D23 — Nöbetçi eczane özelliği yapılacak, ama ana ürün olarak değil.** KİLİT
Nöbetçi verisi metadır, farklılaşma yok. Ama gece tekrar tekrar aranan bir şey:
elde tutma motoru. Kurum filtresi farklılaştırır, nöbetçi hatırlatır. *Opus.*

**D24 — Elde tutma özellikleri Faz 1–2'de, Faz 3'te değil.** KİLİT
Kurum filtresi düşük frekanslı; trafik birikmezse ne reklam ne kaldıraç kapısı
çalışır. Poi'nin kendi listesindeki 6-7-8. maddeler bu sorunun cevabı, o yüzden
öne alındı. *Frekans tartışmasının sonucu.*

---

## İş modeli

**D25 — Gelir sıralaması: müzakere gerektirmeyenler önce.**  KİLİT
L1 reklam → L2 çapraz trafik ortaklıkları → L3 veri ürünü → L4 beyaz etiket.
*Poi'nin itirazı üzerine değiştirildi (ilk taslak şirket anlaşmalarını öne almıştı).*

**D26 — Kaldıraç Kapısı.** KİLİT
Sigorta şirketiyle ticari masaya iki koşul birden sağlanmadan oturulmaz:
(1) tekrar eden tüketici trafiği, (2) kendi kaydını doğrulamış eczane ağı.
Kazınmış veriyle masaya oturmak savunmasız pozisyondur — "o bizim verimiz,
kaldırın" denir ve koz kalmaz. Eczane doğrulaması veriyi birinci elden yapar:
hukuki açığı kapatır, kaliteyi kaynağında çözer, izin isteyen taraf olmaktan
çıkarır. *Poi'nin stratejik itirazı; planın en önemli düzeltmesi.*

**D27 — Eczane sahiplenme akışı Faz 1–2'nin ANA hedefi, yan özellik değil.** KİLİT
D26'nin doğrudan sonucu. *Poi.*

**D28 — Güven yüzeyi kuralı.** KİLİT
Eczane sonuç yüzeyi hiçbir gelir kanalına açılmaz: reklam, affiliate, sponsorlu
sıralama, e-ticaret yönlendirmesi — hiçbiri sonuç listesinin içinde, sıralamasında
veya kartlarında yer almaz. Gelir modeli değiştikçe yeniden tartışılmaz.
Tek varlığımız güven; sıralamaya para karıştığı an kaçtığımız kategoriye düşeriz.
Ayrıca eczane reklam yasağıyla doğrudan çarpışır. *Opus, Poi onayladı.*

**D29 — Reklamveren tabanında ilaç YOK.** KİLİT
Beşeri tıbbi ürünlerin halka tanıtımı mevzuatla yasak. Gerçekçi taban:
dermokozmetik, gıda takviyesi, bebek/kişisel bakım, sağlık dışı markalar.
*İlk taslakta "OTC üreticileri" yazmıştım; hatalıydı, düzeltildi.*

**D30 — Reklam etiketleri trafik eşiği aşılmadan koda girmez.** KİLİT
Faz 1'de sadece ölçüm kurulur (oturum, sayfa/oturum), reklam altyapısı değil.
Eşik sayısı madde 6 konuşulduktan sonra belirlenecek. *Opus, Poi onayladı.*

---

## Yürütme

**D31 — "Yayında ama tanıtılmıyor".** KİLİT
Site, yan özellikler bitmeden gerçek alan adında ve indekslenebilir açılır;
hiçbir kanaldan tanıtılmaz. Arama sıralaması alan adı yaşı ve tarama geçmişiyle
birikir — geç açılan site trafiği değil olgunlaşmayı kaybeder, o telafi edilemez.
İtibar riski yok çünkü kimse yönlendirilmiyor. *Poi "önce lokalde bitirelim" dedi,
ikiye ayırarak uzlaşıldı.*

**D32 — Tanıtımlı açılış bölge bölge yapılır.** KİLİT
Kapsam "5 ilçe × tüm kurumlar" değil: bir oda bölgesi %80 doğrulama kapısını
geçtiğinde (D43) o bölge tanıtıma açılır. Reklam ve il geneline yayılma bunun
arkasındadır. *Poi.*

**D33 — Genişleme kapısı takvim değil veri kalitesi.** KİLİT
Coğrafi hız kopyalanmaya karşı korumaz; savunma doğrulanmış eczane ağı, veri
tazeliği ve güven. Pipeline sağlamsa üç şehir zaten bir hafta sürer; Pipeline sağlamsa yeni bölge çekmek zaten bir haftalık iştir; sağlam
değilken açılmak tek varlığımızı yakar. *Opus, Poi kabul etti.*

**D34 — Devir teslim dosyayla, sohbetle değil.** KİLİT
Spec dosyasında olmayan şey kodda olmaz. Dosya sahiplikleri PROJECT.md §10.

**D35 — `G` etiketi emekliye ayrıldı; araştırma görevleri `R` ile numaralanır.** KİLİT
`G` alanı kapatılır, yerine yeni etiket konmaz. Gemini araştırma görevleri
`R1…R7` olarak numaralanır; `STATE.md` ve brief `R` kullanır.

Gerekçe: `G` kendi başına iş yapmıyordu. `PROJECT.md` §2'de kalan iki gerçek
zaten başka kulvarlarda kayıtlı — mevzuat sorusu **A4.1**, pazar boyutlandırması
bir **R** görevidir; `G` bu iki kayda takma addı. Bakım maliyeti ise gerçekti:
aynı harfin iki numaralandırmada kullanılması bir yanlış brief üretti, ardından
kapsama oranı çıkarılınca G'ler kaydırıldı ve A4.1'in `G3` atfı ölü referansa
döndü. İki kayıt için üçüncü bir etiket alanı tutulmaz.

§2 tablosu kalır; satırları etiketsizdir ve sahibiyle adreslenir.
*Opus yakaladı, Poi karar verdi.*

**D36 — Yayınlanmış kapsama oranı üst sınırdır ve ürün şeklini belirlemez.** KİLİT
R2 sayısı kurumların *yayınlanmış* listelerinden türetilir. Hata yönü tahmin
edilebilir: kurumlar biten anlaşmayı geç siler, olmayan eczaneyi eklemez — yani
yayınlanmış oran üst sınırdır, gerçek ondan düşük olabilir, yüksek olamaz.
İlk sürümde bu sayıyı A1'in (ana ekran) kapısı yapmıştım; yanlıştı. Üç sebeple:
(1) o listeye zaten güvenmiyoruz — D8, D9, D14'ün tamamı bu güvensizlik üzerine
kurulu, dolayısıyla ondan çıkan oranı ürün kararına dayanak yapmak kendi karar
mimarimizle çelişir; (2) oran ne olursa olsun kullanıcının işi değişmiyor —
"konumuma yakın, planımı kabul eden eczane"; (3) gerçek oranı K2 saha turu
zaten tek geçerli çözünürlükte üretecek, tahmini beklemek D31'in maliyetidir.
R2 yalnızca **ölçekleme** için kullanılır: kaç kurum var, hangisinden başlanmalı,
kaynak yapısı nasıl. D38 bu kararı bir adım öteye taşımıştır: oran ürün
şeklini belirlemediği gibi projeden tamamen çıkarılmıştır; buradaki ölçekleme
kullanımı geçerliliğini korur. *Poi çürüttü, Opus kabul etti.*

**D37 — Araştırma brief'ine strateji yazılmaz.** KİLİT
Tur 1 brief'inin G-2 bölümünde "oran düşükse ürün filtre, yüksekse doğrulama aracı"
yazıyordu. Bu, modele hangi sayının hangi sonucu doğuracağını söylüyor ve boş hücre
bırakmayı zorlaştırıyor — ORCHESTRATION §3'ün "Gemini'ye strateji verilmez"
kuralının ihlali. Ayrıca payda (ilçedeki toplam eczane sayısı) Gemini'den
istenmemeli; kanonik kütük oda portalıdır (D12). Üçüncü kusur: brief coğrafi
birim olarak **ilçe** kullanıyor, oysa projenin birimi 5 bölge / 183 eczanedir
(D11) — dönen tablo saha turunun birimine çevrilemez.
*Opus yakaladı, Poi onayladı; birim kusurunu Poi buldu.*

**D38 — Kapsama oranı projeden çıkarıldı; veri tezi kriteri Faz 1'e taşındı.** KİLİT

**Vaat.** Doğruluk hedefi %100'dür ama bu bir eşik
değil bir kuraldır — eşik olarak yazılırsa ilk ölçümde tetiklenir ve görmezden
gelinir; görmezden gelinen kriter yok hükmündedir. Kural: doğrulanmamış kayıt
doğrulanmış gibi gösterilmez. `scraped` tek başına "anlaşmalı" ifadesini
taşıyamaz. Kazıma yayın kaynağı değil, sahanın nereye bakacağını daraltan
arama alanıdır. Bu, Faz 1'in kapsamını bilerek daraltır: yayına giren
"anlaşmalı" kayıtlar K2'de doğrulanmış olanlardır.

**Faz 1 öldürme kriteri 2 — ölçülen şey doğruluk değil maliyet.** Kazınmış
`kurum × eczane` çiftlerinin precision'ı **%50'nin altındaysa** kazıma arama
alanını daraltmıyor demektir; her kayıt ayakla toplanır ve Faz 2'nin üç şehir
hedefi düşer. Recall kritere girmez: eksik eczane göstermek küçük hata, olmayan
anlaşmayı göstermek güven vaadinin ölümüdür.
*Poi çürüttü (oran anlamsız), Opus kabul etti; yerine geçen kriter ve vaat
kuralı Opus, eşik Poi.*

**D39 — Gemini çıktısının tek adlandırması: `research/R<n>.md`.** KİLİT
Üç dosyada üç ad vardı: `data-sources.md` (`PROJECT.md` §10), `research/*.md`
(ORCHESTRATION §2), `research/R1-....md` (STATE). Görev numarası zaten etiket
olduğu için slug eklenmez — `research/R1.md` … `research/R7.md`. Sonraki turlar
aynı dosyaya tarihli başlıkla **eklenir**, yeni dosya açılmaz; bir görevin tüm
turları yan yana okunur. `data-sources.md` adı bırakıldı. *Poi.*

**D40 — Karar kaydının bakım kuralı: yerinde güncelleme, bölüm içi artan numara.** KİLİT
Önceki kural "satır silinmez, yenisi eklenir" idi ve iki sorun üretti: her
değişiklik bir ek not doğurduğu için kararlar parçalanıp okunmaz hale geldi,
ve numaralar bölümler arasında karıştı. Yeni kural: karar değiştiğinde gövdesi
yerinde güncellenir, ek not açılmaz; kaydın geçmişi dosyada değil git'te tutulur,
çünkü orada tarih, yazar ve fark zaten var. Yeni karar sıradaki numarayı alır ve
konu bölümünün sonuna girer; numaraların bölümler arasında artması beklenmez —
o beklenti her yeni kararda toplu renumaralama gerektirirdi ve renumaralama eski
oturumlardaki atıfları geçersiz kılar. *Poi renumaralamayı istedi, kuralın
sürdürülebilir hali Opus.*

**D42 — Faz 3'ün ölçütü kurumsal gelir değil, ticarileşebilirlik sinyalidir.** KİLİT
Faz 3 bir ortaklık ve reklam fazıdır: muhatabı L1 reklamverenleri ve L2 çapraz
trafik tarafıdır (§15 tablosu). Sigorta şirketiyle ticari masa L3/L4'tür; Faz 4'te
ve D26 kaldıraç kapısının arkasında kalır.

Düzeltilen hata: faz planı Faz 3'e "L1/L2 için sigorta şirketleriyle görüşmeler"
yazıyordu — yanlış muhatap, çünkü L1'i dermokozmetik markaları, L2'yi dizin
siteleri öder — ve öldürme kriterini "ücretli kurumsal pilot"a bağlıyordu. Kriter,
aynı planın Faz 3'te yapılmasını yasakladığı işi ölçüyordu: kaçınılmaz olarak
tetiklenecek, ilk ölçümde görmezden gelinecek, ve görmezden gelinen kriter yok
hükmünde olacaktı. D38'in kapsama oranında yakaladığı hatanın aynısı.

Yeni kriter duruma bağlıdır, sayıya değil: 6 ay sonunda ne L1 trafik eşiği aşılmış
ne de L2'den tek bir imzalı çapraz trafik anlaşması çıkmışsa proje trafik/portföy
varlığına sınıflanır. A2 açıkken bile "eşik aşılamadı" ölçülebilir bir durumdur.

Kapının Faz 4'te kalma gerekçesi takvim değil pozisyon: D26'nın ikinci koşulu
birikimli bir varlıktır. K5 sahiplenme akışı Faz 2'de başlar ama ağ zamanla oluşur;
D10'un çelişki veri seti de K1–K4 çalıştıkça büyür. Kapıyı erken açmak, kapının
koruduğu kozu zayıflatır. Kapı kontrolü Faz 3'ün sonunda yapılır.
*Opus yakaladı, Poi onayladı.*

**D43 — Yürütme birimi oda bölgesidir; tanıtım kapısı bölge bazlı %80 doğrulamadır.** KİLİT
Genişleme, doğrulama ve tanıtım **bölge** birimiyle yürür. İlçe yalnızca yayın
birimidir: programatik SEO URL'leri `kurum × il × ilçe` kalır, çünkü kullanıcı
"Karşıyaka" diye arar, "Üçyol bölgesi" diye değil. İkisi karıştırılmaz —
**ilçe yayın birimi, bölge yürütme birimi.**

Gerekçe: bölge niteliğini oda portalı zaten veriyor (D19), yani kütükte bedava.
İlçe ise adres ayrıştırmadan türetilir ve sınırda hata verir; D19 zaten ikisinin
birbirine çevrilemediğini kilitlemişti. Plan bugüne kadar Faz 1'i bölgeyle,
tanıtımlı açılışı ilçeyle tanımlıyordu — "K2 bitti, açılışa hazır mıyız" sorusu
hesaplanamaz haldeydi. Depo temsilcisi ağının çalışma birimi de idari ilçe değil
güzergâhtır; bölge ona daha yakın.

**Sıra.** 5 pilot bölge lokalde doğrulanır (kurum eşleştirme mantığının çalıştığı
burada görülür) → tüm İzmir kütüğü sisteme çekilir ve D31 uyarınca sessiz yayına
girer → K4 telefon turu bölge bölge doğrular → bir bölge kapıyı geçtiğinde o
bölge tanıtıma açılır.

**D31 ile uzlaşma.** "Önce lokalde bitir" ile "erken yayınla" çelişmiyor, çünkü
D31'in derdi ürün olgunluğu değil alan adının yaşı ve tarama geçmişi. Alan adı
bugün alınır, saat orada başlar. Kanonik kütük ilk günden tüm İzmir'i kapsar ve
eczane sayfaları kurum eşleşmesi olmadan da indekslenebilir. Lokalde tutulan tek
şey doğrulanmamış kurum filtresidir — o zaten yayınlanmıyor (D38).

**Tanıtım kapısı: bölgedeki eczanelerin %80'i `phone` veya `field` ile
doğrulanmış olmalı.** Ölçü birimi eczanedir, `kurum × eczane` çifti değil: tek
telefon görüşmesi o eczanenin kurum listesinin tamamını doğrular, çift üzerinden
saymak aynı işi kurum sayısıyla çarpar. Payda K1 dışa aktarımından gelir.

Eşik neden İzmir geneli değil bölge bazlı: D17 rozeti 60 günde düşürüyor. Tek bir
il geneli eşik konsaydı, tur 60 günü aştığı anda ilk aranan bölgeler sen bitirmeden
rozeti kaybederdi ve oran hiç %80'e ulaşmazdı — kovalanan hedef. Bölge bazlı
eşikte 60 günlük saat bölge başına işler, tanıtım daha erken başlar ve ilk bölgede
öğrenilen sonrakine girer.

**Borç kuralı:** açılmış bir bölge %80'in altına düşerse tanıtımı durdurulmaz,
ama **yeni bölge açılmaz.** Aksi halde doğrulama borcu birikir ve hiçbir bölge
taze kalmaz.

Kabul edilen maliyet: kapsama haritası bir süre delikli olur. Açılmamış bölgedeki
kullanıcı sonuç görür ama çoğu "doğrulanmadı" yüzeyinde kalır. Alternatifi
D38'in vaadini çiğneyerek tüm İzmir'i tanıtmaktı.
*Poi karar verdi (birim, sıra, %80); bölge bazlı eşik ve borç kuralı Opus.*
---

## Açık — karara bağlanmadı

**A1 — KAPANDI (2026-08-13).** Kapsama oranı önce blokaj olmaktan çıkarıldı,
sonra D38 ile ölçüm olarak da projeden çıkarıldı: oran ne çıkarsa çıksın
kullanıcının sorusu aynı. Yerine geçen ölçüm precision'dır ve amacı ürün kararı
değil ölçeklenebilirlik. D10 ve D26'nin çelişki kozu bundan etkilenmez — o koz
orandan değil çelişki kayıtlarından doğar. *Poi çürüttü, Opus kabul etti.*

**A2 — Reklam eşiği sayısı.** Madde 6 (elde tutma) konuşulduktan sonra.

**A3 — KAPANDI (2026-08-12).** Poi'nin 8 maddelik listesi madde madde işlendi;
çıktısı `PROJECT.md` §13–17. İşlenmemiş madde kalmadı.

**A4 — Mevzuat teyitleri (üç ayrı soru, üçü de Poi'de).**
Her birinin neyi bloke ettiği yazılır; cevap "hayır" gelirse ne düşeceği belli olsun.
- **A4.1** Eczane reklam yasağının "bilgilendirme" sınırı. → Bloke ettiği:
  §5 L1 reklam katmanı ve L5 eczane tarafı gelir. `PROJECT.md` §2'nin mevzuat
  satırı budur; ayrı etiketi yoktur (D35).
- **A4.2** Sağlık hizmeti sunumunda fiyat/indirim tanıtımı sınırı. → Bloke ettiği:
  §15 fiyat şeffaflığı katmanı.
- **A4.3** İYS / ticari elektronik ileti kapsamı: push bildirimi kapsama giriyor mu.
  → Bloke ettiği: §17 içerik bildirimi kategorisi (hizmet bildirimi ayrı).

**A5 — KAPANDI (2026-08-12).** Ana tablo adlandırması D15 ile karara bağlandı.
