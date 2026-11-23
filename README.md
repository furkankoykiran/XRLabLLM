# 🧠 Yapay Zeka Kullanımı ve Entegrasyonu

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/furkankoykiran/XRLabLLM/actions/workflows/ci.yml/badge.svg)](https://github.com/furkankoykiran/XRLabLLM/actions/workflows/ci.yml)

> LLM odaklı yaklaşım: prompt, araç seçimi, otomasyon ve üretken görseller.

**Sunum: [furkankoykiran.com.tr/XRLabLLM](https://furkankoykiran.com.tr/XRLabLLM/)**

## 📖 Hakkında

Manisa Celal Bayar Üniversitesi MCBU XRLab için hazırlanmış 16 slaytlık Türkçe eğitim sunumu. Büyük dil
modellerini (LLM) tanıtır, günlük iş akışına nasıl yerleştirileceğini gösterir ve iki
interaktif alıştırmayla prompt yazımını pratiğe döker.

## 🎯 İçerik

- LLM nedir, ne yapabilir ve ne yapamaz
- Model türleri; ücretsiz ve ücretli modeller
- Prompt nedir, iyi prompt nasıl yazılır
- İyi–kötü prompt karşılaştırması
- İnteraktif uygulamalar: model tahmini ve prompt düzenleme
- Hugging Face, VSCode + GitHub Copilot, RooCode + MCP
- n8n ile kodsuz otomasyon ve Telegram botu
- Kapanış ve kaynaklar

## ⌨️ Kullanım

- **İleri / geri:** ok tuşları veya ekrandaki düğmeler
- **Slayta git:** alttaki ilerleme göstergesine tıkla
- Sunum tek bir HTML dosyasıdır; stiller ve görseller yerelden yüklenir.

## 🚀 Geliştirme

Tailwind CSS önceden derlenmiş olarak depoda tutulur; GitHub Pages build adımı çalıştırmaz.

```bash
npm ci
npm run build     # src/input.css -> css/tailwind.css
npm run verify    # meta, JSON-LD, keşif dosyaları ve yerel varlıkları doğrular
```

Yerelde açmak için:

```bash
npx serve .
# veya doğrudan index.html dosyasını tarayıcıda aç
```

`index.html` içinde sınıf adı değiştirdiyseniz `npm run build` çalıştırıp
`css/tailwind.css` dosyasını da commit edin; CI eski CSS'i yakalar.

## 🗂️ Yapı

```text
index.html                 # 16 slayt, stiller ve slayt gezinme betiği
src/input.css              # Tailwind giriş dosyası
css/tailwind.css           # derlenmiş ve küçültülmüş stiller
images/                    # slayt görselleri ve favicon
scripts/verify-site.mjs    # yayın öncesi doğrulama
robots.txt, sitemap.xml    # arama motorları
llms.txt, ai.txt           # yapay zeka sistemleri için özet ve izinler
.well-known/security.txt   # güvenlik iletişimi
```

## 🔍 SEO, AI keşfi ve erişilebilirlik

- Türkçe doküman dili, açıklayıcı başlık ve açıklama, kanonik adres, Open Graph/Twitter kartları ve 1200×630 `og-image.png`.
- `LearningResource` + `PresentationDigitalDocument` JSON-LD (yazarlar, yayıncı, lisans, öğretilen konular).
- `robots.txt`, `sitemap.xml`, `llms.txt`, `ai.txt`, `.well-known/security.txt` ve `.nojekyll`.
- Tailwind CDN yerine yerel derleme: sayfa artık çalışma anında CSS üretmiyor.
- Görsellerde `loading="lazy"`, yeni sekmede açılan bağlantılarda `rel="noopener"`.
- `node scripts/verify-site.mjs` başlık, açıklama, JSON-LD, keşif dosyaları, yerel varlıklar ve derlenmiş CSS'i doğrular; CI her PR'da çalıştırır.

`robots.txt` yalnızca alan adı kökünde geçerlidir. `furkankoykiran.com.tr/XRLabLLM/`
altında portfolyonun kök `robots.txt` dosyası geçerlidir; buradaki dosya depoyu tek
başına yayınlanabilir tutmak içindir.

## 👥 Ekip

- Furkan Köykıran — [furkankoykiran.com.tr](https://furkankoykiran.com.tr)
- Oğuz Bolaca
- MCBU XRLab, Manisa Celal Bayar Üniversitesi — [xrlab.mcbu.edu.tr](https://xrlab.mcbu.edu.tr/)

## 📜 Lisans

MIT — ayrıntılar için [LICENSE](LICENSE) dosyasına bakın.
