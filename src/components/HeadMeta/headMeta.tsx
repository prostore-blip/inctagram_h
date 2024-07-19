import Head from 'next/head'

export const HeadMeta = () => {
  return (
    <Head>
      <title>{'InstaSamkaGram'}</title>
      <meta content={'CloneInstaForBigMoney'} name={'description'} />
      <link href={'../../public/favicon.ico'} rel={'icon'} />
    </Head>
  )
}
