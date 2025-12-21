export const landingSchema = [
    {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "PromptNinja",
        "operatingSystem": "Web, iOS, Android",
        "applicationCategory": "ProductivityApplication",
        "description": "Teleprompter online e gratuito com controle remoto (P2P) para gravações sem falhas.",
        "image": "https://promptninja.solutionkit.com.br/og-image.png",
        "screenshot": "https://promptninja.solutionkit.com.br/assets/screenshot.webp",
        "offers": [
            {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "BRL",
                "name": "Plano Gratuito",
                "availability": "https://schema.org/InStock",
                "url": "https://promptninja.solutionkit.com.br"
            },
            {
                "@type": "Offer",
                "price": "67",
                "priceCurrency": "BRL",
                "name": "Plano Lifetime PRO"
            }
        ],
        "author": {
            "@type": "Organization",
            "name": "PromptNinja",
            "url": "https://promptninja.solutionkit.com.br"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "1024"
        },
        "review": [
            {
                "@type": "Review",
                "author": {
                    "@type": "Person",
                    "name": "João Silva"
                },
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5"
                },
                "reviewBody": "Melhor teleprompter que já usei! Simples e direto ao ponto."
            },
            {
                "@type": "Review",
                "author": {
                    "@type": "Person",
                    "name": "Maria Gonzalez"
                },
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5"
                },
                "reviewBody": "Increíble herramienta. Me ayuda muchísimo con mis videos de YouTube."
            },
            {
                "@type": "Review",
                "author": {
                    "@type": "Person",
                    "name": "Sarah Jenkins"
                },
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5"
                },
                "reviewBody": "Finally a free teleprompter that doesn't track me or require login. The voice control is a game changer!"
            },
            {
                "@type": "Review",
                "author": {
                    "@type": "Person",
                    "name": "Carlos Mendes"
                },
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "4.8"
                },
                "reviewBody": "Uso para minhas aulas online. Funciona perfeitamente offline, o que é ótimo quando a internet cai."
            }
        ]
    },
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "PromptNinja",
        "url": "https://promptninja.solutionkit.com.br",
        "logo": "https://promptninja.solutionkit.com.br/assets/web-app-manifest-512x512.png",
        "sameAs": [
            "https://promptninja.solutionkit.com.br"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer support",
            "url": "https://promptninja.solutionkit.com.br"
        }
    },
    {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "Como usar teleprompter no celular em 2 segundos",
        "description": "Aprenda a controlar seu teleprompter pelo celular em apenas 3 passos simples.",
        "image": "https://promptninja.solutionkit.com.br/assets/how-to-teleprompter.webp",
        "estimatedCost": {
            "@type": "MonetaryAmount",
            "currency": "BRL",
            "value": "0"
        },
        "supply": [
            {
                "@type": "HowToSupply",
                "name": "Computador ou laptop"
            },
            {
                "@type": "HowToSupply",
                "name": "Celular smartphone"
            }
        ],
        "tool": [
            {
                "@type": "HowToTool",
                "name": "PromptNinja Teleprompter"
            }
        ],
        "step": [
            {
                "@type": "HowToStep",
                "name": "Acesse no computador",
                "text": "Abra o PromptNinja no seu computador (Chrome, Edge ou Safari)",
                "image": "https://promptninja.solutionkit.com.br/assets/step1.png",
                "url": "https://promptninja.solutionkit.com.br"
            },
            {
                "@type": "HowToStep",
                "name": "Escaneie o QR Code",
                "text": "Com seu celular, escaneie o QR code que aparece na tela",
                "image": "https://promptninja.solutionkit.com.br/assets/step2.jpg"
            },
            {
                "@type": "HowToStep",
                "name": "Controle pelo celular",
                "text": "Pronto! Agora você controla velocidade, tamanho e texto direto do celular.",
                "image": "https://promptninja.solutionkit.com.br/assets/step3.jpg"
            }
        ],
        "totalTime": "PT2M"
    }
];
