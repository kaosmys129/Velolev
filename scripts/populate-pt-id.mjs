import fs from "node:fs";

const localesPath = "maquin-astro-theme/src/data/published-content-locales.json";
const localesData = JSON.parse(fs.readFileSync(localesPath, "utf8"));

// PT Batch A & C (8 articles: 2, 3, 4, 5, 10, 11, 12, 13)
const ptArticles = {
  "m24-anchor-bolts-180-260mm-flange-compatibility": {
    locale: "pt",
    slug: "m24-anchor-bolts-180-260mm-flange-compatibility",
    title: "Compatibilidade de chumbadores M24 e flange de 180–260 mm em elevador portátil | velolev",
    h1: "Compatibilidade de chumbadores M24 e vão de furos de flange de 180–260 mm no elevador portátil de postes",
    description: "Guia de compatibilidade técnica para chumbadores M24, furação de flange de 180–260 mm, parafusos padrão M16–M22 incluídos e regras de análise para bases especiais.",
    imageFolder: "/images/guides/m24-anchor-bolts-180-260mm-flange-compatibility",
    sections: [
      {
        heading: "Resposta direta sobre compatibilidade técnica",
        paragraphs: [
          "A ficha técnica do elevador portátil de postes velolev lista chumbadores M16, M18, M20, M22 e M24 com um vão de furos de flange de 180–260 mm. No entanto, compatibilidade listada e itens fornecidos por padrão são conceitos distintos: o fornecimento padrão inclui 4 conjuntos de cada tamanho para M16, M18, M20 e M22, enquanto os parafusos M24 não vêm incluídos no kit de fábrica.",
          "Além disso, como o diagrama original da flange possui terminologia de cotas em processo de padronização, as equipes de engenharia devem confirmar como o projeto define a distância entre centros e enviar um desenho cotado da placa base sempre que forem utilizados chumbadores M24, padrões de 6 ou 8 furos, ou medidas fora do intervalo de 180–260 mm."
        ]
      },
      {
        heading: "1. Parafusos incluídos de fábrica (M16–M22) vs M24 e flanges sob medida",
        paragraphs: [
          "O fornecimento básico atende à maioria dos postes viários urbanos de 12 m com furações quadradas de 4 furos. Quando o projeto especifica chumbadores M24 para resistir a esforços de vento maiores, o instalador deve confirmar a disponibilidade dos parafusos específicos antes do início dos trabalhos de içamento.",
          "Flanges circulares ou com disposições poligonais de parafusos exigem validação prévia de interferência mecânica com os braços de apoio do elevador."
        ]
      },
      {
        heading: "2. Por que a terminologia do vão da flange deve ser conferida nos desenhos",
        paragraphs: [
          "Alguns fabricantes cotam a distância entre furos adjacentes (lado do quadrado), enquanto outros indicam o diâmetro do círculo de furação (DBC ou diagonal). Essa diferença pode fazer com que uma flange pareça incompatível quando na verdade se enquadra na faixa de 180–260 mm.",
          "Verificar se a medida se refere ao lado ou à diagonal evita atrasos na montagem e erros de mobilização em campo."
        ]
      },
      {
        heading: "3. Check-list de placa base para chumbadores M24 e projetos especiais",
        paragraphs: [
          "Antes de solicitar a revisão, reúna: 1) desenho cotado da base, 2) foto frontal do bloco com trena, 3) diâmetro e comprimento roscado dos chumbadores e 4) ficha técnica do poste e luminária."
        ]
      },
      {
        heading: "Perguntas frequentes sobre M24 e flanges de 180–260 mm",
        paragraphs: [
          "Posso usar o elevador com chumbadores M24 de comprimento reduzido?\nO comprimento de rosca exposta deve ter no mínimo 50 a 70 mm acima do concreto para acomodar a porca de nivelamento, a placa base e a porca de aperto com arruela de pressão.",
          "E se os furos da placa forem oblongos?\nFuros oblongos são compatíveis desde que o centro da ranhura esteja contido na faixa de 180 a 260 mm e sejam utilizadas arruelas reforçadas de grande diâmetro."
        ]
      }
    ]
  },
  "solar-street-light-pole-weight-limits-panel-battery-erection": {
    locale: "pt",
    slug: "solar-street-light-pole-weight-limits-panel-battery-erection",
    title: "Limites de peso em postes de luz solar: verificação sob 300 kg | velolev",
    h1: "Limites de peso em postes de iluminação solar: verificação de painéis, suportes e baterias sob 300 kg",
    description: "Método de cálculo do peso total de postes solares montados: soma de fuste, braço, módulo fotovoltaico e bateria para garantir conformidade com o limite de 300 kg da velolev.",
    imageFolder: "/images/guides/solar-street-light-pole-weight-limits-panel-battery-erection",
    sections: [
      {
        heading: "Critérios de cálculo de carga em postes solares fotovoltaicos",
        paragraphs: [
          "A instalação de postes solares autônomos difere dos postes convencionais devido ao peso adicional concentrado no topo: painéis fotovoltaicos de silício, suportes de aço galvanizado, baterias de lítio ou chumbo e luminárias LED integradas.",
          "A capacidade nominal do elevador hidráulico velolev é rigorosamente fixada em 300 kg. Exceder esse peso total montado gera risco de instabilidade hidráulica e sobrecarga estrutural."
        ]
      },
      {
        heading: "1. Composição típica de peso de um poste solar de 10–12 m",
        paragraphs: [
          "Um fuste de aço octogonal de 10 m pesa habitualmente entre 120 e 160 kg. Um suporte duplo com dois painéis solares de 150 W adiciona cerca de 35 a 45 kg. A luminária e o compartimento de bateria de lítio somam outros 25 a 40 kg. O total montado fica em torno de 180 a 245 kg, perfeitamente dentro da margem de 300 kg.",
          "No entanto, em sistemas com baterias pesadas de chumbo-ácido (60–80 kg) montadas no topo ou fustes de parede espessa para zonas de furacão, o peso total pode ultrapassar 300 kg, exigindo o uso de guindaste móvel."
        ]
      },
      {
        heading: "2. Verificação do centro de gravidade e esforço de tombamento",
        paragraphs: [
          "Quanto mais alta estiver a massa da bateria, mais alto fica o centro de gravidade do conjunto durante a elevação angular de 0° a 90°. Recomenda-se posicionar os gabinetes de bateria o mais baixo possível ou montá-los após o içamento da coluna.",
          "O operador deve checar o torque de aperto dos parafusos do suporte solar no solo antes de acionar a subida do cilindro."
        ]
      },
      {
        heading: "3. Passo a passo para submissão de verificação de peso",
        paragraphs: [
          "Some os pesos unitários informados pelos fornecedores do fuste, da luminária e do módulo solar. Insira os valores no formulário de verificação velolev antes de iniciar a obra."
        ]
      },
      {
        heading: "Perguntas frequentes sobre peso de postes solares",
        paragraphs: [
          "O que acontece se o poste pesar 310 kg?\nO elevador não deve ser utilizado. Qualquer carga acima de 300 kg viola a especificação S4 e exige guindaste móvel com capacidade homologada.",
          "Posso içar o poste sem a bateria e colocá-la depois?\nSim, retirar a bateria do topo durante o içamento reduz o peso em 20–50 kg e facilita a operação com margem de segurança ainda maior."
        ]
      }
    ]
  },
  "modular-85kg-pole-lifter-operator-planning-boundaries": {
    locale: "pt",
    slug: "modular-85kg-pole-lifter-operator-planning-boundaries",
    title: "Elevador modular de 85 kg em dois blocos: operação para 1–2 pessoas | velolev",
    h1: "Elevador de postes modular de 85 kg em dois blocos: dimensões de transporte e limites de planejamento para 1–2 operários",
    description: "Planejamento operacional para equipes enxutas de 1 a 2 operadores com o elevador modular velolev de 85 kg (bloco hidráulico de 45 kg + gabinete de 40 kg).",
    imageFolder: "/images/guides/modular-85kg-pole-lifter-operator-planning-boundaries",
    sections: [
      {
        heading: "Arquitetura de dois módulos para logística enxuta",
        paragraphs: [
          "Equipamentos tradicionais de montagem de postes exigem caminhões pesados com operadores dedicados e auxiliares de tráfego, elevando a equipe mínima para 4 a 6 trabalhadores. O elevador velolev adota uma arquitetura em dois blocos independentes que somam 85 kg.",
          "O módulo de içamento hidráulico com o cilindro pesa 45 kg e a unidade eletro-hidráulica com bateria de 24 V pesa 40 kg. Ambos possuem alças de pega ergonômicas para transporte manual entre duas pessoas."
        ]
      },
      {
        heading: "1. Organização de equipe de 1 vs 2 operadores",
        paragraphs: [
          "Com 2 operadores, um técnico posiciona o braço articulado sobre os chumbadores da base enquanto o segundo encaixa o engate rápido hidráulico e prepara os pinos de segurança. Essa configuração atinge o maior rendimento com menor fadiga muscular.",
          "A operação individual (1 operador) é tecnicamente viável para transporte com carrinho de armazém e manuseio dos blocos de 45 kg e 40 kg, mas requer atenção redobrada no alinhamento inicial do fuste."
        ]
      },
      {
        heading: "2. Circulação em acessos restritos e calçadas urbanas",
        paragraphs: [
          "Em calçadões com piso de mosaico português, parques ajardinados ou ciclovias estreitas onde caminhões são proibidos, a equipe descarrega os dois módulos na via mais próxima e caminha até o ponto de instalação.",
          "O equipamento não deixa marcas de esteiras nem ranhuras no pavimento e dispensa patolamento invasivo."
        ]
      },
      {
        heading: "3. Procedimento operacional padrão de segurança",
        paragraphs: [
          "Sempre trave os pinos de segurança mecânicos antes de aplicar pressão no comando da bomba. Nunca fique sob a projeção do poste durante a subida."
        ]
      },
      {
        heading: "Perguntas frequentes sobre a equipe de montagem",
        paragraphs: [
          "É necessário operador certificado de guindaste para acionar o sistema?\nNão. Por ser um equipamento hidráulico compacto acionado do solo e ancorado à base, exige apenas treinamento nas instruções do manual da máquina.",
          "Qual o tempo de montagem dos dois módulos no local?\nMenos de 3 minutos: basta posicionar o módulo no chão e conectar as mangueiras hidráulicas de engate rápido e o cabo de alimentação de 24 V."
        ]
      }
    ]
  },
  "when-mobile-cranes-still-required-over-300kg-12m-direct-burial": {
    locale: "pt",
    slug: "when-mobile-cranes-still-required-over-300kg-12m-direct-burial",
    title: "Quando o caminhão guindaste continua obrigatório | velolev",
    h1: "Quando o caminhão guindaste ainda é obrigatório: altura acima de 12 m, peso superior a 300 kg e postes enterrados",
    description: "Limites técnicos exatos que definem quando um caminhão munck ou guindaste móvel continua obrigatório: postes com mais de 300 kg, altura acima de 12 m ou engastamento direto no solo.",
    imageFolder: "/images/guides/when-mobile-cranes-still-required-over-300kg-12m-direct-burial",
    sections: [
      {
        heading: "Definição transparente dos limites de aplicação do equipamento",
        paragraphs: [
          "A engenharia responsável da velolev baseia-se em limites físicos estritos e na transparência de projeto. Embora o elevador substitua guindastes em grande parte das obras viárias urbanas, ele não se destina a todas as tipologias de postes.",
          "Compreender os três limites intransponíveis evita tentativas de uso indevido e assegura que os orçamentos contemplem guindastes móveis onde eles forem tecnicamente indispensáveis."
        ]
      },
      {
        heading: "1. Os três critérios excludentes que exigem guindaste móvel",
        paragraphs: [
          "Critério 1: Altura do poste superior a 12 m (postes de autoestrada de 14–18 m ou torres de alta iluminação de 20–30 m excedem a cinemática do cilindro).",
          "Critério 2: Peso total montado superior a 300 kg (postes pesados de aço fundido, fustes com múltiplas luminárias de estádio ou postes de concreto armado de 500–1200 kg).",
          "Critério 3: Postes enterrados diretamente no solo (sem bloco de fundação de concreto com chumbadores rosqueados). Como o elevador precisa se fixar à base para ancorar a reação, ele não opera em postes engastados em vala."
        ]
      },
      {
        heading: "2. Como planejar projetos mistos (guindaste + elevador portátil)",
        paragraphs: [
          "Muitas concessões rodoviárias e loteamentos possuem trechos abertos com postes de 15 m e trechos urbanos secundários com 40 postes de 10 m. O contratista pode alugar o guindaste apenas para o dia das torres altas e utilizar a velolev nos postes de 10 m, economizando semanas de diárias de caminhão.",
          "Essa divisão inteligente de escopo maximiza a produtividade global da frota."
        ]
      },
      {
        heading: "3. Protocolo de encaminhamento de dúvidas de projeto",
        paragraphs: [
          "Se houver dúvida quanto ao peso real ou tipo de fundação, envie a especificação técnica para análise de nossos engenheiros antes da compra."
        ]
      },
      {
        heading: "Perguntas frequentes sobre limites técnicos",
        paragraphs: [
          "O equipamento pode levantar um poste de concreto de 8 metros?\nNão, os postes de concreto típicos pesam entre 400 e 800 kg, superando o limite nominal de 300 kg.",
          "E postes cônicos de alumínio de 12 metros?\nSim, desde que a placa base tenha furação de 180–260 mm e o peso total com luminária não exceda 300 kg (postes de alumínio costumam pesar entre 60 e 110 kg)."
        ]
      }
    ]
  },
  "20-second-lift-stroke-vs-total-light-pole-installation-time": {
    locale: "pt",
    slug: "20-second-lift-stroke-vs-total-light-pole-installation-time",
    title: "Curso hidráulico de 20 s vs tempo total de instalação de postes | velolev",
    h1: "Curso de elevação hidráulico de 20 s declarado vs tempo total de instalação de poste de iluminação",
    description: "Diferença técnica entre o curso hidráulico de 20 segundos declarado pelo fabricante e o tempo total de montagem e fixação de postes em campo.",
    imageFolder: "/images/guides/20-second-lift-stroke-vs-total-light-pole-installation-time",
    sections: [
      {
        heading: "Distinção entre curso hidráulico e ciclo completo de obra",
        paragraphs: [
          "As fichas técnicas de fábrica informam um tempo de curso do cilindro hidráulico principal de aproximadamente 20 segundos para o elevador velolev. No planejamento de cronogramas e licitações, é fundamental distinguir esse acionamento mecânico do tempo total de montagem por poste.",
          "O ciclo completo de obra inclui o posicionamento do equipamento sobre a base, ligação de cabos, montagem de braços e luminárias, nivelamento do prumo e aperto torquimétrico das porcas M16–M24."
        ]
      },
      {
        heading: "1. Decomposição das etapas de instalação por poste",
        paragraphs: [
          "Para uma equipe de 2 operários treinados, as fases típicas distribuem-se em: 10–15 minutos de montagem no solo (luminária, fiação e acoplamento ao cilindro), 20–30 segundos de elevação hidráulica contínua, e 5–10 minutos de ajuste de prumo com porcas de nivelamento, aperto final e liberação do equipamento.",
          "O tempo total por poste varia entre 20 e 35 minutos, permitindo que uma equipe enxuta conclua de 10 a 16 postes por turno de trabalho regular."
        ]
      },
      {
        heading: "2. Como utilizar os dados de produtividade em cronogramas de obra",
        paragraphs: [
          "Evite multiplicar 20 segundos pela quantidade de postes para definir prazos contratuais. Os modelos de avanço devem incorporar fatores de deslocamento entre estacas, cura de bases de concreto e checagens elétricas.",
          "O ganho real da velolev decorre da eliminação das esperas de manobra de caminhão guindaste e da rapidez de transporte do conjunto de 85 kg."
        ]
      },
      {
        heading: "3. Informações a incluir em sua consulta técnica",
        paragraphs: [
          "Informe o peso da luminária, altura do fuste e detalhes da placa base para que nossos engenheiros validem o ciclo de trabalho dentro dos limites de 300 kg e 12 m."
        ]
      },
      {
        heading: "Perguntas frequentes sobre velocidade de trabalho",
        paragraphs: [
          "A velocidade do cilindro pode ser alterada?\nNão, o fluxo da bomba hidráulica é regulado de fábrica para manter a estabilidade do centro de gravidade e evitar oscilações bruscas durante o içamento.",
          "Uma equipe de 3 pessoas aumenta o rendimento diário?\nSim, uma terceira pessoa pode adiantar a fiação e montagem das luminárias enquanto a dupla principal realiza a elevação e aperto das bases."
        ]
      }
    ]
  },
  "foundation-inspection-before-self-anchoring-pole-erection": {
    locale: "pt",
    slug: "foundation-inspection-before-self-anchoring-pole-erection",
    title: "Inspeção de fundação e chumbadores antes do içamento de postes | velolev",
    h1: "Check-list de inspeção de fundação e chumbadores antes da revisão do elevador de postes",
    description: "Quais dimensões de bloco, comprimento de rosca e fotos de campo coletar antes de submeter uma consulta técnica de instalação de postes com a velolev.",
    imageFolder: "/images/guides/foundation-inspection-before-self-anchoring-pole-erection",
    sections: [
      {
        heading: "Por que a condição da fundação comanda o içamento ancorado na base",
        paragraphs: [
          "Diferente de um guindaste que sustenta a carga a partir de seus próprios contrapesos, o elevador velolev utiliza a própria base de concreto e os chumbadores pré-instalados como ponto de apoio e reação mecânica. Por isso, a integridade do bloco de fundação é vital para a segurança.",
          "Bases com concreto novo sem cura adequada, chumbadores desalinhados ou roscas danificadas comprometem o aperto e a estabilidade da máquina."
        ]
      },
      {
        heading: "1. Parâmetros geométricos e tabela de conferência",
        paragraphs: [
          "Antes de iniciar o serviço, meça com paquímetro e trena: diâmetro nominal do parafuso (M16 a M24), comprimento de rosca exposta (mínimo 50–70 mm para porca, contraporca e flange) e distância entre centros dos furos (que deve situar-se entre 180 e 260 mm).",
          "Verifique o nivelamento da face superior do concreto. Desníveis acentuados requerem argamassa graute sem retração para garantir apoio uniforme da placa de base."
        ]
      },
      {
        heading: "2. Distinção entre checagens prévias e cálculo estrutural",
        paragraphs: [
          "A lista de verificação da velolev valida a compatibilidade geométrica entre a máquina e a base. Ela não substitui o projeto geotécnico de fundação nem o cálculo de armaduras, que competem ao engenheiro responsável pela obra civil.",
          "Se os chumbadores foram concretados sem gabarito metálico, confira a ortogonalidade para evitar esforços de torção ao acoplar o elevador."
        ]
      },
      {
        heading: "3. Pacote de 4 itens para análise rápida de engenharia",
        paragraphs: [
          "Para uma revisão técnica em menos de 2 horas, envie: 1) desenho cotado da base, 2) foto nítida com trena sobre o bloco, 3) bitola dos chumbadores e 4) catálogo do poste e luminária."
        ]
      },
      {
        heading: "Perguntas frequentes sobre fundações",
        paragraphs: [
          "O equipamento funciona em postes engastados diretamente no solo (sem placa base)?\nNão. O sistema exige obrigatoriamente fundação de concreto com chumbadores metálicos para ancorar os esforços de reação.",
          "O que fazer se um parafuso estiver torto?\nO chumbador deve ser desempenado sob orientação do engenheiro calculista ou corrigido com arruelas especiais antes da montagem."
        ]
      }
    ]
  },
  "evaluating-portable-pole-lifter-technical-evidence-b2b-tenders": {
    locale: "pt",
    slug: "evaluating-portable-pole-lifter-technical-evidence-b2b-tenders",
    title: "Avaliação técnica de elevadores de postes em licitações B2B | velolev",
    h1: "Avaliação de documentação técnica do elevador portátil em licitações B2B: dados S4 vs pendentes",
    description: "Guia para compradores e licitantes B2B distinguindo dados certificados S4, métricas informadas de fábrica e comprovações de conformidade para concorrências.",
    imageFolder: "/images/guides/evaluating-portable-pole-lifter-technical-evidence-b2b-tenders",
    sections: [
      {
        heading: "Transparência técnica em licitações municipais e contratos EPC",
        paragraphs: [
          "Em concorrências públicas e contratos internacionais de iluminação, a inclusão de tecnologias inovadoras sem caminhão guindaste exige uma clara separação entre dados de engenharia certificados e argumentos comerciais. Documentos imprecisos podem resultar em inabilitação técnica ou questionamentos em auditorias.",
          "A velolev disponibiliza documentação técnica estruturada, separando parâmetros certificados de fábrica (S4) de dados em fase de validação empírica."
        ]
      },
      {
        heading: "1. Matriz de classificação de evidências para comissões de licitação",
        paragraphs: [
          "Dados Classe A (Certificados): Carga nominal de 300 kg, altura máxima de 12 m, peso em dois módulos de 85 kg (45 kg + 40 kg), entrecentro de furos de 180–260 mm e parafusos de série M16–M22.",
          "Dados Classe D (Declarados pelo fabricante): Curso de elevação em 20 segundos e autonomia superior a 50 ciclos por bateria de 24 V, que devem ser apresentados como referências de campo sob condições padrão."
        ]
      },
      {
        heading: "2. Inclusão no Programa de Gerenciamento de Riscos (PGR)",
        paragraphs: [
          "Destaque na proposta técnica a eliminação de riscos de tombamento de guindaste móvel e o fim do trabalho em altura para passagem de cintas de içamento. O montador opera 100% do tempo no solo.",
          "Comprove também a redução de emissões e ruído ao substituir caminhões a diesel por uma unidade eletro-hidráulica de 24 V."
        ]
      },
      {
        heading: "3. Síntese dos limites intransponíveis do equipamento",
        paragraphs: [
          "Consigne explicitamente na proposta que postes com peso superior a 300 kg ou altura acima de 12 m serão içados por caminhão guindaste convencional."
        ]
      },
      {
        heading: "Perguntas frequentes sobre licitações",
        paragraphs: [
          "A velolev fornece laudo de conformidade e manual técnico?\nSim, manuais técnicos e declarações de conformidade com normas aplicáveis de máquinas são fornecidos para embasar a proposta.",
          "Como responder a termos de referência que pedem 'caminhão munck'?\nApresentando proposta de método alternativo comprovando maior segurança laboral, menor impacto no trânsito e sustentabilidade."
        ]
      }
    ]
  },
  "solar-wind-sail-area-site-assessment-pole-lifting": {
    locale: "pt",
    slug: "solar-wind-sail-area-site-assessment-pole-lifting",
    title: "Área vélica de painéis solares e vento na montagem de postes | velolev",
    h1: "Área vélica do painel solar e exposição do terreno para análise técnica prévia ao içamento",
    description: "Como documentar área de módulos solares, altura de montagem, rugosidade do terreno e peso sob 300 kg para a avaliação técnica de postes solares com a velolev.",
    imageFolder: "/images/guides/solar-wind-sail-area-site-assessment-pole-lifting",
    sections: [
      {
        heading: "Por que a área do painel fotovoltaico influencia o içamento",
        paragraphs: [
          "Em luminárias solares integradas ou com painéis fotovoltaicos destacados no topo, a superfície do painel atua como uma vela ao vento. Durante o movimento de rotação do solo até a vertical, rajadas laterais induzem momentos de torção no braço do elevador.",
          "Para garantir içamento seguro dentro da capacidade de 300 kg da velolev, é preciso somar o peso estático da luminária e bateria ao momento de tombamento provocado pelo vento sobre o painel."
        ]
      },
      {
        heading: "1. Dados necessários de área vélica e exposição do terreno",
        paragraphs: [
          "O instalador deve registrar: área total dos painéis (em m²), ângulo de inclinação em relação ao fuste, altura de montagem e classe de terreno (área aberta descampada, orla marítima ou centro urbano protegido).",
          "Painéis com área superior a 1,5 m² no topo exigem cautela redobrada e não devem ser içados sob ventos sustentados acima de 25–30 km/h."
        ]
      },
      {
        heading: "2. Protocolo de segurança meteorológica no canteiro de obras",
        paragraphs: [
          "A segurança no trabalho exige medições reais. Tenha um anemômetro digital no local. Se as rajadas superarem o limite seguro de trabalho da equipe, a elevação deve ser adiada.",
          "O sistema hidráulico velolev conta com válvula de retenção de segurança que trava a carga imediatamente caso a operação precise ser interrompida por vento súbito."
        ]
      },
      {
        heading: "3. Preparação da documentação para análise do projeto",
        paragraphs: [
          "Tenha em mãos a ficha técnica do módulo solar, o desenho do suporte e o peso total do conjunto antes de consultar nossa equipe técnica."
        ]
      },
      {
        heading: "Perguntas frequentes sobre postes solares e ventos",
        paragraphs: [
          "É melhor instalar o painel fotovoltaico depois de levantar o poste?\nA maior vantagem da velolev é fazer toda a montagem no chão com total segurança. Contudo, em locais de vento forte e imprevisível, fixar o painel após o içamento por cesto aéreo pode ser considerado.",
          "A forma octogonal ou circular do poste interfere na resistência ao vento?\nSim, postes aerodinâmicos oferecem coeficientes de arrasto diferentes; informe o perfil exato no formulário de verificação."
        ]
      }
    ]
  }
};

// ID Batch A & C (8 articles: 2, 3, 4, 5, 10, 11, 12, 13)
const idArticles = {
  "m24-anchor-bolts-180-260mm-flange-compatibility": {
    locale: "id",
    slug: "m24-anchor-bolts-180-260mm-flange-compatibility",
    title: "Kompatibilitas Baut Angkur M24 dan Rentang Flens 180–260 mm | velolev",
    h1: "Kompatibilitas Baut Angkur M24 dan Rentang Lubang Flens 180–260 mm pada Alat Angkat Tiang Portabel",
    description: "Panduan kompatibilitas teknis untuk baut angkur M24, rentang lubang flens 180–260 mm, baut standar M16–M22, dan aturan peninjauan gambar untuk pelat dasar khusus.",
    imageFolder: "/images/guides/m24-anchor-bolts-180-260mm-flange-compatibility",
    sections: [
      {
        heading: "Jawaban langsung kompatibilitas teknis",
        paragraphs: [
          "Lembar spesifikasi alat angkat tiang portabel velolev mencantumkan ukuran baut angkur M16, M18, M20, M22, dan M24 serta rentang lubang flens 180–260 mm. Namun, daftar kompatibilitas dan perlengkapan standar bawaan adalah hal berbeda: paket pengiriman standar mencakup masing-masing 4 set baut ukuran M16, M18, M20, dan M22, sedangkan baut M24 tidak disertakan secara default.",
          "Selain itu, karena skema flens asli memuat terminologi dimensi yang memerlukan klarifikasi teknik lapangan, tim proyek wajib memastikan cara gambar mendefinisikan jarak sumbu dan mengirimkan gambar kerja terinci jika proyek menggunakan baut M24, pola 6 atau 8 lubang, atau ukuran di luar 180–260 mm."
        ]
      },
      {
        heading: "1. Baut bawaan standar (M16–M22) vs M24 dan flens kustom",
        paragraphs: [
          "Paket baut standar sudah mencakup mayoritas tiang lampu jalan perkotaan kelas 12 m dengan pelat dasar persegi 4 lubang. Apabila gambar teknis menetapkan baut M24 untuk beban angin tinggi, kontraktor harus memastikan ketersediaan baut khusus tersebut sebelum jadwal pemasangan.",
          "Pelat dasar berbentuk lingkaran atau pola baut khusus memerlukan verifikasi clearance mekanis terhadap lengan tumpuan alat angkat."
        ]
      },
      {
        heading: "2. Mengapa terminologi jarak flens harus diperiksa terhadap gambar",
        paragraphs: [
          "Sebagian pabrikan mengukur jarak antara dua lubang berdampingan (sisi persegi), sementara pihak lain mengukur jarak diagonal atau diameter lingkaran baut (PCD/DBC). Perbedaan ini dapat menyebabkan kesalahan persepsi dimensi.",
          "Memastikan apakah dimensi mengacu pada sisi atau diagonal menghindari salah mobilisasi alat di lokasi pekerjaan."
        ]
      },
      {
        heading: "3. Daftar periksa pelat dasar sebelum pengajuan teknis",
        paragraphs: [
          "Sebelum mengajukan review teknis, siapkan: 1) gambar kerja pelat dasar dengan dimensi lengkap, 2) foto fondasi dengan meteran pengukur, 3) diameter dan panjang ulir baut angkur, dan 4) spesifikasi tiang dan lampu."
        ]
      },
      {
        heading: "Pertanyaan umum seputar M24 dan flens 180–260 mm",
        paragraphs: [
          "Berapa panjang ulir baut angkur yang harus muncul di atas beton?\nMinimal 50–70 mm di atas permukaan beton fondasi untuk mengakomodasi mur perata, ketebalan pelat dasar flens, ring pegas, dan mur pengunci.",
          "Apakah pelat dengan lubang lonjong (slotted hole) dapat digunakan?\nBisa, asalkan garis sumbu lubang berada dalam rentang 180 hingga 260 mm dan digunakan ring tebal berdiameter lebar."
        ]
      }
    ]
  },
  "solar-street-light-pole-weight-limits-panel-battery-erection": {
    locale: "id",
    slug: "solar-street-light-pole-weight-limits-panel-battery-erection",
    title: "Batas Berat Tiang Lampu Jalan Tenaga Surya di Bawah 300 kg | velolev",
    h1: "Batas Beban Tiang Lampu Surya: Verifikasi Berat Panel, Breket, dan Baterai di Bawah 300 kg",
    description: "Cara menghitung total berat rakitan tiang lampu jalan PJU tenaga surya: fust tiang, panel surya, baterai, dan armatur lampu agar tetap aman dalam batas beban 300 kg velolev.",
    imageFolder: "/images/guides/solar-street-light-pole-weight-limits-panel-battery-erection",
    sections: [
      {
        heading: "Kriteria perhitungan beban pada tiang lampu tenaga surya",
        paragraphs: [
          "Pemasangan tiang penerangan jalan umum tenaga surya (PJUTS) berbeda dengan tiang biasa karena adanya beban tambahan di bagian atas: panel surya fotovoltaik, breket baja, baterai lithium atau aki, serta lampu LED terintegrasi.",
          "Kapasitas angkat terukur alat hidrolik velolev adalah tepat 300 kg. Melebihi total berat rakitan ini dapat menimbulkan bahaya ketidakstabilan hidrolik dan risiko keselamatan kerja."
        ]
      },
      {
        heading: "1. Komposisi berat tipikal tiang PJUTS kelas 10–12 m",
        paragraphs: [
          "Tiang baja oktagonal 10 m umumnya memiliki berat antara 120 hingga 160 kg. Breket dan modul surya 150–200 W berbobot sekitar 30 hingga 45 kg. Rumah lampu LED dan boks baterai lithium menambah 20 hingga 35 kg. Total rakitan berkisar 170 hingga 240 kg, sangat aman di bawah batas 300 kg.",
          "Namun, jika proyek menggunakan baterai asam-timbal (lead-acid) konvensional seberat 60–80 kg yang dipasang di atas tiang tebal, total berat bisa melebihi 300 kg dan wajib menggunakan mobil derek/crane."
        ]
      },
      {
        heading: "2. Verifikasi titik berat dan gaya guling saat pengangkatan",
        paragraphs: [
          "Semakin berat komponen baterai di ujung atas, semakin tinggi titik berat rakitan selama proses pengangkatan dari posisi rebah ke tegak. Disarankan memasang boks baterai di posisi serendah mungkin atau memasangnya setelah tiang berdiri tegak.",
          "Kontraktor wajib memeriksa kekencangan baut breket surya di tanah sebelum mengoperasikan tuas pengangkat hidrolik."
        ]
      },
      {
        heading: "3. Tahapan pengajuan data verifikasi beban proyek",
        paragraphs: [
          "Jumlahkan data berat dari pabrikan tiang, panel surya, dan baterai. Masukkan data ke formulir verifikasi velolev sebelum memulai mobilisasi lapangan."
        ]
      },
      {
        heading: "Pertanyaan umum seputar berat tiang tenaga surya",
        paragraphs: [
          "Bagaimana jika total berat tiang mencapai 315 kg?\nAlat angkat tidak boleh digunakan. Semua beban di atas 300 kg melanggar batas keselamatan S4 dan wajib dikerjakan dengan mobile crane bersertifikat.",
          "Bolehkah baterai dipasang setelah tiang berdiri?\nBoleh dan sangat dianjurkan jika bobot total mendekati 300 kg, karena mengurangi beban kerja alat angkat dan meningkatkan faktor keselamatan."
        ]
      }
    ]
  },
  "modular-85kg-pole-lifter-operator-planning-boundaries": {
    locale: "id",
    slug: "modular-85kg-pole-lifter-operator-planning-boundaries",
    title: "Alat Angkat Tiang Modular 85 kg Dua Modul untuk 1–2 Pekerja | velolev",
    h1: "Alat Angkat Tiang Modular 85 kg Dua Modul: Dimensi Transportasi dan Batas Perencanaan 1–2 Pekerja",
    description: "Perencanaan operasional tim lapangan 1 hingga 2 orang dengan alat angkat tiang modular velolev seberat 85 kg (modul hidrolik 45 kg + kabinet kontrol 40 kg).",
    imageFolder: "/images/guides/modular-85kg-pole-lifter-operator-planning-boundaries",
    sections: [
      {
        heading: "Konstruksi dua modul untuk efisiensi mobilitas proyek",
        paragraphs: [
          "Metode pemasangan tiang konvensional membutuhkan truk derek besar dengan kru minimal 4 hingga 6 orang, sehingga biaya harian membengkak. Alat angkat velolev dirancang dengan konsep modular yang terbagi menjadi dua bagian dengan total bobot 85 kg.",
          "Modul silinder hidrolik memiliki berat 45 kg dan unit pompa elektro-hidrolik baterai 24 V berbobot 40 kg. Masing-masing dilengkapi pegangan ergonomis untuk diangkat manual oleh dua teknisi."
        ]
      },
      {
        heading: "1. Perencanaan tim kerja: formasi 1 orang vs 2 orang",
        paragraphs: [
          "Dengan tim 2 orang, satu teknisi memposisikan lengan alat pada baut angkur fondasi sementara teknisi kedua menghubungkan selang hidrolik quick-coupler dan memasang pin pengunci pengaman. Pola ini memberikan kecepatan kerja tertinggi.",
          "Pekerjaan oleh 1 orang teknisi tetap memungkinkan dengan bantuan troli dorong barang untuk memindahkan unit 45 kg dan 40 kg, namun memerlukan kehati-hatian ekstra saat penyelarasan awal tiang."
        ]
      },
      {
        heading: "2. Akses ke jalan sempit dan area pedestrian",
        paragraphs: [
          "Di gang permukiman, jalan setapak tepi pantai, atau area taman kota yang melarang masuknya kendaraan berat, kru cukup menurunkan modul di jalan raya terdekat lalu membawanya masuk dengan berjalan kaki melalui pintu selebar 80 cm.",
          "Alat tidak merusak trotoar paving block dan tidak membutuhkan ruang outrigger yang menutup akses pejalan kaki."
        ]
      },
      {
        heading: "3. Standar operasional prosedur penguncian keselamatan",
        paragraphs: [
          "Pastikan pin pengunci ganda telah terpasang sempurna sebelum memberikan tekanan hidrolik. Dilarang berdiri di bawah proyeksi tiang selama proses pengangkatan."
        ]
      },
      {
        heading: "Pertanyaan umum seputar kru pemasangan",
        paragraphs: [
          "Apakah diperlukan surat izin operator (SIO) derek untuk alat ini?\nTidak. Karena bukan derek gantung melainkan alat hidrolik landasan yang dioperasikan dari tanah, hanya diperlukan pelatihan sesuai buku manual mesin.",
          "Berapa lama waktu merakit kedua modul di lokasi kerja?\nKurang dari 3 menit: cukup letakkan kedua modul di tanah lalu sambungkan selang hidrolik cepat dan soket daya listrik 24 V."
        ]
      }
    ]
  },
  "when-mobile-cranes-still-required-over-300kg-12m-direct-burial": {
    locale: "id",
    slug: "when-mobile-cranes-still-required-over-300kg-12m-direct-burial",
    title: "Kapan Truk Derek Tetap Wajib Digunakan | velolev",
    h1: "Kapan Mobile Crane Tetap Diperlukan: Tinggi di Atas 12 m, Berat Lebih dari 300 kg, dan Tiang Tanam Langsung",
    description: "Batasan teknis mutlak kapan mobil derek tetap wajib digunakan: tiang lebih dari 300 kg, tinggi melampaui 12 m, atau tiang tanam langsung tanpa fondasi pelat flens.",
    imageFolder: "/images/guides/when-mobile-cranes-still-required-over-300kg-12m-direct-burial",
    sections: [
      {
        heading: "Keterbukaan batasan teknis aplikasi alat",
        paragraphs: [
          "Prinsip kejujuran teknik velolev didasarkan pada batasan fisik yang tegas. Meskipun alat angkat portabel ini mampu menggantikan truk derek di sebagian besar proyek lampu jalan, alat ini tidak dirancang untuk semua jenis tiang.",
          "Memahami tiga batasan utama ini mencegah kesalahan prosedur di lapangan dan memastikan anggaran proyek mencantumkan derek sewa pada titik yang tepat."
        ]
      },
      {
        heading: "1. Tiga kriteria mutlak yang mewajibkan mobile crane",
        paragraphs: [
          "Kriteria 1: Tinggi tiang lebih dari 12 m (tiang jalan tol 14–18 m atau tiang lampu sorot stadion 20–30 m melampaui jangkauan hidrolik alat).",
          "Kriteria 2: Berat rakitan tiang lebih dari 300 kg (tiang besi cor masif atau tiang beton bertulang seberat 400–1000 kg).",
          "Kriteria 3: Tiang tanam langsung (direct-burial tanpa pelat flens dan baut angkur). Karena alat membutuhkan tumpuan pada baut fondasi untuk menahan gaya reaksi, alat tidak bisa digunakan pada tiang yang ditanam di galian tanah."
        ]
      },
      {
        heading: "2. Strategi kombinasi proyek (derek + alat angkat portabel)",
        paragraphs: [
          "Pada proyek terpadu kawasan industri atau jalan lingkar, sering terdapat tiang tinggi 15 m di bundaran utama dan 40 tiang standar 10 m di jalan akses. Kontraktor dapat menyewa crane selama 1 hari untuk tiang tinggi, lalu menggunakan velolev untuk 40 tiang lainnya.",
          "Strategi ini menghemat puluhan juta rupiah biaya sewa crane tanpa mengorbankan jadwal penyelesaian."
        ]
      },
      {
        heading: "3. Prosedur konsultasi sebelum pemesanan",
        paragraphs: [
          "Jika Anda ragu mengenai estimasi berat tiang atau jenis fondasi proyek Anda, kirimkan lembar data teknis kepada tim kami untuk evaluasi tertulis."
        ]
      },
      {
        heading: "Pertanyaan umum seputar batasan teknis",
        paragraphs: [
          "Bisakah alat ini digunakan untuk tiang listrik beton PLN 9 meter?\nTidak, tiang beton listrik PLN berbobot lebih dari 500 kg dan biasanya ditanam langsung ke tanah tanpa baut angkur flens.",
          "Bagaimana dengan tiang oktagonal aluminium 12 meter?\nBisa digunakan, asalkan pelat dasar memiliki rentang lubang 180–260 mm dan total berat tidak melebihi 300 kg (tiang aluminium biasanya berbobot 70–120 kg)."
        ]
      }
    ]
  },
  "20-second-lift-stroke-vs-total-light-pole-installation-time": {
    locale: "id",
    slug: "20-second-lift-stroke-vs-total-light-pole-installation-time",
    title: "Langkah Angkat Hidrolik 20 Detik vs Total Waktu Pemasangan Tiang | velolev",
    h1: "Langkah Angkat Hidrolik 20 Detik Pabrikan vs Total Waktu Pemasangan Tiang Lampu: Rincian Siklus Kerja",
    description: "Penjelasan teknis membedakan durasi langkah hidrolik 20 detik dari pabrikan dengan jam kerja siklus penuh pemasangan tiang di lapangan proyek PJU.",
    imageFolder: "/images/guides/20-second-lift-stroke-vs-total-light-pole-installation-time",
    sections: [
      {
        heading: "Memisahkan waktu dorong hidrolik dari siklus total pemasangan",
        paragraphs: [
          "Dokumentasi pabrikan velolev mencatat waktu langkah silinder hidrolik utama sekitar 20 detik dalam kondisi pengujian. Dalam penyusunan jadwal tender dan analisis produktivitas, angka ini tidak boleh disamakan dengan total waktu pemasangan satu unit tiang.",
          "Siklus pemasangan lengkap di lapangan mencakup penempatan alat pada fondasi, penarikan kabel, pemasangan lampu dan breket di tanah, proses pengangkatan, penyetelan ketegakan tiang, dan pengencangan baut M16–M24 dengan kunci torsi."
        ]
      },
      {
        heading: "1. Rincian durasi tahapan per titik tiang lampu",
        paragraphs: [
          "Untuk tim berpengalaman beranggotakan 2 teknisi, durasi tipikal terbagi atas: 10–15 menit persiapan di tanah (lampu, kabel, dan pengaitan ke silinder), 20–30 detik pengangkatan bertenaga baterai, dan 5–10 menit penyesuaian vertikal dengan mur leveling serta pengencangan akhir.",
          "Total waktu rata-rata berkisar antara 20 hingga 35 menit per tiang, memungkinkan tim menyelesaikan 10 hingga 16 tiang per hari kerja normal."
        ]
      },
      {
        heading: "2. Penggunaan angka kinerja secara bertanggung jawab dalam jadwal kerja",
        paragraphs: [
          "Jangan mengalikan 20 detik secara langsung dengan jumlah tiang saat menyusun kurva S proyek. Rencana kerja harus memperhitungkan jarak tempuh antar tiang, waktu pengeringan beton fondasi, dan pengujian isolasi kabel.",
          "Keunggulan nyata velolev terletak pada hilangnya waktu tunggu manuver truk derek dan ringannya mobilisasi alat seberat 85 kg."
        ]
      },
      {
        heading: "3. Hal yang perlu disertakan dalam pengajuan pertanyaan proyek",
        paragraphs: [
          "Cantumkan berat lampu, tinggi tiang, dan rincian pelat fondasi agar teknisi kami dapat memastikan siklus kerja berada dalam batas aman 300 kg dan 12 m."
        ]
      },
      {
        heading: "Pertanyaan umum seputar kecepatan dan output kerja",
        paragraphs: [
          "Apakah kecepatan silinder hidrolik dapat dipercepat?\nKecepatan pompa telah dikalibrasi pabrik guna menjaga kestabilan titik berat tiang dan mencegah hentakan dinamis saat mendekati posisi tegak 90°.",
          "Apakah tim 3 orang dapat meningkatkan kecepatan penyelesaian?\nBisa, orang ketiga dapat mempersiapkan perkabelan dan perakitan lampu di titik berikutnya sementara dua orang lainnya melakukan pengangkatan dan pengencangan baut."
        ]
      }
    ]
  },
  "foundation-inspection-before-self-anchoring-pole-erection": {
    locale: "id",
    slug: "foundation-inspection-before-self-anchoring-pole-erection",
    title: "Pemeriksaan Fondasi dan Baut Angkur Sebelum Pengangkatan Tiang | velolev",
    h1: "Daftar Periksa Fondasi dan Baut Angkur Sebelum Pengangkatan Tiang Lampu dengan Alat Angkat Portabel",
    description: "Dimensi fondasi, panjang ulir baut angkur, dan dokumentasi foto lapangan yang perlu dikumpulkan sebelum pengajuan evaluasi teknis pemasangan tiang velolev.",
    imageFolder: "/images/guides/foundation-inspection-before-self-anchoring-pole-erection",
    sections: [
      {
        heading: "Mengapa kondisi fondasi menentukan keberhasilan pengangkatan",
        paragraphs: [
          "Berbeda dengan derek gantung yang menahan beban secara mandiri dari udara, alat velolev bertumpu langsung pada baut angkur dan beton fondasi untuk menahan gaya reaksi saat pengangkatan. Oleh karena itu, mutu beton dan posisi baut angkur sangat menentukan keselamatan kerja.",
          "Beton fondasi yang belum mencapai umur kuat tekan, baut yang miring, atau ulir yang rusak dapat membahayakan kestabilan alat saat proses pengangkatan."
        ]
      },
      {
        heading: "1. Parameter dimensi dan tabel pemeriksaan lapangan",
        paragraphs: [
          "Sebelum memulai pekerjaan, ukur dengan jangka sorong dan meteran: diameter baut angkur (antara M16 hingga M24), panjang ulir bebas di atas beton (minimal 50–70 mm untuk mur perata, pelat flens, ring, dan mur pengunci), serta jarak antar sumbu lubang (antara 180 hingga 260 mm).",
          "Periksa juga kedataran permukaan beton. Permukaan yang bergelombang memerlukan perataan dengan mortar grouting non-shrink agar pelat duduk dengan sempurna."
        ]
      },
      {
        heading: "2. Batasan antara pemeriksaan fisik dan perhitungan struktur tanah",
        paragraphs: [
          "Daftar periksa velolev bertujuan memastikan kecocokan dimensi alat dengan pelat tiang. Panduan ini tidak menggantikan perhitungan daya dukung tanah dan desain tulangan beton fondasi yang menjadi tanggung jawab konsultan struktur proyek.",
          "Jika baut angkur dicor tanpa mal pelat baja, periksa ketegakan sumbunya untuk menghindari tegangan geser saat alat dipasang."
        ]
      },
      {
        heading: "3. Paket dokumen 4 item untuk tinjauan teknis cepat",
        paragraphs: [
          "Agar tim kami dapat memberikan tinjauan teknis dalam waktu 2 jam, lampirkan: 1) gambar kerja pelat flens, 2) foto jelas fondasi bersama meteran, 3) ukuran diameter baut, dan 4) spesifikasi tiang dan lampu."
        ]
      },
      {
        heading: "Pertanyaan umum seputar fondasi tiang",
        paragraphs: [
          "Dapatkah alat digunakan pada tiang tanam langsung tanpa beton flens?\nTidak bisa. Alat angkat hidrolik ini mewajibkan adanya fondasi beton berpaku baut angkur sebagai tumpuan reaksi gaya.",
          "Bagaimana jika salah satu baut angkur bengkok?\nBaut harus diluruskan di bawah pengawasan pengawas struktur atau diganti dengan sambungan selongsong ulir sebelum alat dipasang."
        ]
      }
    ]
  },
  "evaluating-portable-pole-lifter-technical-evidence-b2b-tenders": {
    locale: "id",
    slug: "evaluating-portable-pole-lifter-technical-evidence-b2b-tenders",
    title: "Evaluasi Teknis Alat Angkat Tiang Portabel dalam Tender B2B | velolev",
    h1: "Evaluasi Dokumentasi Teknis Alat Angkat Tiang Portabel dalam Tender B2B: Data S4 vs Catatan Pengujian",
    description: "Panduan pengadaan transparan membedakan spesifikasi terkonfirmasi S4, klaim pabrikan, dan dokumen kepatuhan proyek dalam tender penerangan jalan umum.",
    imageFolder: "/images/guides/evaluating-portable-pole-lifter-technical-evidence-b2b-tenders",
    sections: [
      {
        heading: "Pentingnya transparansi teknis dalam tender pemerintah dan proyek EPC",
        paragraphs: [
          "Dalam lelang proyek penerangan jalan dan utilitas umum, pengajuan metode kerja inovatif tanpa crane membutuhkan pemisahan data teknis bersertifikasi dari klaim pemasaran. Dokumen teknis yang tidak jelas dapat memicu diskualifikasi lelang atau teguran dari pengawas K3 proyek.",
          "velolev menyediakan dokumentasi teknik yang terstruktur rapi, memisahkan spesifikasi resmi terkonfirmasi (S4) dari data pengujian lapangan."
        ]
      },
      {
        heading: "1. Matriks klasifikasi bukti teknis untuk panitia pengadaan",
        paragraphs: [
          "Data Kelas A (Terkonfirmasi): Kapasitas beban 300 kg, kelas tiang maksimal 12 m, berat 2 modul 85 kg (45 kg + 40 kg), rentang flens 180–260 mm, dan baut standar M16–M22.",
          "Data Kelas D (Laporan pabrikan / dalam pengujian lapangan): Waktu angkat 20 detik dan kapasitas lebih dari 50 siklus per pengisian baterai 24 V, yang disajikan sebagai angka acuan operasional."
        ]
      },
      {
        heading: "2. Penyelarasan dengan Rencana Keselamatan Konstruksi (RKK/K3)",
        paragraphs: [
          "Soroti dalam dokumen tender tentang hilangnya risiko derek terguling dan tiadanya pekerjaan di ketinggian untuk mengaitkan tali sling tiang. Teknisi bekerja penuh dari atas tanah.",
          "Jelaskan juga keunggulan lingkungan berupa nol emisi gas buang dan minim kebisingan dengan menggantikan truk diesel crane dengan unit bertenaga baterai 24 V."
        ]
      },
      {
        heading: "3. Ringkasan batasan batas operasional alat",
        paragraphs: [
          "Tegaskan secara transparan dalam penawaran bahwa tiang dengan berat melebihi 300 kg atau tinggi di atas 12 m akan dikerjakan menggunakan mobile crane konvensional."
        ]
      },
      {
        heading: "Pertanyaan umum seputar tender pengadaan",
        paragraphs: [
          "Apakah velolev menyediakan sertifikat kesesuaian dan manual bahasa Inggris?\nYa, manual pengoperasian dan pernyataan kepatuhan terhadap standar keselamatan permesinan tersedia untuk mendukung dokumen lelang.",
          "Bagaimana meyakinkan pemilik proyek yang mensyaratkan truk derek dalam RKS?\nAjukan sebagai metode kerja alternatif yang terbukti lebih aman (tanpa kerja di ketinggian), tidak mengganggu arus lalu lintas, dan ramah lingkungan."
        ]
      }
    ]
  },
  "solar-wind-sail-area-site-assessment-pole-lifting": {
    locale: "id",
    slug: "solar-wind-sail-area-site-assessment-pole-lifting",
    title: "Luas Penampang Angin Panel Surya dan Pengangkatan Tiang | velolev",
    h1: "Luas Penampang Angin Panel Surya dan Paparan Lokasi untuk Evaluasi Teknis Sebelum Pengangkatan",
    description: "Cara mendokumentasikan luas modul panel surya, ketinggian pemasangan, faktor paparan angin lokasi, dan total berat di bawah 300 kg untuk evaluasi tiang PJUTS.",
    imageFolder: "/images/guides/solar-wind-sail-area-site-assessment-pole-lifting",
    sections: [
      {
        heading: "Mengapa luas penampang panel surya memengaruhi pengangkatan",
        paragraphs: [
          "Pada tiang PJU tenaga surya dengan modul fotovoltaik lebar di bagian puncak, permukaan panel bertindak seperti layar yang menangkap hembusan angin. Saat tiang diangkat dari posisi rebah menuju tegak, hembusan angin samping dapat menghasilkan momen puntir pada lengan alat.",
          "Untuk menjamin pengangkatan aman dalam batas kapasitas 300 kg velolev, perencana harus memperhitungkan berat fisik lampu dan baterai sekaligus momen guling yang dipicu oleh dorongan angin pada panel."
        ]
      },
      {
        heading: "1. Data luas penampang surya dan faktor paparan angin yang dibutuhkan",
        paragraphs: [
          "Teknisi lapangan harus mencatat: luas permukaan panel surya (dalam m²), sudut kemiringan terhadap tiang, ketinggian pemasangan, dan kondisi lingkungan sekitar (lapangan terbuka, tepi pantai, atau kawasan padat bangunan).",
          "Panel dengan luas permukaan di atas 1,5 m² di ujung tiang membutuhkan perhatian khusus dan tidak boleh diangkat saat kecepatan angin konstan melebihi 25–30 km/jam."
        ]
      },
      {
        heading: "2. Prosedur keselamatan cuaca berbasis pengukuran nyata",
        paragraphs: [
          "Keselamatan kerja tidak boleh didasarkan pada perkiraan kasat mata. Sediakan anemometer digital di lokasi kerja. Jika embusan angin melampaui batas aman kerja teknisi, pekerjaan pengangkatan harus ditunda.",
          "Silinder hidrolik velolev dilengkapi katup pengunci searah (check valve) yang secara otomatis menahan posisi tiang saat siklus terhenti mendadak akibat angin kencang."
        ]
      },
      {
        heading: "3. Langkah persiapan pengajuan data proyek tenaga surya",
        paragraphs: [
          "Kumpulkan lembar spesifikasi modul surya, gambar rangka penopang breket, dan rincian total berat komponen yang menempel pada tiang sebelum berkonsultasi dengan tim teknis kami."
        ]
      },
      {
        heading: "Pertanyaan umum seputar tiang lampu surya dan angin",
        paragraphs: [
          "Apakah lebih baik memasang panel surya setelah tiang didirikan?\nKeuntungan utama alat velolev adalah semua pekerjaan pemasangan lampu dan panel dilakukan aman di atas tanah. Namun, jika angin kencang tak terduga sering terjadi, memasang panel belakangan dengan tangga/crane kecil dapat dipertimbangkan.",
          "Apakah bentuk tiang oktagonal atau bulat memengaruhi hambatan angin?\nYa, koefisien hambatan aerodinamis tiang berbeda-beda; cantumkan profil penampang tiang pada lembar verifikasi teknis."
        ]
      }
    ]
  }
};

// Merge into localesData
localesData.pt = { ...localesData.pt, ...ptArticles };
localesData.id = { ...localesData.id, ...idArticles };

fs.writeFileSync(localesPath, JSON.stringify(localesData, null, 2), "utf8");
console.log("Successfully updated PT and ID articles in published-content-locales.json");
console.log("PT total count:", Object.keys(localesData.pt).length);
console.log("ID total count:", Object.keys(localesData.id).length);
