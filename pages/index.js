/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import Head from 'next/head';
import Link from 'next/link';
import Date from '../components/date/date';
import Layout from '../components/layout/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPosts } from '../lib/posts';

const siteTitle = 'Jumarogu - Personal Blog';

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          [ I am a software engineer that focuses on expanding and enhancing his Javascript skills ]
        </p>
        <p>
          This blog was build with Nextjs, and let me tell you. It was fun and easy.
        </p>
      </section>
      <section>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}><a>{title}</a></Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPosts();

  return {
    props: {
      allPostsData,
    },
  };
}
