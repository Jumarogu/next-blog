/* eslint-disable react/prop-types */
import Head from 'next/head';
import React from 'react';
import Layout from '../../components/layout/layout';
import Date from '../../components/date/date';
import { getPostsContext, getPostByName } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';

function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>
          {postData.title}
        </h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.content }} />
      </article>
    </Layout>
  );
}

export default Post;

export function getStaticPaths() {
  const contexts = getPostsContext();

  return {
    paths: contexts,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostByName(params.post);

  return {
    props: {
      postData,
    },
  };
}
