export type CaseDetailBlock = {
  heading: string;
  text: string;
  aside: string;
};

export type CaseDetailMeta = {
  label: string;
  value: string;
};

export type CaseDetail = {
  summary: string;
  meta: CaseDetailMeta[];
  // Posições fixas: 0 = contexto (com imagem lateral), 1 = processo, 2 = resultado.
  // Use null para pular uma posição sem deslocar as demais.
  blocks: (CaseDetailBlock | null)[];
};

export type CaseLink = {
  label: string;
  url: string;
};

export type PortfolioCase = {
  slug: string;
  year: string;
  title: string;
  description: string;
  category: string;
  links?: CaseLink[];
  detail: CaseDetail;
};

const defaultDetail = (label: string): CaseDetail => ({
  summary: `Escreva aqui um resumo do ${label}. Explique o contexto, o desafio e o impacto final.`,
  meta: [
    { label: "Papel", value: "Seu papel no projeto" },
    { label: "Stack", value: "Ferramentas e tecnologias usadas" },
    { label: "Duração", value: "Período ou tempo de execução" },
  ],
  blocks: [
    {
      heading: "Contexto",
      text: "Descreva o cenário, o cliente e o problema que precisava ser resolvido.",
      aside: "Nota lateral sobre o contexto, restrições ou objetivo principal do case.",
    },
    {
      heading: "Processo",
      text: "Explique sua abordagem, decisões importantes e como o trabalho foi conduzido.",
      aside: "Detalhe uma decisão, método ou aprendizado relevante durante o processo.",
    },
    {
      heading: "Resultado",
      text: "Compartilhe os resultados, aprendizados e o que esse case representa no seu portfólio.",
      aside: "Métrica, feedback ou impacto final que você queira destacar.",
    },
  ],
});

export const workItems: PortfolioCase[] = [
  {
    slug: "trabalho-1",
    year: "Ano — Ano",
    title: "Nome da empresa ou cliente",
    description:
      "Descreva aqui a experiência, seu papel e principais contribuições no projeto.",
    category: "Tipo de trabalho",
    detail: {
      ...defaultDetail("trabalho"),
      blocks: [],
    },
  },

];

export const projectItems: PortfolioCase[] = [
  {
    slug: "projeto-1",
    year: "Ano",
    title: "Nome do projeto",
    description:
      "Descreva aqui o projeto, o problema resolvido, sua stack e o resultado.",
    category: "Categoria",
    links: [
      { label: "Site", url: "https://leenscripts.site/" },
      { label: "GitHub", url: "https://github.com/utidazx/portfolio-leen-scripts" },
    ],
    detail: {
      ...defaultDetail("projeto"),
      blocks: [],
    },
  },
  {
    slug: "projeto-2",
    year: "2026",
    title: "fofocandodev",
    description:
      "Perfil de Instagram sobre tecnologia e desenvolvimento web, com conteúdo em português e linguagem de conversa.",
    category: "Projeto pessoal",
    links: [{ label: "Site", url: "https://fofocandodev.com.br/" }],
    detail: {
      summary:
        "O fofocandodev é um projeto que toco com o Cabral: um perfil de Instagram sobre tecnologia e desenvolvimento web, com conteúdo em português e linguagem de conversa. A ideia é falar de programação como quem fofoca com um colega, sem jargão desnecessário e com foco no que ajuda no dia a dia de quem desenvolve.",
      meta: [
        { label: "Parceria", value: "Projeto em dupla com o Cabral" },
        { label: "Formato", value: "Carrosséis de 9 lâminas no Instagram" },
      ],
      blocks: [
        null,
        {
          heading: "A Abordagem",
          text: "Em cada post, mostro os custos e benefícios das opções em vez de apontar um vencedor sem contexto. Também uso só exemplos que dá para conferir e fecho convidando as pessoas a trocar experiências nos comentários.",
          aside: "Custos e benefícios, sem vencedor sem contexto.",
        },
      ],
    },
  },
];

export function getWorkItem(slug: string) {
  return workItems.find((item) => item.slug === slug);
}

export function getProjectItem(slug: string) {
  return projectItems.find((item) => item.slug === slug);
}
