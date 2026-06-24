import { StoreProvider } from '@/components/store-provider'
import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { MusicSection } from '@/components/music-section'
import { StorySection } from '@/components/story-section'
import { MerchSection } from '@/components/merch-section'
import { VisualsSection } from '@/components/visuals-section'
import { FaqSection } from '@/components/faq-section'
import { MovementSection } from '@/components/movement-section'
import { SiteFooter } from '@/components/site-footer'
import { CartSidebar } from '@/components/cart-sidebar'
import { MiniPlayer } from '@/components/mini-player'

const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MusicGroup",
      "@id": "http://localhost:3000/#artist",
      "name": "YungSavage QTN",
      "alternateName": "Siyamkela Kemka",
      "genre": ["South African Hip-Hop", "Kasi Rap"],
      "homeLocation": {
        "@type": "Place",
        "name": "Queenstown, Eastern Cape, South Africa"
      },
      "image": "http://localhost:3000/images/artist-street.jpg",
      "description": "Born Siyamkela Kemka in Queenstown, Eastern Cape, YungSavage QTN is a South African hip-hop artist delivering township reality and Royal Kasi Stories."
    },
    {
      "@type": "MusicAlbum",
      "@id": "http://localhost:3000/#album",
      "name": "INVASION",
      "byArtist": {
        "@type": "MusicGroup",
        "@id": "http://localhost:3000/#artist"
      },
      "dateReleased": "2026-06-20",
      "numTracks": 13,
      "image": "http://localhost:3000/images/invasion-cover-front.jpg",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "ZAR",
        "lowPrice": "25",
        "highPrice": "450",
        "offerCount": "17"
      },
      "track": [
        {
          "@type": "MusicRecording",
          "name": "They_Know",
          "position": 1,
          "offers": {
            "@type": "Offer",
            "price": "30",
            "priceCurrency": "ZAR"
          }
        },
        {
          "@type": "MusicRecording",
          "name": "Spirit Up",
          "position": 2,
          "offers": {
            "@type": "Offer",
            "price": "30",
            "priceCurrency": "ZAR"
          }
        },
        {
          "@type": "MusicRecording",
          "name": "Far",
          "position": 3,
          "offers": {
            "@type": "Offer",
            "price": "30",
            "priceCurrency": "ZAR"
          }
        },
        {
          "@type": "MusicRecording",
          "name": "Intaba",
          "position": 4,
          "offers": {
            "@type": "Offer",
            "price": "30",
            "priceCurrency": "ZAR"
          }
        },
        {
          "@type": "MusicRecording",
          "name": "Emazweni",
          "position": 5,
          "offers": {
            "@type": "Offer",
            "price": "30",
            "priceCurrency": "ZAR"
          }
        },
        {
          "@type": "MusicRecording",
          "name": "Oko",
          "position": 6,
          "offers": {
            "@type": "Offer",
            "price": "30",
            "priceCurrency": "ZAR"
          }
        },
        {
          "@type": "MusicRecording",
          "name": "Dont Worry",
          "position": 7,
          "offers": {
            "@type": "Offer",
            "price": "25",
            "priceCurrency": "ZAR"
          }
        },
        {
          "@type": "MusicRecording",
          "name": "Self Lxfe",
          "position": 8,
          "offers": {
            "@type": "Offer",
            "price": "25",
            "priceCurrency": "ZAR"
          }
        },
        {
          "@type": "MusicRecording",
          "name": "Siyababona",
          "position": 9,
          "offers": {
            "@type": "Offer",
            "price": "35",
            "priceCurrency": "ZAR"
          }
        },
        {
          "@type": "MusicRecording",
          "name": "eKasi",
          "position": 10,
          "offers": {
            "@type": "Offer",
            "price": "35",
            "priceCurrency": "ZAR"
          }
        },
        {
          "@type": "MusicRecording",
          "name": "Song To Remember",
          "position": 11,
          "offers": {
            "@type": "Offer",
            "price": "35",
            "priceCurrency": "ZAR"
          }
        },
        {
          "@type": "MusicRecording",
          "name": "For The Streets",
          "position": 12,
          "offers": {
            "@type": "Offer",
            "price": "30",
            "priceCurrency": "ZAR"
          }
        },
        {
          "@type": "MusicRecording",
          "name": "Put In Work",
          "position": 13,
          "offers": {
            "@type": "Offer",
            "price": "30",
            "priceCurrency": "ZAR"
          }
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who is YungSavage QTN?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "YungSavage QTN, born Siyamkela Kemka, is a South African hip-hop artist from Queenstown, Eastern Cape. Deeply grounded in Xhosa culture, faith, and authentic township life, his music represents a new wave of Kasi Rap under the QTN Records label."
          }
        },
        {
          "@type": "Question",
          "name": "What is the new album \"INVASION\"?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "INVASION is the latest full-length digital album from YungSavage QTN, released on June 20, 2026. The project contains 13 tracks, delivering a blend of hard-hitting beats, Xhosa pride, and cinematic storytelling."
          }
        },
        {
          "@type": "Question",
          "name": "How can I stream or download the music?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can play preview clips of any track directly on this website. High-quality digital audio downloads (in 320kbps MP3 format) are available via secure checkout powered by Yoco. You can purchase the full digital album for R140, or purchase individual singles starting from R25 to R35 each."
          }
        },
        {
          "@type": "Question",
          "name": "What is included in the Royal Kasi Deluxe Bundle?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Royal Kasi Deluxe Bundle (priced at R450) is the ultimate package for supporters. It includes immediate download of the full 13-track digital album, a limited-edition physical INVASION Tee (unisex, heavyweight black cotton with gold & red print), and a signed digital art card."
          }
        },
        {
          "@type": "Question",
          "name": "Is my payment secure?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, all transactions are processed securely through Yoco, a leading South African payment gateway. We accept card payments, instant EFTs, and Apple Pay. Once your payment succeeds, you will be redirected to a success page to immediately download your digital music."
          }
        }
      ]
    }
  ]
}

export default function Page() {
  return (
    <StoreProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <SiteNav />
      <main>
        <Hero />
        <MusicSection />
        <StorySection />
        <MerchSection />
        <VisualsSection />
        <FaqSection />
        <MovementSection />
      </main>
      <SiteFooter />
      <CartSidebar />
      <MiniPlayer />
    </StoreProvider>
  )
}
