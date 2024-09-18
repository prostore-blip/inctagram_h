/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    defaultLocale: "ru",
    locales: ["en", "ru"],
  },
    images: {
        remotePatterns: [
            {
                hostname: 'staging-it-incubator.s3.eu-central-1.amazonaws.com',
                pathname: '/**',
                port: '',
                protocol: 'https',
            },
        ],
    },
    reactStrictMode: true,
  transpilePackages: ['@pqina/pintura', '@pqina/react-pintura'],
  webpack(config) {
    // Найти существующее правило, которое обрабатывает импорты SVG
    const fileLoaderRule = config.module.rules.find((rule) =>
        rule.test?.test?.('.svg'),
    )

    config.module.rules.push(
        // Повторно применить существующее правило, но только для svg импортов, заканчивающихся на ?url
        {
          ...fileLoaderRule,
          resourceQuery: /url/, // *.svg?url
          test: /\.svg$/i,
        },
        // Преобразовать все остальные импорты *.svg в React компоненты
        {
          issuer: fileLoaderRule.issuer,
          resourceQuery: {not: [...fileLoaderRule.resourceQuery.not, /url/]}, // исключить, если *.svg?url
          test: /\.svg$/i,
          use: ['@svgr/webpack'],
        },
    )

    // Изменить правило загрузчика файлов, чтобы игнорировать *.svg, так как теперь мы обрабатываем их
    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
}

export default nextConfig