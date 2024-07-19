import Head from 'next/head'

type HeadMetaProps = {
  description?: string
  title: string
}

export const HeadMeta = ({ title }: HeadMetaProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta content={'CloneInstaForBigMoney'} name={'description'} />
      <link href={'../../../public/favicon.ico'} rel={'icon'} />
    </Head>
  )
}
